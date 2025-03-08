
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Sparkles } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { FlashcardCreationModal, CustomFlashcard } from './FlashcardCreationModal';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReviewDate?: Date;
}

interface FlashcardDeckProps {
  title: string;
  description?: string;
  certificationName?: string;
}

export const InteractiveFlashcards: React.FC<FlashcardDeckProps> = ({ 
  title,
  description,
  certificationName
}) => {
  const { toast } = useToast();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewStatus, setReviewStatus] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  
  // This would normally come from an API or be generated based on certification
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What does CIA stand for in cybersecurity?',
      answer: 'Confidentiality, Integrity, and Availability - the three main components of information security.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'What is the difference between symmetric and asymmetric encryption?',
      answer: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'What is a buffer overflow attack?',
      answer: 'A buffer overflow attack occurs when a program or process attempts to write more data to a fixed length block of memory (a buffer) than the buffer is allocated to hold.',
      category: 'Application Security',
      difficulty: 'hard'
    },
    {
      id: '4',
      question: 'What is the purpose of a firewall?',
      answer: 'A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s previously established security policies.',
      category: 'Network Security',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'What is the difference between authentication and authorization?',
      answer: 'Authentication verifies who a user is, while authorization determines what resources a user has access to.',
      category: 'Access Control',
      difficulty: 'easy'
    },
    {
      id: '6',
      question: 'What is the OSI model in networking?',
      answer: 'The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and implement networking protocols in seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
      category: 'Networking',
      difficulty: 'medium'
    },
    {
      id: '7',
      question: 'What is SQL injection?',
      answer: 'SQL injection is a code injection technique that exploits security vulnerabilities in web applications by inserting malicious SQL statements into entry fields for execution.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '8',
      question: 'What is a man-in-the-middle attack?',
      answer: 'A man-in-the-middle attack is a type of cybersecurity attack where an attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '9',
      question: 'What is two-factor authentication (2FA)?',
      answer: 'Two-factor authentication is a security process in which users provide two different authentication factors to verify themselves, typically something they know (password) and something they have (like a phone or security key).',
      category: 'Authentication',
      difficulty: 'easy'
    },
    {
      id: '10',
      question: 'What is a zero-day vulnerability?',
      answer: 'A zero-day vulnerability is a software security flaw that is unknown to those who should be interested in mitigating the vulnerability, including the vendor of the target software.',
      category: 'Vulnerability Management',
      difficulty: 'hard'
    },
    {
      id: '11',
      question: 'What is a denial-of-service (DoS) attack?',
      answer: 'A denial-of-service attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users by flooding it with traffic or sending information that triggers a crash.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '12',
      question: 'What is the difference between IDS and IPS?',
      answer: 'An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and issues alerts when such activity is discovered. An Intrusion Prevention System (IPS) also monitors network packets but can also take actions such as blocking the traffic.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '13',
      question: 'What is a VPN?',
      answer: 'A Virtual Private Network (VPN) extends a private network across a public network, enabling users to send and receive data across shared or public networks as if their devices were directly connected to the private network.',
      category: 'Network Security',
      difficulty: 'easy'
    },
    {
      id: '14',
      question: 'What is phishing?',
      answer: 'Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers, by disguising as a trustworthy entity in an electronic communication.',
      category: 'Social Engineering',
      difficulty: 'easy'
    },
    {
      id: '15',
      question: 'What is a botnet?',
      answer: 'A botnet is a number of Internet-connected devices, each of which runs one or more bots. Botnets can be used to perform distributed denial-of-service attacks, steal data, send spam, and allow the attacker to access the device and its connection.',
      category: 'Malware',
      difficulty: 'medium'
    },
    {
      id: '16',
      question: 'What is a DMZ in network security?',
      answer: 'A DMZ (demilitarized zone) is a physical or logical subnetwork that contains and exposes an organization\'s external-facing services to an untrusted network, usually the Internet.',
      category: 'Network Architecture',
      difficulty: 'medium'
    },
    {
      id: '17',
      question: 'What is the principle of least privilege?',
      answer: 'The principle of least privilege states that a subject should be given only those privileges needed for it to complete its task. This reduces the "attack surface" of the computer system.',
      category: 'Access Control',
      difficulty: 'medium'
    },
    {
      id: '18',
      question: 'What is a packet sniffer?',
      answer: 'A packet sniffer (also known as a packet analyzer) is a program or device that can intercept and log traffic passing over a network. It\'s used for monitoring network traffic and troubleshooting network issues.',
      category: 'Network Tools',
      difficulty: 'medium'
    },
    {
      id: '19',
      question: 'What is ARP spoofing?',
      answer: 'ARP spoofing is a type of attack in which an attacker sends falsified ARP messages over a local area network to link their MAC address with the IP address of another host, such as the default gateway, causing traffic meant for that IP address to be sent to the attacker instead.',
      category: 'Network Security',
      difficulty: 'hard'
    },
    {
      id: '20',
      question: 'What is a honeypot in cybersecurity?',
      answer: 'A honeypot is a security mechanism set to detect, deflect, or study attempts at unauthorized use of information systems. It consists of data that appears to be a legitimate part of the site but is actually isolated and monitored.',
      category: 'Security Tools',
      difficulty: 'medium'
    },
    {
      id: '21',
      question: 'What is the GDPR?',
      answer: 'The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.',
      category: 'Compliance',
      difficulty: 'medium'
    },
    {
      id: '22',
      question: 'What is a rainbow table in password cracking?',
      answer: 'A rainbow table is a precomputed table for caching the output of cryptographic hash functions, usually for cracking password hashes.',
      category: 'Cryptography',
      difficulty: 'hard'
    },
    {
      id: '23',
      question: 'What is cross-site scripting (XSS)?',
      answer: 'Cross-site scripting is a type of security vulnerability typically found in web applications that enables attackers to inject client-side scripts into web pages viewed by other users.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '24',
      question: 'What is the difference between TCP and UDP?',
      answer: 'TCP (Transmission Control Protocol) is connection-oriented and guarantees delivery of data packets in the order they were sent. UDP (User Datagram Protocol) is connectionless and does not guarantee reliable delivery of data.',
      category: 'Networking',
      difficulty: 'medium'
    },
    {
      id: '25',
      question: 'What is a CSRF attack?',
      answer: 'Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they\'re currently authenticated.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '26',
      question: 'What is a SIEM system?',
      answer: 'Security Information and Event Management (SIEM) systems combine security information management and security event management to provide real-time analysis of security alerts generated by applications and network hardware.',
      category: 'Security Tools',
      difficulty: 'medium'
    },
    {
      id: '27',
      question: 'What is the CIA triad?',
      answer: 'The CIA triad refers to Confidentiality, Integrity, and Availability, the three key principles of information security.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '28',
      question: 'What is a wildcard SSL certificate?',
      answer: 'A wildcard SSL certificate is a certificate that secures a domain and unlimited subdomains of that domain. For example, a single wildcard certificate for *.example.com secures www.example.com, mail.example.com, etc.',
      category: 'Encryption',
      difficulty: 'medium'
    },
    {
      id: '29',
      question: 'What is a WAF?',
      answer: 'A Web Application Firewall (WAF) helps protect web applications by filtering and monitoring HTTP traffic between a web application and the Internet. It typically protects against attacks such as cross-site forgery, cross-site scripting, and SQL injection.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '30',
      question: 'What is PKI?',
      answer: 'Public Key Infrastructure (PKI) is a set of roles, policies, hardware, software, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption.',
      category: 'Cryptography',
      difficulty: 'hard'
    },
    {
      id: '31',
      question: 'What is the difference between a virus and a worm?',
      answer: 'A virus requires user action to spread, while a worm self-replicates and spreads automatically without requiring user action.',
      category: 'Malware',
      difficulty: 'easy'
    },
    {
      id: '32',
      question: 'What is the purpose of a CAPTCHA?',
      answer: 'CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is a type of challenge-response test used to determine whether or not the user is human, typically to prevent bots from accessing websites.',
      category: 'Web Security',
      difficulty: 'easy'
    },
    {
      id: '33',
      question: 'What is the role of a SOC in an organization?',
      answer: 'A Security Operations Center (SOC) is a facility where information security experts monitor, assess, and defend an organization\'s information systems.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '34',
      question: 'What is a MITM attack?',
      answer: 'A Man-in-the-Middle (MITM) attack is a type of eavesdropping attack where attackers insert themselves into a communication session between people or systems.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '35',
      question: 'What is DLP?',
      answer: 'Data Loss Prevention (DLP) refers to systems that identify, monitor, and protect data in use, data in motion, and data at rest through content inspection and contextual security analysis of transactions.',
      category: 'Data Security',
      difficulty: 'medium'
    },
    {
      id: '36',
      question: 'What is a security control?',
      answer: 'A security control is a safeguard or countermeasure designed to protect the confidentiality, integrity, and availability of information and systems.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '37',
      question: 'What is the difference between white box, black box, and gray box testing?',
      answer: 'White box testing is when the tester has complete knowledge of the system. Black box testing is when the tester has no knowledge of the internal workings. Gray box testing is a combination where the tester has partial knowledge.',
      category: 'Penetration Testing',
      difficulty: 'medium'
    },
    {
      id: '38',
      question: 'What is a security baseline?',
      answer: 'A security baseline is a set of basic security controls that an organization implements to protect its systems and data.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '39',
      question: 'What is the purpose of penetration testing?',
      answer: 'Penetration testing is a simulated cyber attack against your computer system to check for exploitable vulnerabilities, helping to identify security weaknesses before attackers do.',
      category: 'Security Testing',
      difficulty: 'medium'
    },
    {
      id: '40',
      question: 'What is the difference between threats, vulnerabilities, and risks?',
      answer: 'A threat is a potential danger. A vulnerability is a weakness that can be exploited by a threat. Risk is the potential for loss or damage when a threat exploits a vulnerability.',
      category: 'Risk Management',
      difficulty: 'medium'
    },
    {
      id: '41',
      question: 'What is defense in depth?',
      answer: 'Defense in depth is a strategy that employs a series of defensive mechanisms layers with the intention that if one fails, another will step up immediately to thwart an attack.',
      category: 'Security Fundamentals',
      difficulty: 'medium'
    },
    {
      id: '42',
      question: 'What is a social engineering attack?',
      answer: 'Social engineering is the psychological manipulation of people into performing actions or divulging confidential information, often through deception, manipulation, or intimidation.',
      category: 'Social Engineering',
      difficulty: 'easy'
    },
    {
      id: '43',
      question: 'What is the difference between synchronous and asynchronous encryption?',
      answer: 'Synchronous encryption requires both parties to have the same key before communication, while asynchronous encryption uses key pairs (public and private) where one key encrypts and another decrypts.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '44',
      question: 'What is a rootkit?',
      answer: 'A rootkit is a collection of computer software, typically malicious, designed to enable access to a computer or areas of its software that would not otherwise be allowed and often masks its existence or the existence of other software.',
      category: 'Malware',
      difficulty: 'hard'
    },
    {
      id: '45',
      question: 'What is the purpose of DNS in networking?',
      answer: 'The Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates domain names to IP addresses.',
      category: 'Networking',
      difficulty: 'easy'
    },
    {
      id: '46',
      question: 'What is a brute force attack?',
      answer: 'A brute force attack is a trial-and-error method used to obtain information such as a user password or personal identification number (PIN). In a brute force attack, automated software is used to generate a large number of consecutive guesses.',
      category: 'Authentication',
      difficulty: 'easy'
    },
    {
      id: '47',
      question: 'What is a sandbox in cybersecurity?',
      answer: 'A sandbox is a security mechanism for separating running programs, usually in an effort to mitigate system failures or software vulnerabilities from spreading.',
      category: 'Security Tools',
      difficulty: 'medium'
    },
    {
      id: '48',
      question: 'What is the purpose of a VLAN?',
      answer: 'A Virtual LAN (VLAN) is any broadcast domain that is partitioned and isolated at the data link layer (OSI layer 2). VLANs allow network administrators to group hosts together even if the hosts are not directly connected to the same network switch.',
      category: 'Network Architecture',
      difficulty: 'medium'
    },
    {
      id: '49',
      question: 'What is a DNS cache poisoning attack?',
      answer: 'DNS cache poisoning is a type of attack in which corrupt DNS data is introduced into the DNS resolver\'s cache, causing the name server to return an incorrect IP address, diverting traffic to the attacker\'s computer.',
      category: 'Network Security',
      difficulty: 'hard'
    },
    {
      id: '50',
      question: 'What is encryption?',
      answer: 'Encryption is the process of encoding information in such a way that only authorized parties can access it. It converts the original information, referred to as plaintext, into an alternative form known as ciphertext.',
      category: 'Cryptography',
      difficulty: 'easy'
    },
    {
      id: '51',
      question: 'What is a CVE?',
      answer: 'Common Vulnerabilities and Exposures (CVE) is a list of publicly disclosed computer security flaws. When someone refers to a CVE, they mean a security flaw that has been assigned a CVE ID number.',
      category: 'Vulnerability Management',
      difficulty: 'medium'
    },
    {
      id: '52',
      question: 'What is a security audit?',
      answer: 'A security audit is a systematic evaluation of the security of a company\'s information system by measuring how well it conforms to a set of established criteria.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '53',
      question: 'What is the difference between a stateful and a stateless firewall?',
      answer: 'A stateful firewall tracks the state of active connections and makes decisions based on the context of the traffic. A stateless firewall filters traffic based on source, destination, and ports without considering connection state.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '54',
      question: 'What is a security incident?',
      answer: 'A security incident is a violation or imminent threat of violation of computer security policies, acceptable use policies, or standard security practices.',
      category: 'Security Operations',
      difficulty: 'easy'
    },
    {
      id: '55',
      question: 'What is a security policy?',
      answer: 'A security policy is a document that outlines an organization\'s approach to security, defining rules and guidelines for access to and use of its systems and information.',
      category: 'Security Management',
      difficulty: 'easy'
    },
    {
      id: '56',
      question: 'What is encryption key management?',
      answer: 'Encryption key management refers to the administration of tasks involved with protecting, storing, backing up, and organizing encryption keys, including key generation, verification, distribution, rotation, and revocation.',
      category: 'Cryptography',
      difficulty: 'hard'
    },
    {
      id: '57',
      question: 'What is a false positive in security monitoring?',
      answer: 'A false positive is an alert that incorrectly indicates that a vulnerability or security breach is present when it actually isn\'t.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '58',
      question: 'What is security awareness training?',
      answer: 'Security awareness training is a formal process for educating employees about computer security, focusing on teaching them security best practices and how to identify and respond to potential threats.',
      category: 'Security Management',
      difficulty: 'easy'
    },
    {
      id: '59',
      question: 'What is the NIST Cybersecurity Framework?',
      answer: 'The NIST Cybersecurity Framework is a set of guidelines, best practices, and standards for managing cybersecurity risk, organized around five key functions: Identify, Protect, Detect, Respond, and Recover.',
      category: 'Compliance',
      difficulty: 'medium'
    },
    {
      id: '60',
      question: 'What is the principle of separation of duties?',
      answer: 'Separation of duties is a principle where multiple people are required to complete a task to prevent fraud and errors. It ensures that no single individual has control over all parts of a process.',
      category: 'Security Management',
      difficulty: 'medium'
    }
  ]);

  // Load custom flashcards from localStorage
  useEffect(() => {
    const loadCustomFlashcards = () => {
      try {
        const savedFlashcards = localStorage.getItem('customFlashcards');
        if (savedFlashcards) {
          const parsedFlashcards = JSON.parse(savedFlashcards) as CustomFlashcard[];
          
          // Filter by certification if specified
          const filteredFlashcards = certificationName 
            ? parsedFlashcards.filter(card => 
                !card.certificationId || 
                card.certificationId === certificationName.toLowerCase().replace(/\s+/g, '-')
              )
            : parsedFlashcards;
            
          setFlashcards(prev => [...prev, ...filteredFlashcards]);
        }
      } catch (error) {
        console.error('Error loading custom flashcards:', error);
      }
    };
    
    loadCustomFlashcards();
  }, [certificationName]);

  const currentCard = flashcards[currentIndex];
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % flashcards.length);
    }, 300);
  };
  
  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };
  
  const resetCard = () => {
    setFlipped(false);
  };

  const markCardReview = (status: 'correct' | 'incorrect') => {
    setReviewStatus({
      ...reviewStatus,
      [currentCard.id]: status
    });
    
    toast({
      title: status === 'correct' ? "Marked as known" : "Marked for review",
      description: status === 'correct' 
        ? "Great job! Moving to the next card." 
        : "This card will appear more frequently in your reviews.",
      duration: 3000,
    });
    
    nextCard();
  };

  const handleSaveCustomFlashcard = (flashcard: CustomFlashcard) => {
    // Add to current session
    setFlashcards(prev => [...prev, flashcard]);
    
    // Save to localStorage
    try {
      const savedFlashcards = localStorage.getItem('customFlashcards');
      const existingFlashcards = savedFlashcards ? JSON.parse(savedFlashcards) as CustomFlashcard[] : [];
      
      localStorage.setItem('customFlashcards', JSON.stringify([...existingFlashcards, flashcard]));
    } catch (error) {
      console.error('Error saving custom flashcard:', error);
      toast({
        title: "Error saving flashcard",
        description: "There was an error saving your flashcard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalCards = flashcards.length;
  const reviewedCards = Object.keys(reviewStatus).length;
  const correctCards = Object.values(reviewStatus).filter(s => s === 'correct').length;
  const progressPercentage = totalCards > 0 ? (reviewedCards / totalCards) * 100 : 0;

  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title || 'Interactive Flashcards'}</CardTitle>
            <CardDescription>
              {description || `Test your knowledge of ${certificationName || 'certification'} concepts`}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{correctCards} / {totalCards} Mastered</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progress: {reviewedCards}/{totalCards} cards reviewed</span>
          <span>Card {currentIndex + 1} of {totalCards}</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        {/* Flashcard */}
        <div className="perspective-1000 relative w-full aspect-[4/3] cursor-pointer" onClick={handleFlip}>
          <div
            className={cn(
              "absolute inset-0 rounded-xl shadow-md backface-hidden transition-all duration-500 transform-style-3d",
              flipped ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
            )}
          >
            {/* Front of card (Question) */}
            <div className="absolute inset-0 p-6 border rounded-xl bg-card flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  getDifficultyClass(currentCard.difficulty)
                )}>
                  {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                </Badge>
                
                <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium">
                  {currentCard.category}
                </Badge>
              </div>
              
              <div className="flex-1 flex items-center justify-center text-center">
                <h3 className="text-xl font-medium">{currentCard.question}</h3>
              </div>
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Click to reveal answer
              </div>
            </div>
          </div>
          
          <div
            className={cn(
              "absolute inset-0 rounded-xl shadow-md backface-hidden transition-all duration-500 transform-style-3d",
              flipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
            )}
          >
            {/* Back of card (Answer) */}
            <div className="absolute inset-0 p-6 border rounded-xl bg-secondary flex flex-col">
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-base whitespace-pre-wrap">{currentCard.answer}</p>
              </div>
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Click to see question
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCard}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={resetCard}
            className="rounded-full"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => markCardReview('incorrect')}
            className="px-3"
          >
            Needs Review
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => markCardReview('correct')}
            className="px-3 bg-green-600 hover:bg-green-700"
          >
            Got It
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextCard}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setShowFlashcardModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Custom Card
        </Button>
        
        <Button variant="default">
          Generate More Flashcards
        </Button>
      </CardFooter>

      {/* Flashcard Creation Modal */}
      <FlashcardCreationModal
        open={showFlashcardModal}
        onOpenChange={setShowFlashcardModal}
        onSave={handleSaveCustomFlashcard}
        certificationName={certificationName}
      />
    </Card>
  );
};
