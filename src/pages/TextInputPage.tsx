import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TextInputPage: React.FC = () => {
  const [text, setText] = useState('');
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (text.trim()) {
      setFlipped(true);
      setTimeout(() => {
        navigate('/summary', { state: { text } });
      }, 1000); // Kartın dönüş animasyonunun bitmesini bekle
    } else {
      alert('Lütfen bir metin girin!');
    }
  };

  return (
    <div className="card-container">
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Metni buraya girin..."
            rows={10}
            cols={50}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <br />
          <button onClick={handleSubmit}>Özetle</button>
        </div>
        <div className="card-back">
          <h2>Özetleme Sayfasına Yönlendiriliyorsunuz...</h2>
        </div>
      </div>
    </div>
  );
};

export default TextInputPage;
