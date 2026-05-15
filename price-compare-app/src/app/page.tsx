'use client';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{store: string, price: string, logo: string}[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setLoading(true);

    // SIMULATING AN API CALL: We tell the code to wait 1.5 seconds 
    // to mimic the time it takes to contact Amazon and Flipkart.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here is our simulated data coming back from the "servers"
    setResults([
      { store: 'Amazon', price: '₹72,999', logo: '🛒' },
      { store: 'Flipkart', price: '₹71,499', logo: '🛍️' },
      { store: 'Croma', price: '₹73,500', logo: '🏬' }
    ]);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Find the Best Price
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Compare instantly across Amazon, Flipkart, and more.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g., iPhone 15 256GB..."
            className="flex-1 px-5 py-4 rounded-xl border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Compare'}
          </button>
        </form>
      </div>

      {/* RESULTS DISPLAY SECTION */}
      {results && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 px-2">Results for "{searchQuery}"</h2>
          
          {results.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex justify-between items-center hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.logo}</span>
                <span className="text-xl font-medium text-gray-800">{item.store}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-green-600">{item.price}</span>
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}