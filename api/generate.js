export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      prompt,
      target,
      ai,
      background,
      style = '寫實攝影風格，自然光，16:9',
      expression = '開心微笑',
      action = '伸手比YA',
      framing = '低角度魔角自拍'
    } = req.body || {};

    const finalPrompt = `
你是一位專業攝影師，協助客戶「${target}」主題拍攝。
地點為 ${background}。攝影風格：${style}，構圖：${framing}。
請為主角 ${ai} 拍攝以下情境：「${prompt}」。
他表情 ${expression}，動作為 ${action}。
`;

    return res.status(200).json({ prompt: finalPrompt.trim() });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return res.status(500).json({ error: 'Failed to generate prompt' });
  }
}

