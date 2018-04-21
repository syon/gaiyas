'use strict';

var gaiyas = document.createElement('div');
gaiyas.id = 'chrome-extension-gaiyas';
gaiyas.className = 'closed preparing';
document.body.appendChild(gaiyas);

// background script -> content script(here) -> webpage
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('gaiyas::request', request);
  return new Promise(function(resolve, reject) {
    // timeout
    var timeoutId;
    // webpage -> content script(here) -> background script
    var onMessage = function(event) {
      // console.log('message', event);
      // We only accept messages from ourselves
      if (event.source !== window) {
        return;
      }
      if (event.data.type === 'gaiyas::webpage-to-contentscript') {
        window.removeEventListener('message', onMessage);
        clearTimeout(timeoutId);
        var url = event.data.url;
        resolve({
          url: url
        });
      }
    };
    if (request.type === 'gaiyas::popup-to-contentscript') {
      timeoutId = setTimeout(function() {
        window.removeEventListener('message', onMessage);
        return reject(new Error('gaiyas::gaiyas::contentscript-to-webpage is timeout'));
      }, 100);
      window.addEventListener('message', onMessage);
      // console.log('gaiyas::contentscript-to-webpage');
      window.postMessage({
        type: 'gaiyas::contentscript-to-webpage'
      }, '*');
      // webpage can return any url
      /** example
       window.addEventListener("message", function(event) {
        if(event.data.type === "gaiyas::contentscript-to-webpage"){
          window.postMessage({
            type: "gaiyas::webpage-to-contentscript",
            url: "https://jser.info"
          }, "*");
        }
      });
     */
    }
  });
});
