import Jimp from "jimp";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) return new Response("No file uploaded", { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const image = await Jimp.read(buffer);

  // filter pink-brave (saturasi + tint)
  image.color([
    { apply: "saturate", params: [50] },
    { apply: "mix", params: ["#ff69b4", 50] } // tint pink
  ]);

  const out = await image.getBufferAsync(Jimp.MIME_JPEG);

  return new Response(out, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
