function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    'inject-to-content': document.querySelector('#inject-to-content').checked
  });
}

function restoreOptions() {

  function setDefault(result) {
    document.querySelector('#inject-to-content').checked = result['inject-to-content'] || false;
  }

  function onError(error) {
    console.log('Error:' + error.message);
  }

  browser.storage
    .local
    .get('inject-to-content')
    .then(setDefault, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
