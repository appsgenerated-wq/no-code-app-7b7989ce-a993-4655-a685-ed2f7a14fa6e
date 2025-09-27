import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import { testBackendConnection, createManifestWithLogging } from './services/apiService.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [gorillas, setGorillas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const manifest = createManifestWithLogging('7b7989ce-a993-4655-a685-ed2f7a14fa6e');

  useEffect(() => {
    // Check if a user is already logged in
    manifest.from('User').me()
      .then(userData => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch(() => setCurrentUser(null))
      .finally(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    // Enhanced backend connection test with detailed logging
    const testConnection = async () => {
      console.log('🚀 [APP] Starting enhanced backend connection test...');
      console.log('🔍 [APP] Backend URL:', 'https://no-code-app-7b7989ce-a993-4655-a685-ed2f7a14fa6e-generated-apps-234234-234.us-central1.run.app');
      console.log('🔍 [APP] App ID:', '7b7989ce-a993-4655-a685-ed2f7a14fa6e');

      setConnectionStatus('Testing connection...');

      const result = await testBackendConnection(3);
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
        setConnectionStatus('Connected');

        // Test Manifest SDK connection
        console.log('🔍 [APP] Testing Manifest SDK connection...');
        try {
          const manifest = createManifestWithLogging('7b7989ce-a993-4655-a685-ed2f7a14fa6e');
          console.log('✅ [APP] Manifest SDK initialized successfully');
        } catch (error) {
          console.error('❌ [APP] Manifest SDK initialization failed:', error);
          setConnectionStatus('SDK Error');
        }
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
        setConnectionStatus('Connection Failed');
      }
    };

    testConnection();
  }, []);;

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const userData = await manifest.from('User').me();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setGorillas([]);
  };

  const loadGorillas = async () => {
    try {
      const response = await manifest.from('Gorilla').find({ 
        include: ['owner'],
        sort: { createdAt: 'desc' }
      });
      setGorillas(response.data);
    } catch (error) {
      console.error('Failed to load gorillas:', error);
    }
  };

  const createGorilla = async (gorillaData) => {
    try {
      const newGorilla = await manifest.from('Gorilla').create(gorillaData);
      // Refetch gorillas to get the new one with owner data included
      loadGorillas();
    } catch (error) {
      console.error('Failed to create gorilla:', error);
      alert('Failed to create gorilla. Please check the form and try again.');
    }
  };

  const deleteGorilla = async (gorillaId) => {
    try {
      await manifest.from('Gorilla').delete(gorillaId);
      setGorillas(gorillas.filter(g => g.id !== gorillaId));
    } catch (error) {
      console.error('Failed to delete gorilla:', error);
      alert('You do not have permission to delete this gorilla.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Enhanced Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${backendConnected ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}</span>
          </div>
          <div className="text-xs opacity-75 mt-1">{connectionStatus}</div>
        </div>
      </div>
      
        <p className="text-lg text-gray-600">Loading GorillaHub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {currentUser ? (
        <DashboardPage
          user={currentUser}
          gorillas={gorillas}
          onLogout={handleLogout}
          onLoadGorillas={loadGorillas}
          onCreateGorilla={createGorilla}
          onDeleteGorilla={deleteGorilla}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
