import { NextResponse } from "next/server";
import OpenAI from "openai";
export const maxDuration = 59;
export const dynamic = "force-dynamic";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { image } = await req.json();

    // Usuń prefiks "data:image/jpeg;base64," jeśli istnieje
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, "");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail, focusing on elements that would be relevant for creating a Fortnite-style version of it.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const imageDescription = response.choices[0].message.content;
    console.log(imageDescription);
    // Generuj prompt dla obrazu w stylu Fortnite
    const fortnitePrompt = `Create a Fortnite-style version of this image: ${imageDescription}. Use vibrant colors, cartoonish graphics, and exaggerated features typical of Fortnite's art style.`;

    // Generuj nowy obraz
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: fortnitePrompt,
      n: 1,
      size: "1024x1024",
    });

    const fortniteImage = imageResponse.data[0].url;

    return NextResponse.json({ fortniteImage });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
