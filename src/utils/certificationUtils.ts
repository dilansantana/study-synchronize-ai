
export const getSimilarityCertifications = (
  query: string, 
  validCertifications: string[],
  certificationNames: Record<string, string>
): string[] => {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase();
  const results: [string, number][] = [];
  
  for (const certId of validCertifications) {
    const certName = certificationNames[certId] || certId;
    const nameLower = certName.toLowerCase();
    
    // Direct match - high priority
    if (nameLower.includes(queryLower)) {
      results.push([certId, 10]); // Even higher score for direct matches
      continue;
    }
    
    // Check for brand matches first (Okta, AWS, etc)
    const brandNames = ["okta", "aws", "comptia", "cisco", "microsoft", "azure"];
    let brandScore = 0;
    
    for (const brand of brandNames) {
      if (queryLower.includes(brand) && nameLower.includes(brand)) {
        brandScore = 8; // Higher score for brand name matches
        break;
      }
    }
    
    if (brandScore > 0) {
      results.push([certId, brandScore]);
      continue;
    }
    
    // Check for individual word matches
    const queryWords = queryLower.split(/\s+/);
    const nameWords = nameLower.split(/\s+/);
    let matchScore = 0;
    
    for (const queryWord of queryWords) {
      if (queryWord.length < 2) continue;
      
      // Check if any name word contains the query word
      for (const nameWord of nameWords) {
        if (nameWord.includes(queryWord)) {
          matchScore += 3; // Increased score for word inclusion
        }
        else if (nameWord.startsWith(queryWord) || queryWord.startsWith(nameWord)) {
          matchScore += 2;
        } 
        else if (nameWord.includes(queryWord.substring(0, 3)) && queryWord.length >= 3) {
          matchScore += 1;
        }
      }
    }
    
    // Special case for certification levels (professional, associate, etc)
    const certLevels = ["professional", "administrator", "associate", "practitioner", "specialist", "expert"];
    for (const level of certLevels) {
      if (queryLower.includes(level) && nameLower.includes(level)) {
        matchScore += 4; // Boost score for matching certification levels
      }
    }
    
    if (matchScore > 0) {
      results.push([certId, matchScore]);
    }
  }
  
  return results
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(item => item[0]);
};
