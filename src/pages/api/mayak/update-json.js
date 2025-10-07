import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data, file = 'teacher/im' } = req.body
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format' })
    }
    
    const filePath = path.join(process.cwd(), 'public', 'tasks', file, 'index.json')
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error writing file:', error)
    res.status(500).json({ error: 'Error writing file' })
  }
}