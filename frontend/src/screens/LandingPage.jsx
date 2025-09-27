import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-green-900 text-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to GorillaHub
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-200">
              The premier platform for researchers to catalog and share data about gorilla populations worldwide. Track individuals, log observations, and contribute to conservation efforts.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => onLogin('researcher@example.com', 'password')}
                className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
              >
                Try Researcher Demo
              </button>
              <a
                href={`${config.BACKEND_URL}/admin`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 text-green-100 hover:text-white"
              >
                Admin Panel <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
