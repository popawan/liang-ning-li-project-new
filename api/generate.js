export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { prompt, target, ai, background } = req.body;

  if (!prompt || !target || !ai || !background) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = `在${background}，${ai} 想請梁寧莉一起自拍，主題聚焦於「${target}」，風格關鍵字為：「${prompt}」。`;

  return res.status(200).json({ prompt: result });
}

