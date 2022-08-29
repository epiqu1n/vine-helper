import { RuntimeMessage } from '../types/Runtime';

// This script does not communicate with the DOM
console.log('Running background script (see chrome extensions page)');



/// Globals
let activeTabId: number;
chrome.tabs.query({ active: true }).then((tab) => activeTabId = tab[0].id);

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((message: RuntimeMessage, sender, sendResponse) => {
  console.log('Background received a message:', message);

  switch (message.type) {
    default:
      console.error(`Unknown message type: ${message.type}`);
      break;
  }
});

/// Tab event listeners
// On change tabs: Set active tab id to current tab id
chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
});