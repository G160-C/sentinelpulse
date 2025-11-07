/**
 * Backend API Integration
 * Connects frontend to FastAPI backend
 */

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? '/api' : 'http://localhost:8000/api')
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true'

/**
 * Fetch news from backend API
 */
export const fetchNewsFromBackend = async (filters = {}) => {
  if (!USE_BACKEND) {
    return null // Fall back to mock/real API
  }

  try {
    const response = await fetch(`${API_BASE_URL}/news`)
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform backend format to frontend format
    return data.map((item, index) => ({
      id: item.id?.toString() || `backend-${Date.now()}-${index}`,
      title: item.title || 'Untitled',
      source: item.source || 'Unknown',
      published_at: item.published_at || new Date().toISOString(),
      region: 'Global', // Backend doesn't provide this
      country: 'Unknown',
      severity: 'Medium', // Default, can be enhanced
      confidence: 70,
      tags: extractTagsFromTitle(item.title || ''),
      summary: item.description || item.title || '',
      content: item.description || item.title || '',
      indicators: {
        ips: [],
        urls: [item.url || ''],
        hashes: []
      },
      url: item.url
    }))
  } catch (error) {
    console.error('Failed to fetch from backend:', error)
    return null // Fall back to other sources
  }
}

/**
 * Fetch threats from backend API
 */
export const fetchThreatsFromBackend = async (filters = {}) => {
  if (!USE_BACKEND) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/threats`)
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform backend format to frontend format
    return data.map((item, index) => ({
      id: item.id?.toString() || `threat-${Date.now()}-${index}`,
      title: item.name || 'Unknown Threat',
      source: item.source || 'Unknown',
      published_at: item.detected_at || new Date().toISOString(),
      region: 'Global',
      country: 'Unknown',
      severity: item.severity || 'Medium',
      confidence: 75,
      tags: ['threat-intelligence'],
      summary: item.description || '',
      content: item.description || '',
      indicators: {
        ips: [],
        urls: [],
        hashes: []
      }
    }))
  } catch (error) {
    console.error('Failed to fetch threats from backend:', error)
    return null
  }
}

/**
 * Post news to backend
 */
export const postNewsToBackend = async (newsData) => {
  if (!USE_BACKEND) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newsData.title,
        source: newsData.source,
        url: newsData.url || '',
        published_at: newsData.published_at
      })
    })
    
    if (!response.ok) {
      throw new Error(`Failed to post news: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to post news to backend:', error)
    return null
  }
}

/**
 * Post threat to backend
 */
export const postThreatToBackend = async (threatData) => {
  if (!USE_BACKEND) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/threats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: threatData.title || threatData.name,
        description: threatData.description || threatData.summary || '',
        severity: threatData.severity || 'Medium',
        source: threatData.source || 'Unknown',
        detected_at: threatData.published_at || new Date().toISOString()
      })
    })
    
    if (!response.ok) {
      throw new Error(`Failed to post threat: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to post threat to backend:', error)
    return null
  }
}

/**
 * Helper to extract tags from title
 */
function extractTagsFromTitle(title) {
  const titleLower = title.toLowerCase()
  const tags = []
  
  if (titleLower.includes('ransomware')) tags.push('ransomware')
  if (titleLower.includes('zero-day') || titleLower.includes('0-day')) tags.push('zero-day')
  if (titleLower.includes('phishing')) tags.push('phishing')
  if (titleLower.includes('malware')) tags.push('malware')
  if (titleLower.includes('breach')) tags.push('breach')
  if (titleLower.includes('ddos')) tags.push('ddos')
  if (titleLower.includes('cloud')) tags.push('cloud')
  if (titleLower.includes('iot')) tags.push('iot')
  if (titleLower.includes('ai')) tags.push('ai')
  
  return tags.length > 0 ? tags : ['general']
}
