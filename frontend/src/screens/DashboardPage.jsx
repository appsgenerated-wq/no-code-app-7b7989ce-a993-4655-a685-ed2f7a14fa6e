import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, gorillas, onLogout, onLoadGorillas, onCreateGorilla, onDeleteGorilla }) => {
  const [newGorilla, setNewGorilla] = useState({ name: '', species: 'Western Lowland', bio: '', birthDate: '' });

  useEffect(() => {
    onLoadGorillas();
  }, []);

  const handleCreateGorilla = (e) => {
    e.preventDefault();
    if (!newGorilla.name) {
        alert('Gorilla name is required.');
        return;
    }
    onCreateGorilla(newGorilla);
    setNewGorilla({ name: '', species: 'Western Lowland', bio: '', birthDate: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GorillaHub Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user.name} ({user.role})</p>
          </div>
          <div className="space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Gorilla Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Gorilla Profile</h2>
          <form onSubmit={handleCreateGorilla} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="e.g., Koko"
                    value={newGorilla.name}
                    onChange={(e) => setNewGorilla({...newGorilla, name: e.target.value})}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
                <select
                    id="species"
                    value={newGorilla.species}
                    onChange={(e) => setNewGorilla({...newGorilla, species: e.target.value})}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-green-500 focus:border-green-500"
                >
                    <option>Western Lowland</option>
                    <option>Cross River</option>
                    <option>Mountain</option>
                    <option>Eastern Lowland</option>
                </select>
            </div>
             <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
                <input
                    id="birthDate"
                    type="date"
                    value={newGorilla.birthDate}
                    onChange={(e) => setNewGorilla({...newGorilla, birthDate: e.target.value})}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biography</label>
                <textarea
                    id="bio"
                    placeholder="Enter a brief biography..."
                    value={newGorilla.bio}
                    onChange={(e) => setNewGorilla({...newGorilla, bio: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
            </div>
            <div className="md:col-span-2 text-right">
                <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors">
                    Add Gorilla
                </button>
            </div>
          </form>
        </div>

        {/* Gorillas List */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Gorilla Population</h2>
          {gorillas.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                <p>No gorillas have been cataloged yet. Add one using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gorillas.map(gorilla => (
                <div key={gorilla.id} className="bg-white rounded-lg shadow overflow-hidden group">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{gorilla.name}</h3>
                            <p className="text-sm text-green-700 font-medium">{gorilla.species}</p>
                        </div>
                        {user.id === gorilla.owner?.id && (
                           <button onClick={() => onDeleteGorilla(gorilla.id)} className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">DELETE</button>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{gorilla.bio || 'No biography available.'}</p>
                     <div className="text-xs text-gray-400 mt-4 border-t pt-2">
                        <p>Cataloged by: {gorilla.owner?.name || 'Unknown'}</p>
                        {gorilla.birthDate && <p>Born: {new Date(gorilla.birthDate).toLocaleDateString()}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
