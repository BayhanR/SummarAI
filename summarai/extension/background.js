// Sağ tık menüsü oluştur
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeText",
    title: "Seçili Metni Özetle",
    contexts: ["selection"]
  });
});

// Menü tıklamasını dinle
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeText") {
    // Seçili metni Base64 ile encode et
    const selectedText = info.selectionText;
    const encodedText = btoa(unescape(encodeURIComponent(selectedText)));
    const summaraiUrl = `http://localhost:3000?t=${encodedText}`;
    
    // Yeni sekmede aç
    chrome.tabs.create({ url: summaraiUrl });
  }
}); 