"use client"

import React, { useState } from 'react';
import { generateToken } from '../utils/generateToken';
import axios from 'axios';

export default function SingleTokenGenerator() {
  const [generatedToken, setGeneratedToken] = useState('');
  const [isValid, setIsValid] = useState(null);
  const availableDigits = '24790'; // Replace with the user's choice of available digits
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);

  const handleGenerateToken = () => {
    if (!isTokenGenerated) {
      const token = generateToken(availableDigits);
      if (token) {
        const tokenString = token.toString(); // Ensure it's a string
        setGeneratedToken(tokenString);
        setIsTokenGenerated(true);
  
        // Make an HTTP POST request to the validator service
        axios
          .post('https://task-backend-i563.onrender.com/validate-token', { token: tokenString }) // Use 'token' property
          .then((response) => {
            const isValid = response.data.isValid;
            setIsValid(isValid);
          })
          .catch((error) => {
            console.error('Error validating token:', error);
          });
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center bg-slate-200 rounded-md p-8 mx-4">
      <h1 className="text-2xl font-semibold my-4">Single Token Generation</h1>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          isTokenGenerated ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleGenerateToken}
        disabled={isTokenGenerated}
      >
        Generate Token
      </button>
      {generatedToken && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">Generated Token:</p>
          <code className={`text-xl p-2 rounded-md ${isValid ? 'bg-green-100' : 'bg-red-100'}`}>
            {generatedToken}
          </code>
        </div>
      )}
    </div>
  );
}
