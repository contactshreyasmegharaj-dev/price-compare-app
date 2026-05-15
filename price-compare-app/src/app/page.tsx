'use client';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);

    const apiKey = "6e4b4401ecfe93031ddd58c370f4f82ad87f63b1";

    try {
      const response = await fetch('https://google.serper.dev/shopping', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: searchQuery, gl: "in" }), // "gl: in" tells it to look in India
      });

      const data = await response.json();
      // We take the first 5 shopping results from the real Google data
      setResults(data.shopping?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong with the engine!");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-10 text-black">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-blue-100">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Live Price Finder
        </h1>
        <p className="text-center text-gray-500 mb-8 font-medium">Fetching real-time data from across the web.</p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search any product..."
            className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none text-lg transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {results && (
        <div className="w-full max-w-2xl flex flex-col gap-4 pb-20">
          {results.length > 0 ? results.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-md border border-gray-50 flex flex-col sm:flex-row items-center gap-6">
              <img 
  src={item.thumbnail} 
  alt={item.title} 
  className="w-24 h-24 object-contain rounded-lg" 
  referrerPolicy="no-referrer" 
/>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg line-clamp-2">{item.title}</h3>
                <p className="text-blue-600 font-semibold">{item.source}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className="text-2xl font-black text-green-600">{item.price}</span>
                <a href={item.link} target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">
                  View Deal
                </a>
              </div>
            </div>
          )) : <p className="text-center text-gray-500 italic">No real-time results found. Try a different product!</p>}
        </div>
      )}
    </main>
  );
}