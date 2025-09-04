import { NextResponse } from "next/server";
import sharp from "sharp";

const shadow = { r: 12, g: 122, b: 75 };
const highlight = { r: 255, g: 79, b: 163 };

function lerp(a, b, t) {
  return a + t * (b - a);
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const gray = await sharp(buffer).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = gray;

  const out = Buffer.alloc(data.length * 3);
  for (let i = 0; i < data.length; i++) {
    const t = data[i] / 255;
    out[i * 3] = lerp(shadow.r, highlight.r, t);
    out[i * 3 + 1] = lerp(shadow.g, highlight.g, t);
    out[i * 3 + 2] = lerp(shadow.b, highlight.b, t);
  }

  const img = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 3 },
  }).jpeg().toBuffer();

  return new NextResponse(img, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
