import React, { useState } from 'react';
import '../CardPage.css'; 

const CardPage: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [copiedText, setCopiedText] = useState(''); 

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleCopy = () => {

    setCopiedText('Lorem ipsum dolor sit amet, consectetur adipiscing elit...');
  };

  const handlePaste = () => {
    setInputValue(copiedText);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="container">
      <div id="card" className={flipped ? 'BTback' : ''}>
        <figure className="front">
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Metin girin..."
          />
          <div className="absolute right-2.5 top-2.5 h-10 w-10 h-10 w-10
 flex items-center justify-center rounded-full bg-gray-600 text-white font-bold cursor-pointer"onClick={handleFlip}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>
</div>
          
          <button id='pasteButton' class=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handlePaste}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>
</button>
        </figure>

        <figure className="back">
          <div className="absolute right-2.5 top-2.5 h-10 w-10 h-10 w-10
 flex items-center justify-center rounded-full bg-gray-600 text-white font-bold cursor-pointer"onClick={handleFlip}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
</svg>
</div>
          <figcaption  className='.content-center'>
            <div  className='.content-center'>
              Özet kısmı buraya gelecek
            </div>
            <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleCopy}>Kopyala</button> 
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default CardPage;
