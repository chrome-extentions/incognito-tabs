// Save tabs
document.getElementById('saveTabs').addEventListener('click', () => {
  chrome.windows.getAll({ populate: true }, (windows) => {
    const incognitoTabs = [];

    windows.forEach(window => {
      if (window.incognito) {
        window.tabs.forEach(tab => {
          incognitoTabs.push(tab.url);
        });
      }
    });

    if (incognitoTabs.length > 0) {
      chrome.storage.local.set({ incognitoTabs }, () => {
        alert('Tabs saved successfully!');
        displayTabs();
      });
    } else {
      alert('No incognito tabs to save.');
    }
  });
});

// Restore tabs
document.getElementById('restoreTabs').addEventListener('click', () => {
  chrome.storage.local.get('incognitoTabs', (data) => {
    const urls = data.incognitoTabs || [];

    if (urls.length === 0) {
      alert('No tabs to restore.');
      return;
    }

    chrome.windows.getCurrent({ populate: true }, function (currentWindow) {
      if (chrome.runtime.lastError) {
      } else {
        if (currentWindow.incognito) {
          for (let i = 0; i < urls.length; i++) {
            chrome.tabs.create({ url: urls[i], windowId: currentWindow.id });
          }
        } else {
          alert('Open incognito window first.');
        }
      }
    });
  });
});

// Display saved tabs
function displayTabs() {
  chrome.storage.local.get('incognitoTabs', (data) => {
    const tabList = document.getElementById('tabList');
    const urls = data.incognitoTabs || [];
    tabList.innerHTML = '';
    urls.forEach(url => {
      const li = document.createElement('li');
      li.textContent = url;
      tabList.appendChild(li);
    });
  });
}
displayTabs();
