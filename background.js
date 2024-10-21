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
