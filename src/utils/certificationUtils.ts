
export const getSimilarityCertifications = (
  query: string, 
  validCertifications: string[],
  certificationNames: Record<string, string>
): string[] => {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase().trim();
  const results: [string, number][] = [];
  
  // Check for acronyms first (like AWS, PMP, CEH)
  const queryIsAcronym = queryLower.toUpperCase() === queryLower && queryLower.length <= 6;
  
  for (const certId of validCertifications) {
    const certName = certificationNames[certId] || certId;
    const nameLower = certName.toLowerCase();
    let score = 0;
    
    // Direct match in name or ID - highest priority
    if (nameLower.includes(queryLower) || certId.includes(queryLower)) {
      score = 25; // Higher score for direct matches
      
      // Exact match or starts with the query - highest priority
      if (nameLower === queryLower || 
          nameLower.startsWith(queryLower + ' ') || 
          certId === queryLower) {
        score = 50; // Even higher for exact matches
      }
      
      results.push([certId, score]);
      continue;
    }
    
    // Handle acronym matching
    if (queryIsAcronym) {
      // Extract parentheses content like "PMP" from "Project Management Professional (PMP)"
      const acronymMatch = certName.match(/\(([^)]+)\)/);
      if (acronymMatch && acronymMatch[1].toLowerCase() === queryLower) {
        results.push([certId, 45]); // High score for acronym matches
        continue;
      }
      
      // Check if initials match (AWS = Amazon Web Services)
      const words = certName.split(/\s+/);
      const initials = words.map(word => word[0] || '').join('').toLowerCase();
      if (initials === queryLower) {
        results.push([certId, 40]);
        continue;
      }
    }
    
    // Check for brand/vendor matches (Okta, AWS, etc.)
    const brandNames = ["okta", "aws", "comptia", "cisco", "microsoft", "azure", 
                       "salesforce", "google", "vmware", "isaca", "scrum", "servicenow", 
                       "itil", "splunk"];
    
    for (const brand of brandNames) {
      if (queryLower.includes(brand) && nameLower.includes(brand)) {
        score = queryLower === brand ? 35 : 20; // Higher score for exact brand match
        results.push([certId, score]);
        continue;
      }
    }
    
    // Check for certification types/levels
    const certTypes = ["administrator", "professional", "associate", "practitioner", 
                      "architect", "developer", "cloud", "security", "network",
                      "certified", "foundation", "fundamentals", "master"];
    
    for (const type of certTypes) {
      if (queryLower.includes(type) && nameLower.includes(type)) {
        score = 15; // Score for matching certification types
        results.push([certId, score]);
        continue;
      }
    }
    
    // Check for individual word matches
    const queryWords = queryLower.split(/\s+/);
    const nameWords = nameLower.split(/\s+/);
    let wordMatchScore = 0;
    
    for (const queryWord of queryWords) {
      if (queryWord.length < 2) continue;
      
      for (const nameWord of nameWords) {
        // Exact word match
        if (nameWord === queryWord) {
          wordMatchScore += 10;
        }
        // Word contains query word
        else if (nameWord.includes(queryWord)) {
          wordMatchScore += 6;
        }
        // Word starts with query word
        else if (nameWord.startsWith(queryWord)) {
          wordMatchScore += 5;
        }
        // Query word starts with word (partial match)
        else if (queryWord.startsWith(nameWord) && nameWord.length >= 3) {
          wordMatchScore += 4;
        }
        // Contains at least 3 characters of query word
        else if (nameWord.includes(queryWord.substring(0, 3)) && queryWord.length >= 3) {
          wordMatchScore += 3;
        }
      }
    }
    
    if (wordMatchScore > 0) {
      results.push([certId, wordMatchScore]);
    }
  }
  
  // Debug logging for transparency
  console.log("Query:", query);
  console.log("Matches:", results.map(r => `${certificationNames[r[0]]} (${r[1]})`).join(', '));
  
  // Sort by score (highest first) and return top 8 results
  return results
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(item => item[0]);
};

export const searchCertificationsOnline = async (query: string): Promise<any[]> => {
  try {
    console.log("Searching online for:", query);
    
    // Simulate a delay for the online search
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This is where we would integrate with a real API to search for certifications
    // For now, we'll simulate results based on common certification patterns
    const searchQuery = query.toLowerCase().trim();
    
    const onlineResults = [];
    
    // Check if the query resembles a certification name or acronym
    if (searchQuery.includes('certified') || 
        searchQuery.includes('certification') || 
        searchQuery.includes('cert') ||
        searchQuery.match(/^[a-z0-9\-\+]+$/i)) { // Simple pattern for acronyms like CCNA, AWS+, etc.
      
      // Generate some plausible results based on the query
      onlineResults.push({
        id: `online-${searchQuery.replace(/\s+/g, '-')}`,
        name: query.length <= 6 ? 
              query.toUpperCase() + ' Certification' : 
              query.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: `This certification was found online based on your search for "${query}".`,
        source: 'online',
        category: detectCategory(searchQuery)
      });
      
      // Add some related results
      if (searchQuery.includes('cloud')) {
        onlineResults.push({
          id: 'online-cloud-certification',
          name: 'Cloud Computing Certification',
          description: 'Related cloud certification found online.',
          source: 'online',
          category: 'Cloud'
        });
      }
      
      if (searchQuery.includes('security')) {
        onlineResults.push({
          id: 'online-security-certification',
          name: 'Security Professional Certification',
          description: 'Related security certification found online.',
          source: 'online',
          category: 'Security'
        });
      }
    }
    
    return onlineResults;
  } catch (error) {
    console.error("Error searching for certifications online:", error);
    return [];
  }
};

// Helper function to detect certification category based on search terms
function detectCategory(query: string): string {
  const categoryMap: Record<string, string> = {
    'security': 'Security',
    'network': 'Networking',
    'cloud': 'Cloud',
    'aws': 'Cloud',
    'azure': 'Cloud',
    'google': 'Cloud',
    'project': 'Management',
    'scrum': 'Management',
    'agile': 'Management',
    'itil': 'Service Management',
    'data': 'Data',
    'analytics': 'Data',
    'developer': 'Development',
    'programming': 'Development',
    'code': 'Development',
    'admin': 'Administration',
    'linux': 'Systems',
    'windows': 'Systems',
    'cyber': 'Security',
  };
  
  for (const [key, value] of Object.entries(categoryMap)) {
    if (query.includes(key)) {
      return value;
    }
  }
  
  return 'Other';
}

