import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AnimatedTransition from './AnimatedTransition';
import { CheckCircle, XCircle, HelpCircle, ArrowRight, Timer, BarChart, Award } from 'lucide-react';
import { useUserProgress } from '@/utils/progressUtils';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizComponentProps {
  className?: string;
  timeLimit?: number; // in seconds
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  className,
  timeLimit = 60
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  
  const { updateQuizScore } = useUserProgress();
  
  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Which protocol is used to secure web traffic with encryption?',
      options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
      correctAnswer: 2,
      explanation: 'HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP that uses TLS/SSL encryption to protect data in transit.',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'What type of attack tries many password combinations to gain unauthorized access?',
      options: ['Phishing', 'Man-in-the-middle', 'Brute force', 'SQL injection'],
      correctAnswer: 2,
      explanation: 'A brute force attack attempts to gain access by systematically trying all possible password combinations until the correct one is found.',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'Which of the following is NOT a part of the CIA triad in information security?',
      options: ['Confidentiality', 'Integrity', 'Authentication', 'Availability'],
      correctAnswer: 2,
      explanation: 'The CIA triad consists of Confidentiality, Integrity, and Availability. Authentication, while important, is not part of this fundamental security model.',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'What is the default port for HTTPS?',
      options: ['80', '443', '22', '25'],
      correctAnswer: 1,
      explanation: 'Port 443 is the standard port for HTTPS traffic, while port 80 is used for HTTP.',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'Which network device operates at Layer 3 of the OSI model?',
      options: ['Hub', 'Switch', 'Router', 'Bridge'],
      correctAnswer: 2,
      explanation: 'Routers operate at Layer 3 (Network layer) of the OSI model, making routing decisions based on IP addresses.',
      difficulty: 'medium'
    },
    {
      id: '6',
      question: 'What does DNS stand for?',
      options: ['Dynamic Network Service', 'Domain Name System', 'Digital Network Security', 'Data Network Standard'],
      correctAnswer: 1,
      explanation: 'DNS (Domain Name System) translates domain names to IP addresses so browsers can load internet resources.',
      difficulty: 'easy'
    },
    {
      id: '7',
      question: 'Which of the following is a stateless protocol?',
      options: ['FTP', 'Telnet', 'HTTP', 'SSH'],
      correctAnswer: 2,
      explanation: 'HTTP is stateless, meaning each request is independent and the server maintains no information about past client requests.',
      difficulty: 'medium'
    },
    {
      id: '8',
      question: 'What is the purpose of a CAPTCHA?',
      options: ['Encrypt data', 'Distinguish humans from bots', 'Block malware', 'Manage passwords'],
      correctAnswer: 1,
      explanation: 'CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is designed to determine whether the user is human or a bot.',
      difficulty: 'easy'
    },
    {
      id: '9',
      question: 'Which encryption algorithm is considered obsolete and insecure?',
      options: ['AES', 'RSA', 'DES', 'SHA-256'],
      correctAnswer: 2,
      explanation: 'DES (Data Encryption Standard) is now considered insecure due to its small key size (56 bits) and has been replaced by more secure algorithms like AES.',
      difficulty: 'hard'
    },
    {
      id: '10',
      question: 'What is a honeypot in cybersecurity?',
      options: ['A type of malware', 'A decoy system to attract attackers', 'An encryption method', 'A password manager'],
      correctAnswer: 1,
      explanation: 'A honeypot is a security mechanism that creates a deliberate vulnerability to attract and detect attackers, studying their behavior and potentially identifying new threats.',
      difficulty: 'medium'
    },
    {
      id: '11', 
      question: 'What is the main purpose of a VPN?',
      options: ['Block all ads', 'Increase internet speed', 'Create a secure, encrypted connection', 'Store passwords securely'],
      correctAnswer: 2,
      explanation: 'A Virtual Private Network (VPN) establishes an encrypted connection over a less secure network, providing privacy and anonymity by hiding the user\'s internet protocol (IP) address.',
      difficulty: 'easy'
    },
    {
      id: '12',
      question: 'What is a zero-day exploit?',
      options: ['An attack that occurs at midnight', 'An attack that targets vulnerabilities with no patches', 'A virus that deletes all data', 'A DDoS attack that lasts for 24 hours'],
      correctAnswer: 1,
      explanation: 'A zero-day exploit targets a previously unknown vulnerability in software or hardware, for which no patch exists yet, giving developers "zero days" to address it before it\'s exploited.',
      difficulty: 'hard'
    },
    {
      id: '13',
      question: 'What is the purpose of NAT (Network Address Translation)?',
      options: ['To filter unwanted traffic', 'To map private IP addresses to public IPs', 'To encrypt network traffic', 'To compress data packets'],
      correctAnswer: 1,
      explanation: 'NAT maps private IP addresses from a local network to one or more public IP addresses, allowing multiple devices to share a single public IP address.',
      difficulty: 'medium'
    },
    {
      id: '14',
      question: 'Which protocol operates at the Transport layer of the OSI model?',
      options: ['HTTP', 'IP', 'TCP', 'Ethernet'],
      correctAnswer: 2,
      explanation: 'TCP (Transmission Control Protocol) operates at layer 4 (Transport) of the OSI model, providing reliable, connection-oriented data transfer.',
      difficulty: 'medium'
    },
    {
      id: '15',
      question: 'What is a subnet mask used for?',
      options: ['To identify the network portion of an IP address', 'To encrypt data packets', 'To block malicious websites', 'To compress network traffic'],
      correctAnswer: 0,
      explanation: 'A subnet mask is used to divide an IP address into network and host portions, allowing routers to determine which part of the address identifies the network and which part identifies the host.',
      difficulty: 'medium'
    },
    {
      id: '16',
      question: 'What is the difference between a hub and a switch?',
      options: ['Hubs are faster than switches', 'Switches operate at Layer 1, hubs at Layer 2', 'Hubs forward data to all ports, switches only to the intended recipient', 'There is no difference'],
      correctAnswer: 2,
      explanation: 'Hubs operate at Layer 1 and broadcast data to all connected devices, while switches operate at Layer 2 and forward data only to the intended recipient based on MAC addresses.',
      difficulty: 'medium'
    },
    {
      id: '17',
      question: 'What is ARP used for?',
      options: ['To map IP addresses to MAC addresses', 'To secure wireless networks', 'To compress data packets', 'To translate domain names to IP addresses'],
      correctAnswer: 0,
      explanation: 'Address Resolution Protocol (ARP) maps IP addresses to MAC addresses on a local network, which is necessary for devices to communicate at the data link layer.',
      difficulty: 'medium'
    },
    {
      id: '18',
      question: 'Which of the following is a benefit of IPv6 over IPv4?',
      options: ['Simpler header format', 'Smaller address space', 'Lower security', 'Less efficient routing'],
      correctAnswer: 0,
      explanation: 'IPv6 offers several advantages over IPv4, including a simplified header format which improves router efficiency and processing speed.',
      difficulty: 'medium'
    },
    {
      id: '19',
      question: 'What is a MAC address?',
      options: ['A software license', 'A physical address assigned to network interfaces', 'An encryption algorithm', 'A type of malware'],
      correctAnswer: 1,
      explanation: 'A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for communications at the data link layer.',
      difficulty: 'easy'
    },
    {
      id: '20',
      question: 'Which encryption algorithm is used in WPA3?',
      options: ['DES', 'AES', 'RC4', '3DES'],
      correctAnswer: 1,
      explanation: 'WPA3 uses AES (Advanced Encryption Standard) in the Counter Mode with Cipher Block Chaining Message Authentication Code Protocol (CCMP).',
      difficulty: 'medium'
    },
    {
      id: '21',
      question: 'What is the purpose of DHCP?',
      options: ['To automatically assign IP addresses to devices', 'To translate domain names to IP addresses', 'To secure wireless networks', 'To route internet traffic'],
      correctAnswer: 0,
      explanation: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and other network configuration parameters to devices on a network.',
      difficulty: 'easy'
    },
    {
      id: '22',
      question: 'What is the purpose of a firewall?',
      options: ['To speed up network traffic', 'To compress data packets', 'To monitor and control incoming and outgoing network traffic', 'To assign IP addresses to devices'],
      correctAnswer: 2,
      explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between a trusted network and untrusted networks.',
      difficulty: 'easy'
    },
    {
      id: '23',
      question: 'Which protocol is used for secure email transmission?',
      options: ['HTTP', 'SMTP', 'SMTPS', 'FTP'],
      correctAnswer: 2,
      explanation: 'SMTPS (Simple Mail Transfer Protocol Secure) is SMTP with added SSL/TLS encryption for secure email transmission.',
      difficulty: 'medium'
    },
    {
      id: '24',
      question: 'What is the purpose of ICMP?',
      options: ['To manage multicast groups', 'To send error messages and operational information', 'To assign IP addresses', 'To encrypt data packets'],
      correctAnswer: 1,
      explanation: 'Internet Control Message Protocol (ICMP) is used by network devices to send error messages and operational information, such as whether a requested service is unavailable or a host could not be reached.',
      difficulty: 'medium'
    },
    {
      id: '25',
      question: 'What is the main function of a router?',
      options: ['To connect different networks together', 'To assign IP addresses', 'To encrypt data packets', 'To block malicious websites'],
      correctAnswer: 0,
      explanation: 'The main function of a router is to connect different networks together, forwarding data packets between them based on their IP addresses.',
      difficulty: 'easy'
    },
    {
      id: '26',
      question: 'What is a VLAN?',
      options: ['A virtual private network', 'A type of malware', 'A logical grouping of networked devices', 'A wireless security protocol'],
      correctAnswer: 2,
      explanation: 'A VLAN (Virtual Local Area Network) is a logical grouping of networked devices that appears to be on the same LAN regardless of their physical location.',
      difficulty: 'medium'
    },
    {
      id: '27',
      question: 'What does SSL/TLS provide?',
      options: ['Data compression', 'Bandwidth management', 'Authentication and encryption', 'IP address allocation'],
      correctAnswer: 2,
      explanation: 'SSL/TLS (Secure Sockets Layer/Transport Layer Security) provides authentication, privacy, and data integrity through encryption for communications over networks.',
      difficulty: 'medium'
    },
    {
      id: '28',
      question: 'What is a proxy server?',
      options: ['A server that creates backups', 'An intermediary server between clients and other servers', 'A server that assigns IP addresses', 'A server that stores website content'],
      correctAnswer: 1,
      explanation: 'A proxy server acts as an intermediary between clients and other servers, often used for privacy, security, or to bypass restrictions.',
      difficulty: 'medium'
    },
    {
      id: '29',
      question: 'What is a DMZ in network security?',
      options: ['A type of firewall', 'A network protocol', 'A physical security zone', 'A subnetwork that exposes external-facing services'],
      correctAnswer: 3,
      explanation: 'A DMZ (Demilitarized Zone) is a subnetwork that exposes an organization\'s external-facing services to an untrusted network, typically the internet, while keeping the internal network separate and secure.',
      difficulty: 'hard'
    },
    {
      id: '30',
      question: 'Which port is commonly used for HTTP?',
      options: ['21', '22', '80', '443'],
      correctAnswer: 2,
      explanation: 'Port 80 is the standard port used for HTTP (Hypertext Transfer Protocol) traffic.',
      difficulty: 'easy'
    },
    {
      id: '31',
      question: 'What is the purpose of a load balancer?',
      options: ['To distribute network traffic across multiple servers', 'To compress data packets', 'To assign IP addresses', 'To block malicious websites'],
      correctAnswer: 0,
      explanation: 'A load balancer distributes network traffic across multiple servers to ensure no single server is overwhelmed, improving reliability and performance.',
      difficulty: 'medium'
    },
    {
      id: '32',
      question: 'What is BGP used for?',
      options: ['File transfer', 'Email routing', 'Internet routing', 'Domain name resolution'],
      correctAnswer: 2,
      explanation: 'Border Gateway Protocol (BGP) is the routing protocol for the internet, making decisions about the best paths for data to travel across interconnected autonomous systems.',
      difficulty: 'hard'
    },
    {
      id: '33',
      question: 'What is the purpose of OSPF?',
      options: ['To translate domain names to IP addresses', 'To route packets within an autonomous system', 'To secure wireless networks', 'To assign IP addresses'],
      correctAnswer: 1,
      explanation: 'Open Shortest Path First (OSPF) is a routing protocol used to determine the best path for packets within an autonomous system, using a link-state routing algorithm.',
      difficulty: 'hard'
    },
    {
      id: '34',
      question: 'What is a subnet?',
      options: ['A secondary network', 'A logical division of an IP network', 'A type of malware', 'A backup server'],
      correctAnswer: 1,
      explanation: 'A subnet (subnetwork) is a logical subdivision of an IP network, allowing for more efficient use of IP addresses and improved security.',
      difficulty: 'medium'
    },
    {
      id: '35',
      question: 'What does CIDR stand for?',
      options: ['Computer Integrated Domain Routing', 'Classless Inter-Domain Routing', 'Central Internet Data Registry', 'Coordinated IP Domain Resolution'],
      correctAnswer: 1,
      explanation: 'CIDR (Classless Inter-Domain Routing) is a method for allocating IP addresses and routing IP packets, replacing the earlier classful network addressing.',
      difficulty: 'medium'
    },
    {
      id: '36',
      question: 'What is the purpose of a DNS server?',
      options: ['To assign IP addresses', 'To translate domain names to IP addresses', 'To secure wireless networks', 'To route internet traffic'],
      correctAnswer: 1,
      explanation: 'DNS (Domain Name System) servers translate human-readable domain names (like example.com) to machine-readable IP addresses that computers use to communicate.',
      difficulty: 'easy'
    },
    {
      id: '37',
      question: 'What is a MAC address spoofing?',
      options: ['A security measure', 'Changing a device\'s MAC address to impersonate another device', 'A network troubleshooting technique', 'A type of encryption'],
      correctAnswer: 1,
      explanation: 'MAC address spoofing involves changing a device\'s MAC address to impersonate another device, potentially bypassing security controls or hiding the device\'s true identity.',
      difficulty: 'medium'
    },
    {
      id: '38',
      question: 'What is the difference between TCP and UDP?',
      options: ['TCP is faster, UDP is more reliable', 'TCP is connectionless, UDP is connection-oriented', 'TCP is connection-oriented and reliable, UDP is connectionless and faster', 'There is no difference'],
      correctAnswer: 2,
      explanation: 'TCP (Transmission Control Protocol) is connection-oriented and provides reliable, ordered delivery, while UDP (User Datagram Protocol) is connectionless, offering faster but less reliable transmission.',
      difficulty: 'medium'
    },
    {
      id: '39',
      question: 'What is the purpose of SNMP?',
      options: ['To manage and monitor network devices', 'To encrypt data packets', 'To translate domain names to IP addresses', 'To assign IP addresses'],
      correctAnswer: 0,
      explanation: 'Simple Network Management Protocol (SNMP) is used to manage and monitor network devices, collecting information and allowing administrators to modify device settings.',
      difficulty: 'medium'
    },
    {
      id: '40',
      question: 'What is a stateful firewall?',
      options: ['A firewall that filters traffic based only on predefined rules', 'A firewall that keeps track of active connections', 'A firewall that generates reports', 'A firewall that encrypts data'],
      correctAnswer: 1,
      explanation: 'A stateful firewall keeps track of the state of active connections and makes decisions about network traffic based on the context of those connections, not just predefined rules.',
      difficulty: 'medium'
    },
    {
      id: '41',
      question: 'What is a DNS cache poisoning attack?',
      options: ['Deleting DNS records', 'Slowing down DNS servers', 'Corrupting DNS data to redirect users to malicious websites', 'Overloading DNS servers'],
      correctAnswer: 2,
      explanation: 'DNS cache poisoning involves corrupting a DNS server\'s cache with false information, redirecting users to fraudulent websites instead of the legitimate ones they requested.',
      difficulty: 'hard'
    },
    {
      id: '42',
      question: 'What does SSH stand for?',
      options: ['Secure Socket Handler', 'System Service Host', 'Secure Shell', 'Server Side Hosting'],
      correctAnswer: 2,
      explanation: 'SSH (Secure Shell) is a cryptographic network protocol for secure communication over an unsecured network, commonly used for remote login to computer systems.',
      difficulty: 'easy'
    },
    {
      id: '43',
      question: 'What is a botnet?',
      options: ['A network of security devices', 'A group of compromised computers controlled remotely', 'A type of firewall', 'A automated network troubleshooting tool'],
      correctAnswer: 1,
      explanation: 'A botnet is a network of compromised computers infected with malware that allows them to be controlled remotely without the owners\' knowledge, often used for malicious activities.',
      difficulty: 'medium'
    },
    {
      id: '44',
      question: 'What is a MITM attack?',
      options: ['Multiple Interface Token Management', 'Man-In-The-Middle attack', 'Managed IT Model', 'Mobile Information Transfer Method'],
      correctAnswer: 1,
      explanation: 'A Man-In-The-Middle (MITM) attack occurs when an attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.',
      difficulty: 'medium'
    },
    {
      id: '45',
      question: 'What is the purpose of a VPN?',
      options: ['To speed up internet connection', 'To create a secure, encrypted connection over a less secure network', 'To assign IP addresses', 'To translate domain names to IP addresses'],
      correctAnswer: 1,
      explanation: 'A Virtual Private Network (VPN) creates a secure, encrypted connection over a less secure network, such as the public internet, providing privacy and anonymity.',
      difficulty: 'easy'
    },
    {
      id: '46',
      question: 'What does CSRF stand for in web security?',
      options: ['Client-Side Request Forgery', 'Cross-Site Request Forgery', 'Cross-Service Resource Function', 'Client Security Response Framework'],
      correctAnswer: 1,
      explanation: 'Cross-Site Request Forgery (CSRF) is an attack that forces a user to execute unwanted actions on a web application in which they\'re currently authenticated.',
      difficulty: 'hard'
    },
    {
      id: '47',
      question: 'What is the main purpose of SIEM systems?',
      options: ['To assign IP addresses', 'To collect and analyze security event data', 'To encrypt network traffic', 'To block malicious websites'],
      correctAnswer: 1,
      explanation: 'Security Information and Event Management (SIEM) systems collect and analyze security event data from various sources to provide real-time analysis of security alerts.',
      difficulty: 'medium'
    },
    {
      id: '48',
      question: 'What is the purpose of a WAF?',
      options: ['To accelerate web traffic', 'To protect web applications from attacks', 'To compress web content', 'To cache web pages'],
      correctAnswer: 1,
      explanation: 'A Web Application Firewall (WAF) protects web applications by filtering and monitoring HTTP traffic between a web application and the Internet, specifically designed to defend from attacks like XSS and SQL injection.',
      difficulty: 'medium'
    },
    {
      id: '49',
      question: 'What is RADIUS used for?',
      options: ['File sharing', 'Network authentication and authorization', 'Email encryption', 'Web browsing'],
      correctAnswer: 1,
      explanation: 'RADIUS (Remote Authentication Dial-In User Service) provides centralized authentication, authorization, and accounting management for users connecting to a network service.',
      difficulty: 'medium'
    },
    {
      id: '50',
      question: 'What is the purpose of LDAP?',
      options: ['To locate resources on a network', 'To secure wireless networks', 'To compress data packets', 'To assign IP addresses'],
      correctAnswer: 0,
      explanation: 'Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral protocol for accessing and maintaining distributed directory information services over an IP network, often used for authentication and authorization.',
      difficulty: 'hard'
    },
    {
      id: '51',
      question: 'What is the primary function of a switch in a network?',
      options: ['To connect different networks', 'To forward data based on MAC addresses', 'To translate domain names to IP addresses', 'To assign IP addresses'],
      correctAnswer: 1,
      explanation: 'A switch forwards data packets between devices on the same network based on MAC addresses, operating at the data link layer (Layer 2) of the OSI model.',
      difficulty: 'easy'
    },
    {
      id: '52',
      question: 'What is a zero-trust security model?',
      options: ['A model that trusts all internal network traffic', 'A model that trusts verified external traffic', 'A model that trusts no one by default', 'A model that has no security measures'],
      correctAnswer: 2,
      explanation: 'The zero-trust security model operates on the principle of "never trust, always verify," requiring strict identity verification for everyone trying to access resources, regardless of whether they are inside or outside the network perimeter.',
      difficulty: 'hard'
    }
  ];
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    if (quizCompleted || showExplanation) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (selectedOption === null) {
            handleOptionSelect(-1); // Time's up, count as wrong
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizCompleted, showExplanation, selectedOption]);
  
  useEffect(() => {
    setRemainingTime(timeLimit);
  }, [currentQuestionIndex, timeLimit]);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || showExplanation) return;
    
    setSelectedOption(optionIndex);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const scorePercentage = Math.round((score / questions.length) * 100);
      updateQuizScore(scorePercentage);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setRemainingTime(timeLimit);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getOptionClass = (index: number) => {
    if (!showExplanation) {
      return selectedOption === index ? 'border-primary bg-primary/5' : 'hover:bg-secondary/80';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
    
    if (selectedOption === index && index !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
    
    return 'opacity-50';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center">
            <AnimatedTransition animation="fade" className="space-y-1">
              <h2 className="text-xl font-semibold">Practice Quiz</h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition animation="scale" className="flex items-center space-x-2 text-sm font-medium">
              <Timer className="w-4 h-4 text-amber-500" />
              <span className={cn(
                remainingTime < 10 && "text-red-500 animate-pulse"
              )}>
                {formatTime(remainingTime)}
              </span>
            </AnimatedTransition>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            />
          </div>
          
          <AnimatedTransition animation="scale" className="p-6 rounded-xl border bg-card">
            <div className="flex items-start justify-between mb-4">
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                currentQuestion.difficulty === 'easy' ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400" :
                currentQuestion.difficulty === 'medium' ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400" :
                "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
              )}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showExplanation}
                  className={cn(
                    "relative w-full p-4 text-left rounded-lg border transition-all",
                    "bg-card hover:bg-secondary/50",
                    getOptionClass(index)
                  )}
                >
                  <div className="pr-8">{option}</div>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {showExplanation && selectedOption === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </button>
              ))}
            </div>
            
            {showExplanation && (
              <AnimatedTransition animation="slide" className="mt-6 p-4 rounded-lg bg-secondary/70">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Explanation</h4>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </AnimatedTransition>
            )}
          </AnimatedTransition>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestionIndex + (selectedOption !== null ? 1 : 0)}
            </div>
            
            {showExplanation && (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <AnimatedTransition animation="scale" className="p-8 rounded-xl border bg-card text-center">
          <div className="inline-flex items-center justify-center rounded-full p-4 bg-primary/10 text-primary mb-4">
            <Award className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-lg mb-6">
            Your score: <span className="font-bold">{score}/{questions.length}</span>
            <span className="text-muted-foreground ml-2">({Math.round((score / questions.length) * 100)}%)</span>
          </p>
          
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full animate-progress transition-all duration-1000"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold text-green-500">{score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
                <p className="text-xl font-bold text-red-500">{questions.length - score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">{Math.round((score / questions.length) * 100)}%</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Take Another Quiz
            </button>
          </div>
        </AnimatedTransition>
      )}
    </div>
  );
};

export default QuizComponent;
