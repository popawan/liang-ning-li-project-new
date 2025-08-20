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
  style,
  expression,
  action,
  framing
} = req.body || {};


    const finalPrompt = `
你是一位專業攝影師，協助客戶「${target}」主題拍攝。
地點為 ${background}。

攝影風格：${style || '寫實風格'}，構圖：${framing || '近距離特寫'}。
請為主角 ${ai} 拍攝情境：「${prompt}」。
他表情 ${expression || '自然微笑'}，動作為 ${action || '舉手比YA'}。
    `.trim();

    return res.status(200).json({ prompt: finalPrompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return res.status(500).json({ error: 'Failed to generate prompt' });
  }
}
