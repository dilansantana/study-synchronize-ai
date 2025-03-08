
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentFormatterProps {
  content: string;
}

export const ContentFormatter: React.FC<ContentFormatterProps> = ({ content }) => {
  // Function to render content with appropriate formatting
  const renderFormattedContent = (content: string) => {
    // Basic markdown-style parsing to add structure
    const sections = content.split(/\n#{2,3} /);
    
    if (sections.length <= 1) {
      // No headers found, return the content with paragraph formatting
      return (
        <div className="space-y-3 text-[15px] leading-relaxed">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      );
    }
    
    return (
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => {
          if (index === 0 && !section.trim().startsWith('#')) {
            // This is intro content before any headers
            return (
              <div key="intro" className="mb-3 text-[15px] leading-relaxed">
                {section}
              </div>
            );
          }
          
          const lines = section.split('\n');
          const title = lines[0].replace(/^#+\s*/, '');
          const content = lines.slice(1).join('\n');
          
          return (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-base font-medium py-2">
                {title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-[15px] leading-relaxed pl-2 border-l-2 border-gray-200">
                  {content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.trim().startsWith('- ')) {
                      // This is a bullet list
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j}>{item.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  return renderFormattedContent(content);
};
