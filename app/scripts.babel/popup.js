'use strict';
window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // console.log('send: gaiyas::popup-to-contentscript');
    // show default url if reach time limit
    const timeId = setTimeout(() => {
      // show default url
      // ?chrome-extension-gaiyas=<url>
      window.postMessage({
        type: 'gaiyas::fetch',
      }, '*');
    }, 100);
    browser.tabs.sendMessage(
      tabs[0].id,
      { type: 'gaiyas::popup-to-contentscript' }
    ).then((response) => {
      const url = response.url;
      // console.log('popup receive', url);
      clearTimeout(timeId);
      // show any url
      // to popup.html
      window.postMessage({
        type: 'gaiyas::fetch',
        url: url
      }, '*');
    }).catch(error => {
      // nope
    })
  });
});

