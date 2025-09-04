"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/pink-brave", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload gagal!");
      setLoading(false);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setResult(url);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-pink-100 to-white">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-2 text-pink-700 drop-shadow">
        🎨 Pink Brave Filter
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Unggah fotomu dan ubah menjadi karya dengan nuansa <b>Pink Brave</b> —
        kombinasi warna pink & hijau yang melambangkan keberanian, ekspresi, dan semangat.
      </p>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-6 flex flex-col gap-4 items-center bg-white shadow-lg rounded-xl p-6 border border-pink-200"
      >
        <input
          type="file"
          accept="image/*"
          className="block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-pink-100 file:text-pink-700
                     hover:file:bg-pink-200"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
            setResult(null);
          }}
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Apply Filter"}
        </button>
      </form>

      {/* Image Preview */}
      <div className="flex flex-wrap gap-8 justify-center">
        {preview && (
          <div className="text-center">
            <p className="font-semibold mb-2">Original</p>
            <img src={preview} alt="preview" className="w-64 rounded-xl shadow-md" />
          </div>
        )}
        {result && (
          <div className="text-center">
            <p className="font-semibold mb-2">Pink Brave</p>
            <img src={result} alt="result" className="w-64 rounded-xl shadow-md border border-pink-200" />
            <a
              href={result}
              download="pink-brave.jpg"
              className="inline-block mt-3 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              Download
            </a>
          </div>
        )}
      </div>

      {/* Why Brave Pink */}
      <section className="mt-12 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-pink-700 mb-3">Kenapa Brave Pink?</h2>
        <p className="text-gray-700 leading-relaxed">
          <b>Pink Brave</b> adalah simbol keberanian dalam mengekspresikan diri.  
          Warna <span className="text-pink-600 font-medium">pink</span> melambangkan kasih sayang dan kreativitas,  
          sedangkan <span className="text-green-700 font-medium">hijau</span> mewakili keseimbangan dan keteguhan hati.  
          Dengan menggabungkan keduanya, tercipta nuansa unik yang menginspirasi untuk tetap berani menjadi diri sendiri.
        </p>
        <p>- by Trinotorianto</p>
      </section>
    </main>
  );
}
