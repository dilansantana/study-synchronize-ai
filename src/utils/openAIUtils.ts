
// OpenAI API utilities for processing content with GPT models

/**
 * Sends content to OpenAI GPT for optimization and summarization
 * @param content The original content to optimize
 * @param title The title of the content
 * @returns Optimized content with key points extracted
 */
export const optimizeContentWithGPT = async (content: string, title: string): Promise<string> => {
  try {
    // For production, you would use a server-side API or Supabase Edge Function
    // This approach is for demonstration purposes only
    
    // Get API key from localStorage (temporary solution)
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please add your API key in settings.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the less expensive model
        messages: [
          {
            role: 'system',
            content: `You are an expert study guide optimizer. Extract and organize the most important information from the provided content.
            Focus on key concepts, definitions, and practical insights.
            Format your response as markdown with clear headings, bullet points, and sections.
            Be concise but comprehensive, highlighting what's most important for learning.`
          },
          {
            role: 'user',
            content: `Please analyze and optimize this study guide about "${title}". Extract the key points and organize them for better learning:
            
            ${content.substring(0, 15000)}` // Truncate to avoid token limits
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error optimizing content with GPT:', error);
    throw error;
  }
};
