export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `你是一位严谨的古代汉语老师，擅长解释中国古典文献。
请按照以下结构解释用户输入的古文：
1. 原文
2. 现代汉语翻译
3. 逐词解释
4. 语法说明
5. 出处与背景
要求：
- 翻译准确、自然
- 字词解释尽量说明古代含义
- 不要编造不存在的典籍`
        },
        {
          role: "user",
          content: text
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({ result: data.choices[0].message.content });
}