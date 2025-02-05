document.addEventListener('DOMContentLoaded', () => {
    const timeSpentElement = document.getElementById('time-spent');
    const blockedSitesList = document.getElementById('blocked-sites-list');
    const siteInput = document.getElementById('site-input');
    const blockSiteBtn = document.getElementById('block-site-btn');
  
    // Load data from Chrome storage
    chrome.storage.local.get(['timeSpent', 'blockedSites'], (data) => {
      // Update time spent
      if (data.timeSpent) {
        timeSpentElement.textContent = data.timeSpent;
      }
  
      // Update blocked sites list
      if (data.blockedSites && data.blockedSites.length > 0) {
        blockedSitesList.innerHTML = data.blockedSites
          .map((site) => `<li>${site}</li>`)
          .join('');
      }
    });
  
    // Add a new blocked site
    blockSiteBtn.addEventListener('click', () => {
      const site = siteInput.value.trim();
      if (site) {
        chrome.storage.local.get(['blockedSites'], (data) => {
          const blockedSites = data.blockedSites || [];
          blockedSites.push(site);
  
          // Save updated blocked sites to storage
          chrome.storage.local.set({ blockedSites }, () => {
            // Update the UI
            blockedSitesList.innerHTML += `<li>${site}</li>`;
            siteInput.value = ''; // Clear the input field
          });
        });
      }
    });
  });