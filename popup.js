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

// Handle checkbox toggle
const autoSaveToggle = document.getElementById('autoSaveToggle');
const autoSaveTime = document.getElementById('autoSaveTime');

// Load saved settings
chrome.storage.local.get(['autoSaveEnabled', 'autoSaveTime'], (data) => {
  autoSaveToggle.checked = data.autoSaveEnabled || false;
  autoSaveTime.value = data.autoSaveTime || '17:00';
});

// When user changes toggle
autoSaveToggle.addEventListener('change', () => {
  const enabled = autoSaveToggle.checked;
  const time = autoSaveTime.value;

  chrome.storage.local.set({
    autoSaveEnabled: enabled,
    autoSaveTime: time
  });

  if (enabled) {
    scheduleDailyAutoSave(time);
  } else {
    chrome.alarms.clear('dailyAutoSave');
  }
});

// When user changes time
autoSaveTime.addEventListener('change', () => {
  const enabled = autoSaveToggle.checked;
  const time = autoSaveTime.value;

  chrome.storage.local.set({ autoSaveTime: time });

  if (enabled) {
    scheduleDailyAutoSave(time);
  }
});

// Schedule alarm
function scheduleDailyAutoSave(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);

  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delayInMinutes = (target - now) / 60000;

  chrome.alarms.create('dailyAutoSave', {
    delayInMinutes,
    periodInMinutes: 1440
  });

  console.log(`⏰ Daily auto-save scheduled at ${timeStr}`);
}

displayTabs();
