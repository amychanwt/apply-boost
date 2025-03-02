import express, { Request, Response, NextFunction, Router, RequestHandler } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { config } from 'dotenv';
import fs from 'fs';
import pdfParse from 'pdf-parse';

// Load environment variables
config();

const app = express();
const router = Router();
const port = process.env.PORT || 3001;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Processing file upload to uploads directory');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log('Original file name:', file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('Received file:', file.originalname, 'Type:', file.mimetype);
    if (file.mimetype !== 'application/pdf') {
      console.log('Rejected file: not a PDF');
      return cb(new Error('Only PDF files are allowed'));
    }
    console.log('Accepted PDF file');
    cb(null, true);
  }
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  console.log('Creating uploads directory at:', uploadDir);
  fs.mkdirSync(uploadDir);
}

// Add a root route for testing
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth endpoints
const authRouter = express.Router();

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Received signup request for:', email);

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // TODO: Add actual user creation logic here
    // For now, just simulate success
    console.log('User signup successful for:', email);
    res.status(201).json({ 
      message: 'User created successfully',
      user: { email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Received login request for:', email);

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // TODO: Add actual authentication logic here
    // For now, just simulate success if password length is valid
    if (password.length < 8) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User login successful for:', email);
    res.status(200).json({
      message: 'Login successful',
      user: {
        email,
        name: email.split('@')[0], // Just for demo
        token: 'dummy-jwt-token' // In real app, generate proper JWT
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to authenticate' });
  }
});

// Mount the auth routes
app.use('/auth', authRouter);

// Resume upload endpoint
const handleResumeUpload: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file received in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileId = req.file.filename;
    console.log('File uploaded successfully:', fileId);

    // Automatically analyze the resume after upload
    try {
      const filePath = path.join(uploadDir, fileId);
      const insights = await analyzeResume(filePath);
      const keywords = await extractKeywords(filePath);
      
      return res.json({
        message: 'Resume uploaded and analyzed successfully',
        url: `/uploads/${fileId}`,
        fileId: fileId,
        insights: insights,
        keywords: keywords
      });
    } catch (analysisError) {
      console.error('Analysis error:', analysisError);
      // Still return success for upload but with analysis error
      return res.json({
        message: 'Resume uploaded but analysis failed',
        url: `/uploads/${fileId}`,
        fileId: fileId,
        analysisError: 'Failed to analyze resume'
      });
    }
  } catch (error) {
    console.error('Error processing upload:', error);
    return res.status(500).json({ message: 'Failed to upload resume' });
  }
};

router.post('/api/resume/upload', upload.single('resume'), handleResumeUpload);

// Function to extract keywords from resume
async function extractKeywords(filePath: string): Promise<string[]> {
  try {
    // Read the PDF file
    const pdfData = await fs.promises.readFile(filePath);
    const pdf = await pdfParse(pdfData);
    
    // Common job-related terms to boost
    const jobTerms = new Set([
      'developer', 'engineer', 'software', 'web', 'mobile', 'frontend', 'backend',
      'fullstack', 'full-stack', 'programmer', 'architect', 'lead', 'senior', 'junior',
      'development', 'engineering', 'application', 'apps', 'systems', 'devops', 'cloud'
    ]);

    // Technical skills to identify
    const techSkills = new Set([
      'javascript', 'typescript', 'python', 'java', 'c++', 'ruby', 'php', 'swift',
      'kotlin', 'flutter', 'react', 'angular', 'vue', 'node', 'express', 'django',
      'spring', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'sql', 'nosql',
      'mongodb', 'postgresql', 'mysql', 'redis', 'graphql', 'rest', 'api'
    ]);

    // Split text into words and clean them
    const words = pdf.text.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    // Count word frequency with boosted weights for job terms and tech skills
    const frequency: { [key: string]: number } = {};
    words.forEach((word: string) => {
      if (!commonWords.has(word)) {
        let weight = 1;
        if (jobTerms.has(word)) weight = 3;  // Boost job-related terms
        if (techSkills.has(word)) weight = 2; // Boost technical skills
        frequency[word] = (frequency[word] || 0) + weight;
      }
    });
    
    // Get keywords sorted by frequency and boosted weights
    const keywords = Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([word]) => word);

    // Ensure we have at least one job title term
    const hasJobTitle = keywords.some((word: string) => jobTerms.has(word));
    if (!hasJobTitle) {
      const foundTechSkills = keywords.filter((word: string) => techSkills.has(word));
      if (foundTechSkills.length > 0) {
        keywords.unshift(foundTechSkills[0] + ' developer');
      } else {
        keywords.unshift('software developer');
      }
    }

    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    return [];
  }
}

// Common words to filter out
const commonWords = new Set([
  'the', 'and', 'for', 'that', 'with', 'this', 'our', 'your', 'will', 'have',
  'from', 'they', 'what', 'about', 'when', 'make', 'can', 'all', 'been', 'were',
  'into', 'some', 'than', 'its', 'time', 'only', 'could', 'other', 'these'
]);

// Move analyzeResume function outside the endpoint to be reusable
const analyzeResume = async (filePath: string) => {
  // Mock skills extraction (in production, this would come from PDF content)
  const mockExtractedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python',
    'API Development', 'AWS', 'Docker',
    'Data Analysis', 'SQL', 'Machine Learning',
    'Product Management', 'Agile', 'UI/UX'
  ];

  // Group skills by domain and calculate relevance scores
  const domainScores: Record<string, { keywords: string[]; score: number }> = {
    development: {
      keywords: ['JavaScript', 'React', 'Node.js', 'Python', 'API', 'Frontend', 'Backend'],
      score: 0
    },
    dataScience: {
      keywords: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'SQL'],
      score: 0
    },
    devops: {
      keywords: ['AWS', 'Docker', 'CI/CD', 'Infrastructure', 'Kubernetes'],
      score: 0
    },
    productManagement: {
      keywords: ['Product Strategy', 'Agile', 'Roadmap', 'Stakeholder', 'User Experience'],
      score: 0
    },
    design: {
      keywords: ['UI/UX', 'User Interface', 'Wireframes', 'User Research', 'Design Systems'],
      score: 0
    }
  };

  // Calculate scores for each domain based on skill matches
  mockExtractedSkills.forEach(skill => {
    for (const [domain, data] of Object.entries(domainScores)) {
      if (data.keywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(skill.toLowerCase())
      )) {
        data.score += 1;
      }
    }
  });

  // Find the most relevant domains (those with scores > 0)
  const relevantDomains = Object.entries(domainScores)
    .filter(([_, data]) => data.score > 0)
    .sort((a, b) => b[1].score - a[1].score);

  // Map domains to insights
  const domainInsights = {
    development: {
      category: 'Software Development',
      strengths: [
        'Strong foundation in modern web technologies',
        'Full-stack development capabilities',
        'Experience with both frontend and backend development'
      ],
      opportunities: [
        'Consider cloud certification to enhance deployment skills',
        'Explore microservices architecture patterns',
        'Deepen expertise in specific JavaScript frameworks'
      ],
      marketTrends: [
        'High demand for full-stack developers with React expertise',
        'Growing emphasis on cloud-native development',
        'Increasing focus on performance optimization'
      ]
    },
    dataScience: {
      category: 'Data Science',
      strengths: [
        'Strong analytical and problem-solving abilities',
        'Experience with data analysis tools',
        'Understanding of machine learning concepts'
      ],
      opportunities: [
        'Deepen expertise in specific ML frameworks',
        'Build a portfolio of data science projects',
        'Consider specializing in a specific industry domain'
      ],
      marketTrends: [
        'Rising demand for ML engineers',
        'Focus on explainable AI',
        'Integration of AI with traditional software systems'
      ]
    },
    devops: {
      category: 'DevOps Engineering',
      strengths: [
        'Experience with containerization',
        'Understanding of cloud platforms',
        'Knowledge of automation tools'
      ],
      opportunities: [
        'Pursue cloud platform certifications',
        'Expand knowledge of security practices',
        'Learn infrastructure as code tools'
      ],
      marketTrends: [
        'Growing adoption of GitOps practices',
        'Emphasis on security in CI/CD pipelines',
        'Rise of platform engineering'
      ]
    }
  };

  const primaryDomain = relevantDomains[0]?.[0];
  const secondaryDomain = relevantDomains[1]?.[0];

  const insights: {
    primaryField: typeof domainInsights[keyof typeof domainInsights] | null;
    secondaryField: typeof domainInsights[keyof typeof domainInsights] | null;
    crossFieldOpportunities: string[];
  } = {
    primaryField: primaryDomain && domainInsights[primaryDomain as keyof typeof domainInsights] || null,
    secondaryField: secondaryDomain && domainInsights[secondaryDomain as keyof typeof domainInsights] || null,
    crossFieldOpportunities: []
  };

  // Add cross-field opportunities if applicable
  if (primaryDomain && secondaryDomain && 
      domainInsights[primaryDomain as keyof typeof domainInsights] &&
      domainInsights[secondaryDomain as keyof typeof domainInsights]) {
    insights.crossFieldOpportunities = [
      `Consider roles that combine ${domainInsights[primaryDomain as keyof typeof domainInsights].category} and ${domainInsights[secondaryDomain as keyof typeof domainInsights].category}`,
      'Your diverse skill set is valuable for modern tech companies',
      'Look for opportunities to bridge between different technical domains'
    ];
  }

  return insights;
};

// Get recommended jobs endpoint
app.get('/api/jobs/recommended', async (req: Request, res: Response) => {
  try {
    console.log('Fetching recommended jobs');

    // TODO: In production, this would:
    // 1. Get the user's resume analysis from the database
    // 2. Compare skills and experience with job requirements
    // 3. Calculate match scores
    // 4. Return sorted jobs by match score

    // For now, return mock data
    const recommendedJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA (Remote)',
        matchScore: 95,
        description: 'Perfect match for your React and TypeScript experience. Looking for someone to lead our frontend team.',
        salary: '$130,000 - $160,000',
        posted: '1 day ago',
        skills: ['React', 'TypeScript', 'Redux', 'Node.js']
      },
      {
        id: 2,
        title: 'Full Stack Engineer',
        company: 'Innovation Hub',
        location: 'New York, NY (Hybrid)',
        matchScore: 92,
        description: 'Your full stack experience matches our needs. Join us in building scalable web applications.',
        salary: '$120,000 - $150,000',
        posted: '3 days ago',
        skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
      },
      {
        id: 3,
        title: 'Software Engineer',
        company: 'Tech Innovators',
        location: 'Remote',
        matchScore: 88,
        description: 'Your skills in JavaScript and Python align well with our tech stack.',
        salary: '$115,000 - $140,000',
        posted: '2 days ago',
        skills: ['JavaScript', 'Python', 'Django', 'React']
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Returning recommended jobs');
    res.json(recommendedJobs);
  } catch (error) {
    console.error('Error fetching recommended jobs:', error);
    res.status(500).json({ message: 'Failed to fetch recommended jobs' });
  }
});

// Delete resume endpoint
app.delete('/api/resume/:fileId', (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    console.log('Deleting resume:', fileId);

    const filePath = path.join(uploadDir, fileId);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    console.log('File deleted successfully:', filePath);

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Failed to delete resume' });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Use the router
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Upload directory:', path.resolve('uploads/'));
  console.log('Available endpoints:');
  console.log('- GET  /');
  console.log('- GET  /health');
  console.log('- POST /auth/signup');
  console.log('- POST /auth/login');
  console.log('- POST /api/resume/upload');
  console.log('- GET  /api/jobs/recommended');
  console.log('- DELETE /api/resume/:fileId');
}); 