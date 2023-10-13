"use client";

import React, { useState, useEffect } from "react";
import { generateToken } from "../utils/generateToken";
import axios from "axios";

export default function InfiniteTokenGenerator() {
  const [generatedToken, setGeneratedToken] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [validTokens, setValidTokens] = useState<string[]>([]);
  const availableDigits = "24790"; // Replace with the user's choice of available digits
  let tokenInterval: NodeJS.Timeout;

  useEffect(() => {
    if (isGenerating) {
      tokenInterval = setInterval(() => {
        const token = generateToken(availableDigits);
        const tokenString = token.toString(); // Ensure it's a string
        setGeneratedToken(token);
        setTotalTokens((prevTotalTokens) => prevTotalTokens + 1);

        // Make an HTTP POST request to the validator service
        axios
          .post("http://localhost:5000/validate-token", { token: tokenString })
          .then((response) => {
            const isValid = response.data.isValid;
            setIsValid(isValid);
            if (isValid) {
              setValidTokens((prevValidTokens) => [...prevValidTokens, token]);
            }
          })
          .catch((error) => {
            console.error("Error validating token:", error);
          });
      }, 1000); // Adjust the interval as needed
    } else {
      clearInterval(tokenInterval);
    }
    return () => clearInterval(tokenInterval);
  }, [isGenerating, availableDigits]);

  const toggleGeneration = () => {
    setIsGenerating((prevIsGenerating) => !prevIsGenerating);
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 rounded-md mx-4 p-8">
      <h1 className="text-2xl font-semibold mb-4">Infinite Token Generation</h1>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={toggleGeneration}
      >
        {isGenerating ? "Stop" : "Start"} Generating Tokens
      </button>
      <div className="mt-4">
        <p className="text-lg font-semibold">Statistics:</p>
        <p>Total Tokens Generated: {totalTokens}</p>
        <p>Valid Tokens Count: {validTokens.length}</p>
      </div>
      {generatedToken && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-4">Generated Token:</p>
          <code
            className={`text-xl p-2 rounded-md ${
              isValid ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {generatedToken}
          </code>
          {isValid !== null && (
            <p className={isValid ? "text-green-500 mt-4" : "text-red-500 mt-4"}>
              {isValid ? "Valid Token" : "Invalid Token"}
            </p>
          )}
          {validTokens.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Valid Tokens:</p>
          <ul>
            {validTokens.map((token, index) => (
              <li key={index}>{token}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
        
      )}
      
    </div>
  );
}
