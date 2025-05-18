// Sağ tık menüsü oluştur
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "summarizeText",
    title: "Seçili Metni Özetle",
    contexts: ["selection"]
  });
});

// Menü tıklamasını dinle
browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "summarizeText") {
    // Seçili metni Base64 ile encode et
    const selectedText = info.selectionText;
    const encodedText = btoa(unescape(encodeURIComponent(selectedText)));
    const summaraiUrl = `http://localhost:3000?t=${encodedText}&autoSummarize=true`;
    
    // Yeni sekmede aç
    browser.tabs.create({ url: summaraiUrl });
  }
}); 