import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTransition from './AnimatedTransition';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardsProps {
  className?: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ className }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  
  const flashcards: FlashcardData[] = [
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
      question: 'Explain the concept of a "man-in-the-middle" attack.',
      answer: 'A man-in-the-middle attack occurs when an attacker secretly intercepts and possibly alters communications between two parties who believe they are directly communicating with each other.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'What is port 443 commonly used for?',
      answer: 'Port 443 is used for HTTPS (HTTP Secure) communications, providing encrypted web traffic.',
      category: 'Networking',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'What is the purpose of a VLAN?',
      answer: 'A Virtual Local Area Network (VLAN) is used to logically segment a network without altering its physical topology, improving security and reducing broadcast domains.',
      category: 'Networking',
      difficulty: 'medium'
    },
    {
      id: '6',
      question: 'What is Cross-Site Scripting (XSS)?',
      answer: 'XSS is a security vulnerability that allows attackers to inject client-side scripts into web pages viewed by other users, potentially stealing session data or cookies.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '7',
      question: 'What is the difference between IDS and IPS?',
      answer: 'An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and issues alerts, while an Intrusion Prevention System (IPS) actively blocks or prevents detected threats.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '8',
      question: 'What is the principle of least privilege?',
      answer: 'The principle of least privilege means giving a user only the access rights and resources absolutely required to complete their tasks and nothing more.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '9',
      question: 'What is a zero-day vulnerability?',
      answer: 'A zero-day vulnerability is a software security flaw that is unknown to the parties responsible for patching or otherwise fixing the flaw, and has not yet been patched.',
      category: 'Security Fundamentals',
      difficulty: 'hard'
    },
    {
      id: '10',
      question: 'What is the function of a firewall?',
      answer: 'A firewall is a network security device or software that monitors and filters incoming and outgoing network traffic based on an organization\'s security policies.',
      category: 'Network Security',
      difficulty: 'easy'
    },
    {
      id: '11',
      question: 'What is the difference between authentication and authorization?',
      answer: 'Authentication verifies who a user is, while authorization determines what resources a user has access to.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '12',
      question: 'What is a SQL injection attack?',
      answer: 'SQL injection is a code injection technique that exploits vulnerabilities in web applications by inserting malicious SQL statements into entry fields for execution.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '13',
      question: 'What is a DMZ in network security?',
      answer: 'A Demilitarized Zone (DMZ) is a physical or logical subnetwork that contains and exposes an organization\'s external-facing services to an untrusted network, usually the internet.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '14',
      question: 'What is the purpose of a SIEM system?',
      answer: 'Security Information and Event Management (SIEM) systems collect, analyze, and correlate security events from various sources to detect threats and security incidents in real-time.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '15',
      question: 'What is the difference between blackbox and whitebox testing?',
      answer: 'In blackbox testing, the tester has no knowledge of the internal structure of the application, while in whitebox testing, the tester has full knowledge of the internal structure, code, and infrastructure.',
      category: 'Security Testing',
      difficulty: 'medium'
    },
    {
      id: '16',
      question: 'What is a security control?',
      answer: 'A security control is a safeguard or countermeasure designed to protect the confidentiality, integrity, and availability of data and systems in accordance with a set of defined requirements.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '17',
      question: 'What is DNS poisoning?',
      answer: 'DNS poisoning (or DNS spoofing) is an attack that corrupts a DNS server\'s cache, causing it to return incorrect IP addresses and diverting traffic to malicious websites.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '18',
      question: 'What is the purpose of a WAF?',
      answer: 'A Web Application Firewall (WAF) protects web applications by filtering and monitoring HTTP traffic between a web application and the Internet, specifically designed to protect against attacks like XSS and SQL injection.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '19',
      question: 'What is a security baseline?',
      answer: 'A security baseline is a minimum level of security controls required for a system or organization, serving as a reference point for security implementation and compliance measurement.',
      category: 'Security Fundamentals',
      difficulty: 'medium'
    },
    {
      id: '20',
      question: 'What is the purpose of penetration testing?',
      answer: 'Penetration testing simulates cyberattacks against computer systems to check for exploitable vulnerabilities, helping organizations identify and remediate security weaknesses before malicious attackers can exploit them.',
      category: 'Security Testing',
      difficulty: 'easy'
    },
    {
      id: '21',
      question: 'What is a buffer overflow attack?',
      answer: 'A buffer overflow attack occurs when a program writes more data to a buffer than it can hold, causing the excess data to overflow into adjacent memory space, potentially allowing execution of malicious code.',
      category: 'Application Security',
      difficulty: 'hard'
    },
    {
      id: '22',
      question: 'What is the difference between symmetric and asymmetric encryption?',
      answer: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '23',
      question: 'What is the CIA triad?',
      answer: 'The CIA triad consists of Confidentiality (ensuring information is accessible only to authorized users), Integrity (ensuring information is accurate and reliable), and Availability (ensuring information is accessible when needed).',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '24',
      question: 'What is a security vulnerability?',
      answer: 'A security vulnerability is a weakness in a system that can be exploited by a threat actor to gain unauthorized access, perform unauthorized actions, or cause harm to the system.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '25',
      question: 'What is multi-factor authentication (MFA)?',
      answer: 'Multi-factor authentication requires users to provide two or more verification factors to gain access to a resource, typically something you know (password), something you have (security token), and something you are (biometric).',
      category: 'Access Control',
      difficulty: 'easy'
    },
    {
      id: '26',
      question: 'What is a honeypot in cybersecurity?',
      answer: 'A honeypot is a security mechanism used to detect, deflect, or study hacking attempts by simulating a vulnerable system or data that appears to be a legitimate part of the network.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '27',
      question: 'What is the difference between encoding, encryption, and hashing?',
      answer: 'Encoding transforms data for usability and isn\'t secure, encryption transforms data to keep it secret with a key for decryption, and hashing creates a fixed-size unique output that can\'t be reversed.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '28',
      question: 'What is CSRF?',
      answer: 'Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users to execute unwanted actions on a web application in which they\'re currently authenticated.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '29',
      question: 'What does NIST stand for in cybersecurity?',
      answer: 'National Institute of Standards and Technology, a U.S. government agency that develops cybersecurity standards, guidelines, and frameworks.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '30',
      question: 'What is the GDPR?',
      answer: 'The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for individuals within the European Union and the European Economic Area.',
      category: 'Compliance',
      difficulty: 'medium'
    },
    {
      id: '31',
      question: 'What is a security incident?',
      answer: 'A security incident is an event that potentially violates an organization\'s security policies or threatens the confidentiality, integrity, or availability of its information or systems.',
      category: 'Security Operations',
      difficulty: 'easy'
    },
    {
      id: '32',
      question: 'What is a backdoor in computer security?',
      answer: 'A backdoor is a method of bypassing normal authentication or encryption in a computer system, allowing covert access to data or remote command execution.',
      category: 'Malware',
      difficulty: 'medium'
    },
    {
      id: '33',
      question: 'What is phishing?',
      answer: 'Phishing is a type of social engineering attack where attackers disguise themselves as trustworthy entities to trick individuals into revealing sensitive information such as passwords or credit card numbers.',
      category: 'Social Engineering',
      difficulty: 'easy'
    },
    {
      id: '34',
      question: 'What is the purpose of a VPN?',
      answer: 'A Virtual Private Network (VPN) extends a private network across a public network, enabling users to send and receive data across shared or public networks as if their devices were directly connected to the private network.',
      category: 'Network Security',
      difficulty: 'easy'
    },
    {
      id: '35',
      question: 'What is a security policy?',
      answer: 'A security policy is a document that outlines an organization\'s approach to security, including rules, guidelines, and procedures to protect its assets, systems, and data.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '36',
      question: 'What is a Trojan horse?',
      answer: 'A Trojan horse is a type of malware that disguises itself as legitimate software but contains malicious code that can perform harmful actions when executed.',
      category: 'Malware',
      difficulty: 'easy'
    },
    {
      id: '37',
      question: 'What is the OWASP Top 10?',
      answer: 'The OWASP Top 10 is a regularly updated report outlining the most critical web application security risks, published by the Open Web Application Security Project.',
      category: 'Web Security',
      difficulty: 'medium'
    },
    {
      id: '38',
      question: 'What is DDoS?',
      answer: 'A Distributed Denial of Service (DDoS) attack is an attempt to make an online service unavailable by overwhelming it with traffic from multiple sources, disrupting normal service for legitimate users.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '39',
      question: 'What is the principle of defense in depth?',
      answer: 'Defense in depth is a security strategy that employs multiple layers of security controls throughout a system, so if one layer fails, another layer will provide protection.',
      category: 'Security Fundamentals',
      difficulty: 'medium'
    },
    {
      id: '40',
      question: 'What is a security audit?',
      answer: 'A security audit is a systematic evaluation of an organization\'s security posture by measuring how well it conforms to established security criteria, policies, or standards.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '41',
      question: 'What is the purpose of TLS/SSL?',
      answer: 'Transport Layer Security (TLS) and its predecessor Secure Sockets Layer (SSL) are cryptographic protocols designed to provide communications security over a computer network, primarily for secure web browsing.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '42',
      question: 'What is a security risk assessment?',
      answer: 'A security risk assessment identifies, analyzes, and evaluates risks to an organization\'s information assets, helping prioritize security measures based on the likelihood and impact of potential threats.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '43',
      question: 'What is the difference between a threat, vulnerability, and risk?',
      answer: 'A threat is a potential danger, a vulnerability is a weakness that can be exploited, and risk is the potential for loss resulting from a threat exploiting a vulnerability.',
      category: 'Security Fundamentals',
      difficulty: 'medium'
    },
    {
      id: '44',
      question: 'What is a security incident response plan?',
      answer: 'A security incident response plan is a documented, structured approach to handling security incidents, with the goal of limiting damage and reducing recovery time and costs.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '45',
      question: 'What is SOAR in cybersecurity?',
      answer: 'Security Orchestration, Automation, and Response (SOAR) refers to technologies that enable organizations to collect security data and alerts from different sources and automate incident response procedures.',
      category: 'Security Operations',
      difficulty: 'hard'
    },
    {
      id: '46',
      question: 'What is a security framework?',
      answer: 'A security framework is a structured set of guidelines, standards, and best practices for managing security risks and implementing security controls in an organization.',
      category: 'Security Fundamentals',
      difficulty: 'medium'
    },
    {
      id: '47',
      question: 'What is a man-in-the-browser attack?',
      answer: 'A man-in-the-browser attack is a form of internet threat where a trojan horse infects a web browser and modifies web pages or transaction content in real-time.',
      category: 'Web Security',
      difficulty: 'hard'
    },
    {
      id: '48',
      question: 'What is the purpose of a CASB?',
      answer: 'A Cloud Access Security Broker (CASB) is a security policy enforcement point placed between cloud service users and cloud service providers to enforce security, compliance, and governance policies.',
      category: 'Cloud Security',
      difficulty: 'hard'
    },
    {
      id: '49',
      question: 'What is the purpose of a security operations center (SOC)?',
      answer: 'A Security Operations Center (SOC) is a centralized unit that deals with security issues on an organizational and technical level, continuously monitoring and analyzing an organization\'s security posture.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
    {
      id: '50',
      question: 'What is the difference between a security assessment and a security audit?',
      answer: 'A security assessment evaluates an organization\'s security posture by identifying vulnerabilities and recommending improvements, while a security audit formally verifies compliance with established policies, standards, or regulations.',
      category: 'Security Operations',
      difficulty: 'medium'
    },
  ];
  
  const currentCard = flashcards[currentCardIndex];
  
  const goToNextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
    }, 300);
  };
  
  const goToPreviousCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };
  
  const toggleFlip = () => {
    setFlipped(!flipped);
  };
  
  const markAsKnown = () => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.add(currentCard.id);
      return newSet;
    });
    goToNextCard();
  };
  
  const markAsUnknown = () => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    goToNextCard();
  };
  
  const resetCard = () => {
    setFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Flashcards</h2>
        <p className="text-muted-foreground">
          Review key concepts with AI-generated flashcards
        </p>
      </AnimatedTransition>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentCardIndex + 1} of {flashcards.length}
        </div>
        <div className="text-sm">
          <span className="font-medium">Known:</span> {knownCards.size} of {flashcards.length}
        </div>
      </div>
      
      <AnimatedTransition animation="scale" className="flex justify-center">
        <div className="w-full max-w-2xl aspect-[3/2] perspective-1000">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentCardIndex + (flipped ? '-flipped' : '')}
              className={cn(
                "relative w-full h-full rounded-xl shadow-lg cursor-pointer transform-style-3d transition-transform duration-500",
                flipped ? "rotate-y-180" : ""
              )}
              initial={{ opacity: 0, rotateY: flipped ? -180 : 0 }}
              animate={{ opacity: 1, rotateY: flipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={toggleFlip}
            >
              {/* Front of card (Question) */}
              <div 
                className={cn(
                  "absolute inset-0 backface-hidden rounded-xl border p-6 flex flex-col",
                  "bg-card text-card-foreground"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    getDifficultyColor(currentCard.difficulty)
                  )}>
                    {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                  </span>
                  
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {currentCard.category}
                  </span>
                </div>
                
                <div className="flex-1 flex items-center justify-center text-center">
                  <h3 className="text-xl font-medium">{currentCard.question}</h3>
                </div>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  Click to reveal answer
                </div>
              </div>
              
              {/* Back of card (Answer) */}
              <div 
                className={cn(
                  "absolute inset-0 backface-hidden rotate-y-180 rounded-xl border p-6 flex flex-col",
                  "bg-secondary text-foreground"
                )}
              >
                <div className="flex-1 flex items-center justify-center text-center">
                  <p>{currentCard.answer}</p>
                </div>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  Click to see question
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedTransition>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={goToPreviousCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={resetCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={markAsUnknown}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          aria-label="Mark as not known"
        >
          <XCircle className="w-5 h-5" />
        </button>
        
        <button
          onClick={markAsKnown}
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          aria-label="Mark as known"
        >
          <CheckCircle className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToNextCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <style>
        {`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        `}
      </style>
    </div>
  );
};

export default Flashcards;
