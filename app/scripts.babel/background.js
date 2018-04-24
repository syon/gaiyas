'use strict';
const countMap = new Map();
// Expired Cache
// https://github.com/hatena/hatena-bookmark-googlechrome-extension/blob/f41fce6802b69114fd45ac7d6efd5e1e5f4af82e/src/main/lib/04-HTTPCache.js#L82
const cacheTTI = 60 * 15;
const fetchHatebuCount = (url) => {
  if (countMap.has(url)) {
    const cache = countMap.get(url);
    const isExpired = (Date.now() - cache.timeStamp) >= (cacheTTI * 1000);
    if (!isExpired) {
      return Promise.resolve(cache);
    }
  }
  return fetch(`http://api.b.st-hatena.com/entry.counts?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(json => json[url])
    .then(count => {
      if (typeof count === 'number') {
        const timeStamp = Date.now();
        const cacheData = {
          timeStamp,
          count
        };
        countMap.set(url, cacheData);
        return cacheData;
      }
      return Promise.reject(new Error('Not found count: ' + url));
    });
};
const updateHatebuButton = (tabId, url) => {
  chrome.browserAction.setPopup({
    tabId: tabId,
    popup: 'popup.html?chrome-extension-gaiyas=' + url
  });
  fetchHatebuCount(url).then(data => {
    // set timeStamp for prune cache popup.html
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popup.html?chrome-extension-gaiyas=' + url + "&timeStamp=" + data.timeStamp
    });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'rgba(37, 37, 38, 0.9)' });
    chrome.browserAction.setBadgeText({ text: String(data.count) });
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
