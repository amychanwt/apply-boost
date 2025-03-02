import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Log the API configuration
console.log('API Configuration:', {
  baseURL: API_BASE_URL,
  environment: import.meta.env.MODE,
  fullSignupUrl: `${API_BASE_URL}/auth/signup`
});

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const signup = async (email: string, password: string) => {
  try {
    console.log('Starting signup request to:', `${API_BASE_URL}/auth/signup`);
    console.log('Request payload:', { email, url: `${API_BASE_URL}/auth/signup` });

    // First, check if the server is reachable
    try {
      const healthCheck = await api.get('/health');
      console.log('Health check response:', healthCheck.data);
    } catch (error) {
      console.error('Server health check failed:', error);
      throw new Error('Unable to reach the server. Please make sure the backend server is running at ' + API_BASE_URL);
    }

    const response = await api.post('/auth/signup', { email, password });
    console.log('Signup successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });

      // Handle specific error cases
      if (!error.response) {
        throw new Error(`Network error: Unable to reach the server at ${API_BASE_URL}. Please check if the backend server is running.`);
      }

      switch (error.response.status) {
        case 409:
          throw new Error('Email already exists');
        case 400:
          throw new Error(error.response.data?.message || 'Invalid input. Please check your email and password.');
        case 404:
          throw new Error(`Signup endpoint not found at ${API_BASE_URL}/auth/signup. Please check the server configuration.`);
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(
            error.response.data?.message || 
            error.response.statusText || 
            'Failed to sign up. Please try again.'
          );
      }
    }
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    console.log('Starting login request to:', `${API_BASE_URL}/auth/login`);
    console.log('Request payload:', { email });  // Don't log password

    const response = await api.post('/auth/login', { email, password });
    console.log('Login successful:', response.data);
    
    // Store the token in localStorage
    if (response.data.user?.token) {
      localStorage.setItem('token', response.data.user.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });

      if (!error.response) {
        throw new Error('Network error: Unable to reach the server. Please check your internet connection.');
      }

      switch (error.response.status) {
        case 401:
          throw new Error('Invalid email or password');
        case 400:
          throw new Error(error.response.data?.message || 'Please enter both email and password');
        case 404:
          throw new Error('Login service not available');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(
            error.response.data?.message || 
            error.response.statusText || 
            'Failed to log in'
          );
      }
    }
    throw error;
  }
};

interface ResumeAnalysis {
  primaryField: {
    category: string;
    strengths: string[];
    opportunities: string[];
    marketTrends: string[];
  } | null;
  secondaryField: {
    category: string;
    strengths: string[];
    opportunities: string[];
    marketTrends: string[];
  } | null;
  crossFieldOpportunities: string[];
}

interface UploadResponse {
  fileId: string;
  insights?: {
    primaryField: {
      category: string;
      strengths: string[];
      opportunities: string[];
      marketTrends: string[];
    } | null;
    secondaryField: {
      category: string;
      strengths: string[];
      opportunities: string[];
      marketTrends: string[];
    } | null;
    crossFieldOpportunities: string[];
  };
  parsedText?: string;
  analysisError?: string;
}

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  try {
    console.log('Starting file upload to:', `${API_BASE_URL}/api/resume/upload`);
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const formData = new FormData();
    formData.append('resume', file);

    const response = await axios.post<UploadResponse>(`${API_BASE_URL}/api/resume/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    console.log('Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        error.response?.statusText || 
        'Failed to upload resume'
      );
    }
    throw error;
  }
};

export const deleteResume = async (fileId: string): Promise<void> => {
  try {
    console.log('Deleting resume with ID:', fileId);
    await api.delete(`/api/resume/${fileId}`);
    console.log('Resume deleted successfully');
  } catch (error) {
    console.error('Delete failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        error.response?.statusText || 
        'Failed to delete resume'
      );
    }
    throw error;
  }
};

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  description: string;
  requirements: string[];
  url: string;
  postedDate: string;
}

export const getRecommendedJobs = async (): Promise<Job[]> => {
  try {
    console.log('Fetching recommended jobs based on resume analysis');
    
    const response = await api.get('/api/jobs/recommended');
    console.log('Recommended jobs fetched:', response.data);
    
    // Transform the response to match the required interface
    const jobs = response.data.map(job => ({
      ...job,
      requirements: job.skills || [],
      url: job.url || `${API_BASE_URL}/jobs/${job.id}`,
      postedDate: job.posted || new Date().toISOString()
    }));
    
    return jobs;
  } catch (error) {
    console.error('Failed to fetch recommended jobs:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        error.response?.statusText || 
        'Failed to fetch recommended jobs'
      );
    }
    throw error;
  }
}; 