// This script has access to the DOM

import { RuntimeMessage } from '../types/Runtime';
console.log('Running Vine Helper content script');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message: RuntimeMessage, sender, sendResponse) => {
  console.log('Content script received a message:', message);

  switch (message.type) {
    default:
      console.error(`Unknown message type: ${message.type}`);
      break;
  }
});
