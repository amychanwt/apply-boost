import { getCurrentUser } from './userStorage';

// Common keywords by category
const technicalKeywords = ['javascript', 'python', 'react', 'node', 'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'api'];
const softSkillKeywords = ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical', 'project management'];
const industryKeywords = ['software', 'healthcare', 'finance', 'education', 'technology', 'marketing', 'sales'];

export interface KeywordData {
  technical: string[];
  soft: string[];
  industry: string[];
}

export function extractKeywords(resumeText: string): KeywordData {
  const text = resumeText.toLowerCase();
  
  const keywords: KeywordData = {
    technical: technicalKeywords.filter(keyword => text.includes(keyword)),
    soft: softSkillKeywords.filter(keyword => text.includes(keyword)),
    industry: industryKeywords.filter(keyword => text.includes(keyword))
  };
  
  return keywords;
}

export async function saveKeywordsToFile(keywords: KeywordData): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('No user found');
    
    // Save to localStorage
    localStorage.setItem(`keywords_${user.id}`, JSON.stringify(keywords));
    console.log('Keywords saved to localStorage');
    
  } catch (error) {
    console.error('Error saving keywords:', error);
    throw error;
  }
}

export async function getStoredKeywords(): Promise<KeywordData | null> {
  try {
    const user = getCurrentUser();
    if (!user) return null;
    
    // Get from localStorage
    const storedKeywords = localStorage.getItem(`keywords_${user.id}`);
    if (!storedKeywords) return null;
    
    return JSON.parse(storedKeywords);
  } catch (error) {
    console.error('Error getting stored keywords:', error);
    return null;
  }
} 