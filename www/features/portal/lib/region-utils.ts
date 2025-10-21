/**
 * Detects the region (CA, AE, US) from an address string
 */
export function detectRegionFromAddress(address: string | null | undefined): string | null {
  if (!address) return null

  const addressLower = address.toLowerCase()

  // Canadian postal code pattern: A1A 1A1
  const canadianPostalCodePattern = /[a-z]\d[a-z]\s?\d[a-z]\d/i
  
  // US ZIP code pattern: 12345 or 12345-6789
  const usZipCodePattern = /\b\d{5}(?:-\d{4})?\b/
  
  // UAE postal code is relatively new, look for common indicators
  const uaeIndicators = [
    'uae', 'emirates', 'dubai', 'abu dhabi', 'sharjah', 'ajman', 
    'ras al khaimah', 'fujairah', 'umm al quwain', 'al ain'
  ]
  
  // Canadian provinces and indicators
  const canadianIndicators = [
    'canada', 'ontario', 'quebec', 'british columbia', 'alberta', 
    'manitoba', 'saskatchewan', 'nova scotia', 'new brunswick', 
    'newfoundland', 'prince edward island', 'northwest territories',
    'yukon', 'nunavut', ' on ', ' qc ', ' bc ', ' ab ', ' mb ', 
    ' sk ', ' ns ', ' nb ', ' nl ', ' pe ', ' nt ', ' yt ', ' nu '
  ]
  
  // US states and indicators
  const usIndicators = [
    'united states', 'usa', ' us ', 'alabama', 'alaska', 'arizona', 
    'arkansas', 'california', 'colorado', 'connecticut', 'delaware',
    'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana',
    'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
    'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
    'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey',
    'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio',
    'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina',
    'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia',
    'washington', 'west virginia', 'wisconsin', 'wyoming'
  ]

  // Check for explicit country/region mentions first
  for (const indicator of uaeIndicators) {
    if (addressLower.includes(indicator)) {
      return 'AE'
    }
  }

  for (const indicator of canadianIndicators) {
    if (addressLower.includes(indicator)) {
      return 'CA'
    }
  }

  for (const indicator of usIndicators) {
    if (addressLower.includes(indicator)) {
      return 'US'
    }
  }

  // Check postal code patterns
  if (canadianPostalCodePattern.test(address)) {
    return 'CA'
  }

  if (usZipCodePattern.test(address)) {
    // Could be US, but ZIP codes are just numbers so less certain
    // Only return US if we haven't matched Canada first
    return 'US'
  }

  // Default to null if we can't detect
  return null
}

