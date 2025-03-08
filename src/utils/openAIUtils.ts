
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
            content: `You are an expert at creating clear, well-structured learning content. Your task is to analyze study material and transform it into a concise, easy-to-read format with clear organization.

            Guidelines for your response:
            1. Structure your response with clear h2 or h3 headings (use markdown format: ## or ###)
            2. Use bullet points for lists of concepts or steps
            3. Use short paragraphs (2-3 sentences max)
            4. Highlight key terms or definitions
            5. Include a brief summary section at the beginning
            6. Organize content logically by topic
            7. Be concise but comprehensive
            8. Focus on the most important concepts for learning`
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
      // Handle quota exceeded error differently
      if (data.error.code === 'insufficient_quota') {
        throw new Error(`OpenAI API error: You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.`);
      }
      throw new Error(`OpenAI API error: ${data.error.message || 'Unknown error'}`);
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error optimizing content with GPT:', error);
    throw error;
  }
};
