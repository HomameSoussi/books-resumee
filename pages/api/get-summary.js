import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { bookTitle, author } = req.body;

  const prompt = `
    Write a thorough yet concise summary of **${bookTitle}**. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic.

    Include all of the following in your summary:

    - Main topic or theme of the book
    - Key ideas or arguments presented
    - Chapter titles or main sections of the book with a paragraph on each
    - Key takeaways or conclusions
    - Author's background and qualifications
    - Comparison to other books on the same subject
    - Target audience or intended readership
    - Reception or critical response to the book
    - Publisher and First Published Date
    - Recommendations [Other similar books on the same topic]

    To sum up:  **The book's biggest takeaway and point in a singular sentence**

    ## Main topic or theme

    ## Key ideas or arguments presented

    ## Chapter titles or main sections of the book

    ## Key takeaways or conclusions

    ## Author's background and qualifications

    ## Comparison to other books on the same subject

    ## Target audience or intended readership

    ## Reception or critical response to the book

    ## Publisher and First Published Date

    ## Recommendations
  `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.data.choices[0].message.content.trim();
    res.status(200).json({ summary: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
