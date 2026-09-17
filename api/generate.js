export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: "OPENROUTER_API_KEY is not configured"
    });
  }

  try {
    const {
      topic,
      format,
      contentType,
      audience,
      tone
    } = req.body || {};

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        error: "Topic is required"
      });
    }

    const prompt = `
You are the content engine for AI Content Studio.

Create ORIGINAL Facebook content for a United States audience.

Audience:
${audience || "US professionals, creators, students, freelancers, entrepreneurs and small-business owners"}

Topic:
${topic}

Format:
${format || "Facebook Post"}

Content type:
${contentType || "AI Tools"}

Tone:
${tone || "Conversational"}

Rules:
- Write original content.
- Do not copy existing viral posts.
- Do not invent statistics, quotes, product features or news.
- Avoid fake claims.
- Make the content useful and practical.
- Use natural American English.
- Avoid excessive emojis.
- Avoid spammy hashtags.
- Give the reader a reason to comment or save the post.

Return ONLY valid JSON using exactly these fields:

{
  "hook": "A strong opening hook",
  "post": "The complete Facebook post",
  "cta": "A natural call to action",
  "imagePrompt": "A detailed prompt for generating an image",
  "reelScript": "A short Reel script",
  "carousel": [
    "Slide 1",
    "Slide 2",
    "Slide 3",
    "Slide 4",
    "Slide 5"
  ]
}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-content-studio.vercel.app",
          "X-Title": "AI Content Studio"
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || "openrouter/free",
          messages: [
            {
              role: "system",
              content:
                "You are a professional US-focused Facebook content creator. Follow the requested JSON format exactly."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed"
      });
    }

    const rawContent =
      data?.choices?.[0]?.message?.content || "";

    if (!rawContent) {
      return res.status(502).json({
        error: "The AI returned an empty response"
      });
    }

    let content;

    try {
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      content = JSON.parse(cleaned);
    } catch {
      content = {
        hook: topic,
        post: rawContent,
        cta: "What do you think? Share your thoughts below.",
        imagePrompt:
          `Create a clean modern technology image about ${topic}.`,
        reelScript: rawContent,
        carousel: [
          topic,
          "Why it matters",
          "How it works",
          "Practical tip",
          "Key takeaway"
        ]
      };
    }

    return res.status(200).json({
      content
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error while generating content"
    });
  }
}
