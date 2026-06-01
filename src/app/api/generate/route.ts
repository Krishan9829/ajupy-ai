import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const USE_DEMO = true; // 🔥 toggle this ON/OFF

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const finalStyle = style || "luxury bridal";

    // 🎯 Unified Prompt Builder
    const enhancedPrompt = `
You are a world-class Indian textile fashion designer AI.

Design Type: Saree Concept
Style: ${finalStyle}
User Input: ${prompt}

Include:
- fabric details
- embroidery style
- color palette
- border design
- pallu design
- blouse suggestion
`;

    // ==============================
    // 🧪 DEMO MODE (NO API COST)
    // ==============================
    if (USE_DEMO) {
      return NextResponse.json({
        success: true,
        mode: "demo",
        result: {
          text: `
✨ Saree Design (Demo Mode)

Fabric: ${prompt}
Style: ${finalStyle}

• Premium silk base fabric
• Handcrafted zari embroidery
• Royal Mughal inspired border
• Soft pastel luxury palette
• Heavy bridal pallu design
• Matching designer blouse
          `,
          image: "",
          meta: {
            prompt,
            style: finalStyle,
          },
        },
      });
    }

    // ==============================
    // 🧠 REAL AI MODE
    // ==============================
    let text = "";
    let image = "";

    try {
      const textRes = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: enhancedPrompt,
      });

      text = textRes.output_text || "";
    } catch (err) {
      console.log("Text error:", err);
      text = "AI description temporarily unavailable";
    }

    try {
      const imagePrompt = `
Ultra realistic Indian saree design,
${prompt}, ${finalStyle},
luxury fashion photography, embroidery details,
studio lighting, 4k textile render
`;

      const imgRes = await openai.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        size: "1024x1024",
      });

      image = imgRes.data?.[0]?.url || "";
    } catch (err) {
      console.log("Image error:", err);
      image = "";
    }

    return NextResponse.json({
      success: true,
      mode: "live",
      result: {
        text,
        image,
        meta: {
          prompt,
          style: finalStyle,
        },
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Generation failed",
      },
      { status: 500 }
    );
  }
}