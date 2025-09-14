// pages/addSchool.jsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const [msg, setMsg] = useState('');

  async function onSubmit(data) {
    try {
      setMsg('');
      if (!data.imageFile?.length) {
        setMsg('Please choose an image');
        return;
      }

      setUploading(true);

      // Upload to Cloudinary
      const file = data.imageFile[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);

      const imageUrl = uploadRes.data.secure_url;

      await axios.post('/api/schools', {
        ...data,
        contact: data.contact || '',
        image: imageUrl,
      });

      setMsg("✅ School added successfully!");
      reset();
      setPreview('');
    } catch (error) {
      console.error(error);
      setMsg("❌ Failed to add school");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add School</h1>
        <Link href="/" className="text-blue-500 hover:underline">🏠 Home</Link>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto w-full space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name*</label>
          <input {...register('name', { required: "Name required" })} className="border p-2 w-full rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Address*</label>
          <textarea {...register('address', { required: "Address required" })} className="border p-2 w-full rounded-lg" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">City*</label>
            <input {...register('city', { required: "City required" })} className="border p-2 w-full rounded-lg" />
          </div>
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input {...register('state')} className="border p-2 w-full rounded-lg" />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input {...register('contact')} className="border p-2 w-full rounded-lg" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email*</label>
          <input {...register('email_id', { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="border p-2 w-full rounded-lg" />
          {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">School Image*</label>
          <input type="file" accept="image/*" {...register('imageFile', { required: true })} onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
          {preview && <img src={preview} className="mt-2 max-h-40 object-cover rounded-lg" />}
        </div>

        <button type="submit" disabled={uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
          {uploading ? "Uploading..." : "Add School"}
        </button>

        {msg && <p className="text-center font-semibold">{msg}</p>}
      </form>
    </div>
  );
}
