
import { ContentItem, additionalResources } from '@/data/learningResources';

export interface StudyPlanParams {
  certification: string;
  timeAvailable: number;
  examDate?: string;
  notes?: string;
}

export interface StudyPlanResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'practice' | 'quiz';
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  url?: string;
  description?: string;
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  weeksToSpend: number;
  resources: StudyPlanResource[];
  flashcards: { question: string; answer: string }[];
  quizQuestions: { question: string; options: string[]; correctAnswer: number }[];
}

export interface StudyPlan {
  certificationName: string;
  totalWeeks: number;
  weeklyHours: number;
  examDate?: string;
  topics: StudyPlanTopic[];
  recommendedResources: ContentItem[];
}

const topicsByExam: Record<string, string[]> = {
  aws: ["AWS Global Infrastructure", "IAM", "S3", "EC2", "VPC", "RDS", "Lambda", "CloudFormation"],
  security: ["Network Security", "Threats & Vulnerabilities", "Identity Management", "Cryptography", "Risk Management"],
  azure: ["Azure Compute", "Azure Storage", "Azure Networking", "Azure Identity", "Azure Security"],
  comptia: ["Hardware", "Networking", "Software", "Security", "Operational Procedures"],
  cisco: ["Network Fundamentals", "LAN Switching", "Routing", "WAN Technologies", "Infrastructure Services"],
};

export const generateStudyPlan = async (params: StudyPlanParams): Promise<StudyPlan> => {
  const { certification, timeAvailable, examDate, notes } = params;
  
  // Calculate recommended study duration based on certification and available time
  const certKey = determineCertKey(certification);
  const topics = topicsByExam[certKey] || generateGenericTopics(certification);
  
  // Calculate total weeks based on complexity and time available
  const totalWeeks = Math.max(4, Math.round(topics.length * 1.5));
  
  // Get recommended resources
  const recommendedResources = getRecommendedResources(certification);
  
  // Generate study plan topics with resources, flashcards and quiz questions
  const studyPlanTopics = topics.map((topic, index) => {
    // Calculate weeks to spend based on topic importance (first topics usually more foundational)
    const weeksToSpend = index < 2 ? 2 : 1;
    
    return {
      id: `topic-${index + 1}`,
      name: topic,
      weeksToSpend,
      resources: generateResourcesForTopic(topic, certification),
      flashcards: generateFlashcardsForTopic(topic, certification),
      quizQuestions: generateQuestionsForTopic(topic, certification),
    };
  });
  
  // Return the complete study plan
  return {
    certificationName: certification,
    totalWeeks,
    weeklyHours: timeAvailable,
    examDate,
    topics: studyPlanTopics,
    recommendedResources,
  };
};

function determineCertKey(certification: string): string {
  const certLower = certification.toLowerCase();
  if (certLower.includes('aws')) return 'aws';
  if (certLower.includes('security') || certLower.includes('sec+') || certLower.includes('security+')) return 'security';
  if (certLower.includes('azure')) return 'azure';
  if (certLower.includes('comptia') || certLower.includes('a+') || certLower.includes('network+')) return 'comptia';
  if (certLower.includes('cisco') || certLower.includes('ccna')) return 'cisco';
  return 'generic';
}

function generateGenericTopics(certification: string): string[] {
  // Generate generic topics based on the certification name
  const baseName = certification
    .replace(/certification/i, '')
    .replace(/exam/i, '')
    .trim();
  
  return [
    `${baseName} Fundamentals`,
    `${baseName} Core Concepts`,
    `${baseName} Advanced Topics`,
    `${baseName} Best Practices`,
    `${baseName} Implementation`,
  ];
}

function getRecommendedResources(certification: string): ContentItem[] {
  // Try to find predefined resources
  const certKey = certification.toLowerCase();
  if (certKey.includes('aws') && additionalResources.aws) {
    return additionalResources.aws;
  } else if (certKey.includes('azure') && additionalResources.azure) {
    return additionalResources.azure;
  } else if (certKey.includes('okta') && additionalResources.okta) {
    return additionalResources.okta;
  }
  
  // Generate generic resources if no predefined ones found
  const capitalizedName = certification.charAt(0).toUpperCase() + certification.slice(1);
  
  return [
    {
      id: `gen-resource-1-${Date.now()}`,
      title: `${capitalizedName} Official Documentation`,
      source: 'document',
      description: `Comprehensive documentation for ${capitalizedName} certification.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(certification + ' official documentation')}`,
      author: 'Official Source',
      date: new Date().toISOString().split('T')[0],
      rating: 4.9
    },
    {
      id: `gen-resource-2-${Date.now()}`,
      title: `${capitalizedName} Video Course`,
      source: 'youtube',
      description: `Full video course for ${capitalizedName} certification preparation.`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(certification + ' certification course')}`,
      duration: '10h+',
      author: 'Various Creators',
      date: new Date().toISOString().split('T')[0],
      rating: 4.7
    },
    {
      id: `gen-resource-3-${Date.now()}`,
      title: `${capitalizedName} Practice Exams`,
      source: 'document',
      description: `Practice exam questions for ${capitalizedName} certification.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(certification + ' practice exam questions')}`,
      author: 'Exam Prep',
      date: new Date().toISOString().split('T')[0],
      rating: 4.6
    }
  ];
}

function generateResourcesForTopic(topic: string, certification: string): StudyPlanResource[] {
  // Generate study resources for a specific topic
  return [
    {
      id: `resource-video-${topic.replace(/\s/g, '-').toLowerCase()}`,
      title: `${topic} - Video Tutorial`,
      type: 'video',
      estimatedTime: '2 hours',
      priority: 'high',
      description: `Comprehensive video tutorial covering all aspects of ${topic} for the ${certification} certification.`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(certification + ' ' + topic)}`
    },
    {
      id: `resource-doc-${topic.replace(/\s/g, '-').toLowerCase()}`,
      title: `${topic} - Documentation & Reading`,
      type: 'document',
      estimatedTime: '3 hours',
      priority: 'medium',
      description: `Official documentation and supplementary reading materials for ${topic}.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(certification + ' ' + topic + ' documentation')}`
    },
    {
      id: `resource-practice-${topic.replace(/\s/g, '-').toLowerCase()}`,
      title: `${topic} - Hands-on Practice`,
      type: 'practice',
      estimatedTime: '2-4 hours',
      priority: 'high',
      description: `Practical exercises to reinforce your understanding of ${topic}.`
    },
    {
      id: `resource-quiz-${topic.replace(/\s/g, '-').toLowerCase()}`,
      title: `${topic} - Practice Questions`,
      type: 'quiz',
      estimatedTime: '1 hour',
      priority: 'medium',
      description: `Sample test questions focusing on ${topic} concepts.`
    }
  ];
}

function generateFlashcardsForTopic(topic: string, certification: string): { question: string; answer: string }[] {
  // Generate 5 flashcards per topic
  const flashcards = [];
  
  // Customize flashcards based on topic
  if (topic.includes('Security') || topic.includes('Identity')) {
    flashcards.push(
      { question: `What is the principle of least privilege in ${topic}?`, answer: `The principle that users or systems should only have the minimum level of access necessary to perform their job functions.` },
      { question: `List three common authentication factors used in ${topic}.`, answer: `Something you know (password), something you have (security token), and something you are (biometrics).` }
    );
  } else if (topic.includes('Network')) {
    flashcards.push(
      { question: `What are the 7 layers of the OSI model?`, answer: `Physical, Data Link, Network, Transport, Session, Presentation, Application` },
      { question: `What is a subnet mask used for in networking?`, answer: `To divide an IP address into network and host portions, determining which part identifies the network and which identifies the specific device.` }
    );
  }
  
  // Add generic flashcards for all topics
  flashcards.push(
    { question: `Define ${topic} as it relates to ${certification}.`, answer: `${topic} refers to [definition based on topic and certification].` },
    { question: `What are the primary components of ${topic}?`, answer: `The main components include [components based on topic].` },
    { question: `What is a common challenge when implementing ${topic}?`, answer: `A common challenge is [challenge specific to topic].` }
  );
  
  // Fill up to 5 flashcards if needed
  while (flashcards.length < 5) {
    flashcards.push({
      question: `Key concept ${flashcards.length + 1} in ${topic}?`,
      answer: `This concept involves [explanation based on topic number ${flashcards.length + 1}].`
    });
  }
  
  return flashcards;
}

function generateQuestionsForTopic(topic: string, certification: string): { question: string; options: string[]; correctAnswer: number }[] {
  // Generate 3 quiz questions per topic
  const questions = [];
  
  // Example questions based on topic
  if (topic.includes('AWS') || topic.includes('Azure') || topic.includes('Cloud')) {
    questions.push({
      question: `Which service in ${topic} is primarily used for object storage?`,
      options: ['Block Storage', 'Object Storage', 'File Storage', 'Archive Storage'],
      correctAnswer: 1
    });
  } else if (topic.includes('Security')) {
    questions.push({
      question: 'Which of the following is NOT a common authentication factor?',
      options: ['Something you know', 'Something you have', 'Something you are', 'Something you like'],
      correctAnswer: 3
    });
  }
  
  // Add generic questions for all topics
  questions.push(
    {
      question: `What is the primary purpose of ${topic} in the ${certification} exam?`,
      options: [
        'To manage infrastructure resources',
        'To secure application data',
        'To optimize performance',
        'All of the above'
      ],
      correctAnswer: 3
    },
    {
      question: `Which statement about ${topic} is FALSE?`,
      options: [
        `${topic} is a core component of ${certification}`,
        `${topic} requires specialized knowledge`,
        `${topic} is optional in most implementations`,
        `${topic} follows industry standards`
      ],
      correctAnswer: 2
    }
  );
  
  // Fill up to 3 questions if needed
  while (questions.length < 3) {
    questions.push({
      question: `Question ${questions.length + 1} about ${topic}?`,
      options: [
        `Option A for question ${questions.length + 1}`,
        `Option B for question ${questions.length + 1}`,
        `Option C for question ${questions.length + 1}`,
        `Option D for question ${questions.length + 1}`
      ],
      correctAnswer: 0
    });
  }
  
  return questions;
}
