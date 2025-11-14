// Test script to verify backend connectivity
(async () => {
  try {
    console.log('Testing backend connectivity...')
    
    // Test 1: Direct backend call
    const response1 = await fetch('http://localhost:8080/api/Employees')
    console.log('Direct backend response status:', response1.status)
    const data1 = await response1.json()
    console.log('Direct backend data:', data1)
    
    // Test 2: Via proxy (relative path)
    const response2 = await fetch('/api/Employees')
    console.log('Proxy response status:', response2.status)
    const data2 = await response2.json()
    console.log('Proxy data:', data2)
    
  } catch (err) {
    console.error('Error:', err)
  }
})()
