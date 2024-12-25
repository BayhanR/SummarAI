import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../SummaryPage.css';
import axios from 'axios';

const API_URL = 'https://abcd.ngrok.io/summarize'; // <<<<Ngrok URLsi buraya

export const summarizeText = async (text) => {
    try {
        const response = await axios.post(API_URL, { text });
        return response.data.summary;
    } catch (error) {
        console.error('Error summarizing text:', error);
        return 'Error';
    }
};

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = location.state || { text: '' };

  const [inputText, setInputText] = useState(text);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      alert('Lütfen bir metin girin!');
      return;
    }

    setIsLoading(true);
    const result = await summarizeText(inputText);
    setSummary(result);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl '>SummarAI</h1>
      </div>
      <div className="translate-section">
        <textarea 
          className="input-text" 
          placeholder="Metni buraya giriniz ....." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <textarea 
          className="output-text" 
          placeholder="Özetiniz burada sizi bekleyecek" 
          value={summary}
          readOnly
        ></textarea>
      </div>
      <div className="controls">
        <button 
          type="button" 
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleSummarize}
          disabled={isLoading}
        >
          {isLoading ? 'Özetleniyor...' : 'Click to SummarAİ'}
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
