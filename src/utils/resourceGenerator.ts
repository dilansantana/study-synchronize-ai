
import { ContentItem } from '@/data/learningResources';

// Helper function to generate resources based on certification type
export const generateResourcesForCertification = (searchQuery: string): ContentItem[] => {
  const certKey = searchQuery.toLowerCase();
  const capitalizedSearch = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
  
  // CompTIA resources
  if (certKey.includes('comptia') || certKey.includes('security+') || certKey.includes('a+') || certKey.includes('network+')) {
    const examType = certKey.includes('security') ? 'Security+' : 
                    certKey.includes('network') ? 'Network+' : 
                    certKey.includes('a+') ? 'A+' : 'CompTIA';
    
    return [
      {
        id: `comptia1-${Date.now()}`,
        title: `${examType} Complete Course`,
        source: 'youtube',
        description: `Full course covering all ${examType} exam objectives with practice questions.`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(examType + ' full course')}`,
        duration: '11h 30m',
        author: 'Professor Messer',
        date: new Date().toISOString().split('T')[0],
        rating: 4.9
      },
      {
        id: `comptia2-${Date.now()}`,
        title: `${examType} Official Study Guide`,
        source: 'document',
        description: `CompTIA's official study materials for the ${examType} certification.`,
        url: `https://www.comptia.org/training/books`,
        author: 'CompTIA',
        date: new Date().toISOString().split('T')[0],
        rating: 4.8
      },
      {
        id: `comptia3-${Date.now()}`,
        title: `${examType} Practice Tests`,
        source: 'document',
        description: `Practice exams with detailed explanations for each question.`,
        url: `https://www.google.com/search?q=${encodeURIComponent(examType + ' practice tests')}`,
        author: 'Various',
        date: new Date().toISOString().split('T')[0],
        rating: 4.7
      },
      {
        id: `comptia-quizlet-${Date.now()}`,
        title: `${examType} Certification Quizlet Flashcards`,
        source: 'quizlet',
        description: `Comprehensive flashcard sets for ${examType} exam preparation with terms, concepts, and practice questions.`,
        url: `https://quizlet.com/subject/${encodeURIComponent(examType.toLowerCase())}`,
        author: 'Quizlet Community',
        date: new Date().toISOString().split('T')[0],
        rating: 4.8
      }
    ];
  }
  
  // Cisco/CCNA resources
  if (certKey.includes('cisco') || certKey.includes('ccna')) {
    return [
      {
        id: `cisco1-${Date.now()}`,
        title: `CCNA Complete Course 2023`,
        source: 'youtube',
        description: `Comprehensive CCNA course covering all exam topics with practical demonstrations.`,
        url: 'https://www.youtube.com/results?search_query=ccna+complete+course',
        duration: '15h 45m',
        author: 'Jeremy IT Lab',
        date: new Date().toISOString().split('T')[0],
        rating: 4.9
      },
      {
        id: `cisco2-${Date.now()}`,
        title: `Cisco CCNA Official Cert Guide`,
        source: 'document',
        description: `Official certification guide with exam preparation materials.`,
        url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
        author: 'Cisco Press',
        date: new Date().toISOString().split('T')[0],
        rating: 4.8
      },
      {
        id: `cisco3-${Date.now()}`,
        title: `CCNA Packet Tracer Labs`,
        source: 'document',
        description: `Hands-on lab exercises using Cisco Packet Tracer.`,
        url: 'https://www.google.com/search?q=ccna+packet+tracer+labs',
        author: 'Various',
        date: new Date().toISOString().split('T')[0],
        rating: 4.7
      },
      {
        id: `cisco-quizlet-${Date.now()}`,
        title: `CCNA Quizlet Study Sets`,
        source: 'quizlet',
        description: `Comprehensive flashcards and study sets for CCNA exam preparation.`,
        url: 'https://quizlet.com/subject/ccna/',
        author: 'Quizlet Community',
        date: new Date().toISOString().split('T')[0],
        rating: 4.8
      }
    ];
  }
  
  // AWS resources
  if (certKey.includes('aws')) {
    return [
      {
        id: `aws1-${Date.now()}`,
        title: `AWS Certified Solutions Architect Course`,
        source: 'youtube',
        description: `Complete guide to AWS certification with hands-on labs and practice exams.`,
        url: 'https://www.youtube.com/results?search_query=aws+solutions+architect+course',
        duration: '10h 15m',
        author: 'Adrian Cantrill',
        date: new Date().toISOString().split('T')[0],
        rating: 4.9
      },
      {
        id: `aws2-${Date.now()}`,
        title: `AWS Certification Study Guide`,
        source: 'document',
        description: `Comprehensive study materials for AWS certifications.`,
        url: 'https://aws.amazon.com/certification/',
        author: 'Amazon Web Services',
        date: new Date().toISOString().split('T')[0],
        rating: 4.8
      },
    ];
  }
  
  // Generic resources for any certification
  return [
    {
      id: `gen1-${Date.now()}`,
      title: `${capitalizedSearch} Certification Complete Guide`,
      source: 'youtube',
      description: `Comprehensive guide to passing the ${capitalizedSearch} certification exam.`,
      url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery + ' certification'),
      duration: '6h 20m',
      author: 'Tech Tutorials',
      date: new Date().toISOString().split('T')[0],
      rating: 4.5
    },
    {
      id: `gen2-${Date.now()}`,
      title: `${capitalizedSearch} Study Materials and Resources`,
      source: 'document',
      description: `Curated study materials for ${capitalizedSearch} certification preparation.`,
      url: 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery + ' certification study guide'),
      author: 'Certification Guides',
      date: new Date().toISOString().split('T')[0],
      rating: 4.3
    },
    {
      id: `gen3-${Date.now()}`,
      title: `${capitalizedSearch} Certification Exam Tips`,
      source: 'forum',
      description: `Community discussion on how to pass the ${capitalizedSearch} certification exam.`,
      url: 'https://www.reddit.com/search/?q=' + encodeURIComponent(searchQuery + ' certification'),
      author: 'r/certifications',
      date: new Date().toISOString().split('T')[0],
      rating: 4.2
    },
    {
      id: `gen4-${Date.now()}`,
      title: `${capitalizedSearch} Practice Exams`,
      source: 'document',
      description: `Practice tests with detailed explanations to prepare for the ${capitalizedSearch} exam.`,
      url: 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery + ' practice exams'),
      author: 'Test Prep',
      date: new Date().toISOString().split('T')[0],
      rating: 4.6
    },
    {
      id: `gen5-${Date.now()}`,
      title: `${capitalizedSearch} Certification Bootcamp`,
      source: 'youtube',
      description: `Intensive bootcamp-style training for ${capitalizedSearch} certification.`,
      url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery + ' certification bootcamp'),
      duration: '8h 15m',
      author: 'Certification Academy',
      date: new Date().toISOString().split('T')[0],
      rating: 4.7
    },
    {
      id: `gen-quizlet-${Date.now()}`,
      title: `${capitalizedSearch} Certification Quizlet Flashcards`,
      source: 'quizlet',
      description: `Study flashcards and memory aids for ${capitalizedSearch} certification exam preparation.`,
      url: 'https://quizlet.com/search?query=' + encodeURIComponent(searchQuery + ' certification'),
      author: 'Quizlet Community',
      date: new Date().toISOString().split('T')[0],
      rating: 4.7
    }
  ];
};
