const pdf = require('pdf-parse');

export default async function handler(req, res) {
  // Config to allow larger payload sizes if needed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel serverless function body parsing for base64
    // We expect the frontend to send base64 string of the PDF
    const { base64Data } = req.body;
    
    if (!base64Data) {
      return res.status(400).json({ error: 'Missing base64Data in body' });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    
    const data = await pdf(buffer);
    
    return res.status(200).json({ text: data.text });
  } catch (err) {
    console.error('PDF Parse Error:', err);
    return res.status(500).json({ error: 'Failed to parse PDF', details: err.message });
  }
}
