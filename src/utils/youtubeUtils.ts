
/**
 * Utility functions for working with YouTube videos
 */

/**
 * Extracts the video ID from a YouTube URL
 * @param url The YouTube URL
 * @returns The YouTube video ID or null if not found
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Regular expressions to match various forms of YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
};

/**
 * Fetches captions for a YouTube video
 * @param videoId The YouTube video ID
 * @returns The captions text or null if not available
 */
export const fetchYouTubeCaptions = async (videoId: string): Promise<string | null> => {
  try {
    // In a real implementation, we would use the YouTube Data API to fetch captions
    // This is a simulated implementation for demonstration purposes
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, generate mock captions based on the video ID
    // In a real app, this would call the YouTube API with proper authentication
    return `
# Automatically extracted captions from YouTube video ${videoId}

## Introduction
Welcome to this video tutorial on certification preparation.

## Key Topics Covered
- Understanding core certification requirements
- Study techniques and resources
- Practice exam strategies
- Time management during the actual exam

## Study Methods
The most effective way to prepare is to combine theoretical knowledge with practical exercises.

## Practice Tests
Taking timed practice tests is crucial for success. You should aim to score at least 80% consistently before the real exam.

## Conclusion
Thank you for watching! Don't forget to subscribe and check out our other certification videos.
    `;
  } catch (error) {
    console.error('Error fetching YouTube captions:', error);
    return null;
  }
};
