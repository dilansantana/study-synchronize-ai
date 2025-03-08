
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
    
    if (nameLower.includes(queryLower)) {
      results.push([certId, 3]);
      continue;
    }
    
    const queryWords = queryLower.split(/\s+/);
    const nameWords = nameLower.split(/\s+/);
    let matchScore = 0;
    
    for (const queryWord of queryWords) {
      if (queryWord.length < 2) continue;
      
      for (const nameWord of nameWords) {
        if (nameWord.startsWith(queryWord) || queryWord.startsWith(nameWord)) {
          matchScore += 2;
        } 
        else if (nameWord.includes(queryWord.substring(0, 2))) {
          matchScore += 1;
        }
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
