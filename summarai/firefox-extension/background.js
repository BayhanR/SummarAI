// Eklenti yüklendiğinde
browser.runtime.onInstalled.addListener(() => {
    console.log('SummarAI eklentisi yüklendi');
});

// Sağ tık menüsü oluştur
browser.contextMenus.create({
    id: "summarize-text",
    title: "Metni SummarAI ile özetle",
    contexts: ["selection"]
});

// Sağ tık menüsüne tıklandığında
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "summarize-text") {
        browser.tabs.sendMessage(tab.id, {
            action: "summarize",
            text: info.selectionText
        });
    }
}); 