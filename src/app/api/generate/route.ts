import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 🧠 1. Generate description (text)
    const textRes = await openai.responses.create({
      model: "gpt-5",
      input: `Describe this fashion design in detail:\n${prompt}`,
    });

    const text = textRes.output_text;

    // 🎨 2. Generate image
    const imgRes = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });
     
    if (!imgRes.data || imgRes.data.length === 0) {
    throw new Error("No image generated");
    }

    const image = imgRes.data[0].url;

    return NextResponse.json({
      result: {
        text,
        image,
      },
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message || "Generation failed" },
      { status: 500 }
    );
  }
}