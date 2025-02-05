let timeSpent = 0;
let blockedSites = [];

// Load blocked sites from storage
chrome.storage.local.get(['blockedSites'], (data) => {
  blockedSites = data.blockedSites || [];
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    const hostname = url.hostname;

    // Check if the site is blocked
    if (blockedSites.includes(hostname)) {
      chrome.tabs.update(tabId, { url: 'blocked.html' });
    }
  }
});

// Track time spent on active tabs
setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && !blockedSites.includes(new URL(tabs[0].url).hostname)) {
      timeSpent += 1;
      chrome.storage.local.set({ timeSpent });
    }
  });
}, 1000);