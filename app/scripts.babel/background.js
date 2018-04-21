'use strict';
const countMap = new Map();
const fetchHatebuCount = (url) => {
  if (countMap.has(url)) {
    return Promise.resolve(countMap.get(url));
  }
  return fetch(`http://api.b.st-hatena.com/entry.counts?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(json => json[url])
    .then(count => {
      if (typeof count === 'number') {
        countMap.set(url, count);
        return count;
      }
      return Promise.reject(new Error('Not found count: ' + url));
    });
};
const updateHatebuButton = (tabId, url) => {
  chrome.browserAction.setPopup({
    tabId: tabId,
    popup: 'popup.html?chrome-extension-gaiyas=' + url
  });
  fetchHatebuCount(url).then(count => {
    chrome.browserAction.setBadgeBackgroundColor({ color: '#8FCE53' });
    chrome.browserAction.setBadgeText({ text: String(count) });
  }).catch(error => {
    chrome.browserAction.setBadgeText({ text: null });
  });
};
const openHatebu = (url) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    const activeTabInfo = tabs[0];
    updateHatebuButton(activeTabInfo.id, url || activeTabInfo.url);
    if (chrome.browserAction.openPopup) {
      chrome.browserAction.openPopup();
    }
  });
};
chrome.tabs.onCreated.addListener(function(tab) {
  updateHatebuButton(tab.id, tab.url);
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    updateHatebuButton(activeInfo.tabId, tab.url);
  });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateHatebuButton(tab.id, tab.url);
});

// receive message from other extension
// TODO: browserAction.openPopup may only be called from a user input handler
// chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
//   // console.log("gaiyas::onMessageExternal", message)
//   const url = message.url;
//   if (!url) {
//     return sendResponse(false);
//   }
//   openHatebu(url);
// });
