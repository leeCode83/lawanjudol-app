async function updateBlockingRules() {
    try {
        const response = await fetch("http://localhost:3000/report/blocked");
        const data = await response.json();

        // Format ulang data supaya sesuai aturan Chrome
        const rules = data.map((url, index) => ({
            id: index + 100,
            priority: 1,
            action: { 
                type: "redirect",
                redirect: {
                    url: chrome.runtime.getURL("block.html")
                } 
            },
            condition: {
                urlFilter: `*://*${url}/*`,
                resourceTypes: [
                    "main_frame",
                    "sub_frame",
                    "script",
                    "xmlhttprequest",
                    "image",
                    "media"
                ]
            }
        }));

        // Hapus aturan lama dan tambahkan aturan baru
        chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
            const existingRuleIds = existingRules.map(rule => rule.id);
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: existingRuleIds,
                addRules: rules
            });
        });

        console.log("Daftar blokir diperbarui!");

    } catch (error) {
        console.error("Gagal memperbarui daftar blokir", error);
    }
}

// Menjalankan updateBlockingRules saat extension diinstall atau startup Chrome
chrome.runtime.onInstalled.addListener(updateBlockingRules);
chrome.runtime.onStartup.addListener(updateBlockingRules);

// Menggunakan Alarm API untuk update setiap 1 menit
chrome.alarms.create("updateRules", {
    periodInMinutes: 1
});

// Event listener untuk alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateRules") {
        console.log("Alarm triggered: Memeriksa update rules...");
        updateBlockingRules();
    }
});
