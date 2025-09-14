// pages/index.jsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">School Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        <Link href="/addSchool">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">➕ Add School</h2>
            <p className="text-gray-500">Enter and save school details</p>
          </div>
        </Link>

        <Link href="/showSchools">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">🏫 View Schools</h2>
            <p className="text-gray-500">See all registered schools</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
