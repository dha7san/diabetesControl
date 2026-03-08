// Generate random glucose reading
export function generateGlucoseReading() {
  const baseValue = 95 + Math.random() * 60
  return Math.round(baseValue)
}

// Get status based on glucose level
export function getGlucoseStatus(value) {
  if (value < 100) return { status: 'normal', label: 'Normal', color: 'success' }
  if (value < 126) return { status: 'prediabetic', label: 'Pre-diabetic', color: 'warning' }
  return { status: 'diabetic', label: 'High Risk', color: 'danger' }
}

// Generate 7-day trend data
export function generate7DayData() {
  const data = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      glucose: generateGlucoseReading(),
    })
  }
  
  return data
}

// Generate 30-day trend data
export function generate30DayData() {
  const data = []
  const now = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      glucose: generateGlucoseReading(),
    })
  }
  
  return data
}

// Generate recent test results
export function generateRecentTests() {
  const tests = []
  const now = new Date()
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(now)
    date.setHours(date.getHours() - i * 6)
    const glucose = generateGlucoseReading()
    const status = getGlucoseStatus(glucose)
    
    tests.push({
      id: i + 1,
      timestamp: date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      glucose,
      status: status.label,
      statusColor: status.color,
    })
  }
  
  return tests
}

// User profile data
export const userProfile = {
  name: 'John Doe',
  age: 45,
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  deviceId: 'IOT-BATH-001',
  lastSync: new Date().toLocaleString(),
  diabetesHistory: true,
  familyHistory: true,
  notes: 'Pre-diabetic diagnosis in 2023. Monitoring glucose levels regularly.',
}

// Health metrics
export function generateHealthMetrics() {
  const glucose = generateGlucoseReading()
  const status = getGlucoseStatus(glucose)
  
  return {
    currentGlucose: glucose,
    status,
    testsToday: Math.floor(Math.random() * 3) + 1,
    avgGlucose7Day: Math.round(95 + Math.random() * 30),
    lastTestTime: new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}
