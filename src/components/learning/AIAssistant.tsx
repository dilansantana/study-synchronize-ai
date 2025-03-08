
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, SendHorizontal, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  certificationContext?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ certificationContext }) => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi there! I'm your certification study assistant. Ask me any questions about ${certificationContext || 'your certifications'} or how I can help with your studies.`,
      timestamp: new Date()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    // In a real implementation, this would be an API call to a backend
    setTimeout(() => {
      let responseContent = '';
      
      // Sample responses based on keywords
      if (input.toLowerCase().includes('security+') || input.toLowerCase().includes('comptia')) {
        responseContent = "The CompTIA Security+ certification covers network security, compliance and operation security, threats and vulnerabilities, application, data and host security, access control, identity management, and cryptography. It's a great entry-level security certification.";
      }
      else if (input.toLowerCase().includes('ccna') || input.toLowerCase().includes('cisco')) {
        responseContent = "The Cisco CCNA certification validates your skills in network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability.";
      }
      else if (input.toLowerCase().includes('study') || input.toLowerCase().includes('prepare')) {
        responseContent = "For effective certification preparation, I recommend: 1) Start with official study guides, 2) Take practice tests to identify weak areas, 3) Use flashcards for key concepts, 4) Join study groups, and 5) Schedule regular review sessions.";
      }
      else if (input.toLowerCase().includes('difficult') || input.toLowerCase().includes('hard')) {
        responseContent = "Certification exams can be challenging, but with structured study and practice, they're definitely achievable. Focus on understanding concepts rather than memorization, and make sure to take plenty of practice tests.";
      }
      else {
        responseContent = "That's a great question about certification preparation. I'd recommend focusing on hands-on practice along with theoretical knowledge. Is there a specific area you're finding challenging?";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hi there! I'm your certification study assistant. Ask me any questions about ${certificationContext || 'your certifications'} or how I can help with your studies.`,
        timestamp: new Date()
      }
    ]);
    
    toast({
      title: "Conversation cleared",
      description: "Starting a fresh chat session",
      duration: 3000,
    });
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">AI Certification Assistant</CardTitle>
              <CardDescription>Ask anything about your certification journey</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearConversation}>
            Clear Chat
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto pb-0">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className={`h-8 w-8 ${
                  message.role === 'assistant' 
                    ? 'bg-primary/10' 
                    : 'bg-secondary'
                }`}>
                  <AvatarFallback>
                    {message.role === 'assistant' 
                      ? <Bot className="h-4 w-4 text-primary" /> 
                      : <User className="h-4 w-4" />
                    }
                  </AvatarFallback>
                </Avatar>
                <div className={`p-3 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-secondary' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-secondary flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about certification topics, study resources, or exam tips..."
            className="flex-1 min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            size="icon"
            disabled={isLoading || !input.trim()}
            onClick={handleSendMessage}
            className="h-[60px] w-[60px] rounded-full"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full flex justify-center mt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>AI answers are simulated and for demonstration purposes only</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
