// pages/showSchools.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('/api/schools').then(res => setSchools(res.data.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Schools</h1>
        <Link href="/" className="text-blue-500 hover:underline">🏠 Home</Link>
      </header>

      {schools.length === 0 ? (
        <p className="text-center text-gray-500">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img src={school.image} alt={school.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{school.name}</h3>
                <p className="text-gray-600">{school.address}</p>
                <p className="text-sm text-gray-500">{school.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
