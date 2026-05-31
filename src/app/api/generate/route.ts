import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    return NextResponse.json({
      result: response.output_text,
    });
  }  catch (error: any) {
  console.error(error);

  return NextResponse.json(
    {
      error: error?.message || "Unknown error",
    },
    { status: 500 }
  );
}
}