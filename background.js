// chrome.windows.onRemoved.addListener((windowId) => {
//   chrome.windows.getAll({ populate: true }, (windows) => {
//     const incognitoTabs = [];
//     windows.forEach(window => {
//       if (window.incognito) {
//         window.tabs.forEach(tab => {
//           incognitoTabs.push(tab.url);
//         });
//       }
//     });

//     chrome.storage.local.set({ incognitoTabs });
//   });
// });

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({ incognitoTabs: [] });
// });

// On installation or reload, reschedule the daily auto-save if enabled
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('autoSaveEnabled', (data) => {
    if (data.autoSaveEnabled) {
      scheduleDailyAutoSave();
    }
  });
});

// Listen for the alarm and perform auto-save
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyAutoSave') {
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
          console.log('✅ Incognito tabs auto-saved.');
        });
      }
    });
  }
});

// Utility: Schedule the daily auto-save alarm at 17:00
function scheduleDailyAutoSave() {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0); // Set to 17:00 today

  // If 17:00 already passed today, set for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delayInMinutes = (target - now) / 60000;

  chrome.alarms.create('dailyAutoSave', {
    delayInMinutes,
    periodInMinutes: 1440 // 24 hours
  });

  console.log('⏰ Daily auto-save alarm scheduled at 17:00');
}

