import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  try {
    const { userId } = req.query
    const filePath = path.join(process.cwd(), 'data', 'questionnaires.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const jsonData = JSON.parse(fileContents)
    
    if (userId) {
      // Ищем ключ, который содержит указанный ID пользователя
      const userKey = Object.keys(jsonData).find(key => {
        try {
          const userObj = JSON.parse(key)
          return userObj.id === userId
        } catch (e) {
          return false
        }
      })
      
      if (userKey) {
        return res.status(200).json(jsonData[userKey])
      }
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.status(200).json(jsonData)
  } catch (error) {
    console.error('Error reading questionnaires:', error)
    res.status(500).json({ error: 'Error reading questionnaires' })
  }
}