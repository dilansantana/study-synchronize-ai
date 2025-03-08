export interface ContentItem {
  id: string;
  title: string;
  source: 'youtube' | 'article' | 'forum' | 'document' | 'quizlet';
  description: string;
  url: string;
  duration?: string;
  author?: string;
  date?: string;
  rating?: number;
}

// Mock content items
export const initialContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'CompTIA Security+ Full Course',
    source: 'youtube',
    description: 'A comprehensive guide to Security+ certification covering all exam objectives.',
    url: 'https://www.youtube.com/watch?v=9NE33fpQuw8',
    duration: '8h 45m',
    author: 'Professor Messer',
    date: '2023-01-15',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Network+ Study Guide: OSI Model Explained',
    source: 'article',
    description: 'Detailed breakdown of the OSI Model with diagrams and examples.',
    url: 'https://www.comptia.org/training/books/network-n10-008-study-guide',
    author: 'TechExams.net',
    date: '2023-03-22',
    rating: 4.5
  },
  {
    id: '3',
    title: 'How to pass CCNA on first attempt? Tips and resources',
    source: 'forum',
    description: 'Community discussion with valuable tips and recommended resources.',
    url: 'https://www.reddit.com/r/ccna/',
    author: 'r/ccna',
    date: '2023-04-10',
    rating: 4.2
  },
  {
    id: '4',
    title: 'CompTIA A+ 220-1101 & 220-1102 Official Study Guide',
    source: 'document',
    description: 'Official study material with practice questions and explanations.',
    url: 'https://www.comptia.org/training/books/a-220-1101-220-1102-study-guide',
    author: 'CompTIA',
    date: '2023-02-05',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Security+ SY0-601 - Cryptography Concepts',
    source: 'youtube',
    description: 'Learn about symmetric and asymmetric encryption methods.',
    url: 'https://www.youtube.com/watch?v=GZ1bLT_uvYM',
    duration: '45m',
    author: 'IT Dojo',
    date: '2023-05-18',
    rating: 4.6
  }
];

// Additional resources for different certifications
export const additionalResources: Record<string, ContentItem[]> = {
  aws: [
    {
      id: 'aws1',
      title: 'AWS Certified Solutions Architect Course',
      source: 'youtube',
      description: 'Comprehensive course covering all AWS Solutions Architect exam objectives.',
      url: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
      duration: '10h 15m',
      author: 'freeCodeCamp.org',
      date: '2023-06-12',
      rating: 4.9
    },
    {
      id: 'aws2',
      title: 'AWS Certified Cloud Practitioner Study Guide',
      source: 'document',
      description: 'Official study material with practice questions for AWS Cloud Practitioner.',
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      author: 'Amazon Web Services',
      date: '2023-07-20',
      rating: 4.7
    },
    {
      id: 'aws3',
      title: 'How I passed all 3 AWS associate certs in 3 months',
      source: 'forum',
      description: 'Personal experience and study strategy for AWS certifications.',
      url: 'https://www.reddit.com/r/AWSCertifications/',
      author: 'r/AWSCertifications',
      date: '2023-05-05',
      rating: 4.5
    },
    {
      id: 'aws-quizlet',
      title: 'AWS Certification Quizlet Flashcards',
      source: 'quizlet',
      description: 'Comprehensive flashcards for AWS certification exam preparation with practice questions and memory aids.',
      url: 'https://quizlet.com/subject/aws-certification/',
      author: 'Quizlet Community',
      date: '2023-10-05',
      rating: 4.8
    }
  ],
  okta: [
    {
      id: 'okta1',
      title: 'Okta Certified Professional Exam Prep',
      source: 'youtube',
      description: 'Preparation course for the Okta Certified Professional exam.',
      url: 'https://www.youtube.com/watch?v=8jU_SrkVX8E',
      duration: '4h 30m',
      author: 'Okta Developer',
      date: '2023-08-10',
      rating: 4.6
    },
    {
      id: 'okta2',
      title: 'Okta Identity and Access Management Guide',
      source: 'document',
      description: 'Comprehensive guide to Okta IAM concepts and implementation.',
      url: 'https://www.okta.com/resources/whitepaper/identity-and-access-management-guide/',
      author: 'Okta Inc.',
      date: '2023-04-15',
      rating: 4.8
    },
    {
      id: 'okta-quizlet',
      title: 'Okta Certified Professional Flashcards',
      source: 'quizlet',
      description: 'Study flashcards with key concepts and practice questions for the Okta certification exams.',
      url: 'https://quizlet.com/subject/okta-certification/',
      author: 'Quizlet Community',
      date: '2023-09-18',
      rating: 4.7
    }
  ],
  azure: [
    {
      id: 'azure1',
      title: 'Microsoft Azure AZ-900 Certification Course',
      source: 'youtube',
      description: 'Full course for Azure Fundamentals certification.',
      url: 'https://www.youtube.com/watch?v=NKEFWyqJ5XA',
      duration: '3h 45m',
      author: 'Microsoft Learn',
      date: '2023-09-05',
      rating: 4.9
    },
    {
      id: 'azure2',
      title: 'Azure Administrator Study Notes AZ-104',
      source: 'article',
      description: 'Detailed study notes for the Azure Administrator certification.',
      url: 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/',
      author: 'Microsoft',
      date: '2023-07-14',
      rating: 4.7
    },
    {
      id: 'azure-quizlet',
      title: 'Microsoft Azure Certification Quizlet Sets',
      source: 'quizlet',
      description: 'Comprehensive flashcard sets for various Azure certification exams with practice questions.',
      url: 'https://quizlet.com/subject/microsoft-azure/',
      author: 'Quizlet Community',
      date: '2023-10-12',
      rating: 4.8
    }
  ]
};
