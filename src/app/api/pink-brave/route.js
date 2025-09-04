import Jimp from "jimp";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Invalid file upload" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let image = await Jimp.read(buffer);

    image.grayscale();

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const gray = this.bitmap.data[idx]; 
      const t = gray / 255; 

      const green = { r: 0, g: 120, b: 60 };
      const softPink = { r: 255, g: 120, b: 180 };

      const r = (1 - t) * green.r + t * softPink.r;
      const g = (1 - t) * green.g + t * softPink.g;
      const b = (1 - t) * green.b + t * softPink.b;

      this.bitmap.data[idx + 0] = r;
      this.bitmap.data[idx + 1] = g;
      this.bitmap.data[idx + 2] = b; 
    });

    const out = await image.getBufferAsync(Jimp.MIME_JPEG);
    return new Response(out, { headers: { "Content-Type": "image/jpeg" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
