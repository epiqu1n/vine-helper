import { handleRuntimeMessage } from './controllers/contentEventController';

console.info('Running Vine Helper content script');

/// Tab event listeners
chrome.runtime.onMessage.addListener(handleRuntimeMessage);