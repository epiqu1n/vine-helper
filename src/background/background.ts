import { handleBgMessage, handleTabUpdate } from './controllers/bgEventControllers';
console.log('Running Vine Helper background script');

/// Tab event listeners
chrome.runtime.onMessage.addListener(handleBgMessage);
chrome.tabs.onUpdated.addListener(handleTabUpdate);