// Şimdilik boş bırakıyoruz, ileride gerekirse güncelleyeceğiz
console.log('SummarAI Firefox extension loaded');

// Seçili metni yakalama ve işleme
let selectedText = '';

// Metin seçildiğinde
document.addEventListener('mouseup', function() {
    selectedText = window.getSelection().toString().trim();
    
    if (selectedText) {
        // Mevcut özetleme butonunu kaldır
        removeExistingButton();
        
        // Yeni özetleme butonu oluştur
        createSummaryButton();
    }
});

// Özetleme butonu oluşturma
function createSummaryButton() {
    const button = document.createElement('div');
    button.id = 'summarai-button';
    button.innerHTML = '📝 Özetle';
    button.style.cssText = `
        position: fixed;
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;

    // Butonun konumunu ayarla
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    button.style.left = `${rect.left + window.scrollX}px`;
    button.style.top = `${rect.bottom + window.scrollY + 10}px`;

    button.addEventListener('click', handleSummaryClick);
    document.body.appendChild(button);
}

// Mevcut özetleme butonunu kaldırma
function removeExistingButton() {
    const existingButton = document.getElementById('summarai-button');
    if (existingButton) {
        existingButton.remove();
    }
}

// Özetleme butonuna tıklandığında
async function handleSummaryClick() {
    try {
        // API'ye istek gönder
        const response = await fetch('https://summarai.com/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: selectedText })
        });

        const data = await response.json();
        
        // Özeti göster
        showSummary(data.summary);
    } catch (error) {
        console.error('Özetleme hatası:', error);
        alert('Özetleme sırasında bir hata oluştu.');
    }
}

// Özeti gösterme
function showSummary(summary) {
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'summarai-summary';
    summaryDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        max-width: 80%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    summaryDiv.innerHTML = `
        <h3 style="margin-top: 0;">Özet</h3>
        <p>${summary}</p>
        <button onclick="this.parentElement.remove()" style="
            padding: 8px 16px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Kapat</button>
    `;

    document.body.appendChild(summaryDiv);
}

// Sayfa yüklendiğinde mevcut butonları temizle
document.addEventListener('DOMContentLoaded', removeExistingButton); 