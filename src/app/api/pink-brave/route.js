import Jimp from "jimp";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Invalid file upload" }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let image = await Jimp.read(buffer);

    // Step 1: convert ke grayscale
    image.grayscale();

    // Step 2: map grayscale -> duotone (pink & green)
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const gray = this.bitmap.data[idx]; // R (grayscale value)
      const t = gray / 255; // normalize 0-1

      // blend green (#003300) to pink (#ff00aa)
      const r = (1 - t) * 0x00 + t * 0xff;
      const g = (1 - t) * 0x33 + t * 0x00;
      const b = (1 - t) * 0x00 + t * 0xaa;

      this.bitmap.data[idx + 0] = r; // R
      this.bitmap.data[idx + 1] = g; // G
      this.bitmap.data[idx + 2] = b; // B
    });

    const out = await image.getBufferAsync(Jimp.MIME_JPEG);
    return new Response(out, { headers: { "Content-Type": "image/jpeg" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
