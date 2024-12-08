import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TextInputPage from './pages/TextInputPage';
import SummaryPage from './pages/SummaryPage';
import CardPage from './pages/CardPage';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<TextInputPage />} />
        <Route path="/summary" element={<SummaryPage />} /> */}
        <Route path="/" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
