import { Category } from '../types/Items';
import MessageTypes, { MessageResponses } from '../types/MessageTypes';
import { RuntimeMessage } from '../types/Runtime';
import { sendTabMessage } from './modules/messenger';
console.log('Running Vine Helper background script');

const categories: { [cat: string]: Category } = {};

/// Globals
let activeTabId: number;
// chrome.tabs.query({ active: true }).then((tab) => activeTabId = tab[0].id as number);

/// Tab event listeners
/** onMessage: Listen for messages from popup or content script */
chrome.runtime.onMessage.addListener((message: RuntimeMessage, sender, sendResponse) => {
  console.log('Background received a message:', message);

  switch (message.type) {
    case 'RECEIVE_ITEMS':
      // TODO: Determine which items are new and display them
      // TODO: Update item cache for category
      break;
    default:
      console.error(`Unknown message type: ${message.type}`);
      break;
  }
});

/** onUpdated: Get all items for the current category and display any new ones */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tabInfo) => {
  const { status } = changeInfo;
  if (!tabInfo.url?.match(/amazon\.com\/vine\/vine-items/i) || status !== 'complete') return;

  // Get URL params for category
  const { queue, pn, cn } = Object.fromEntries((new URL(tabInfo.url)).searchParams);
  const category = `?queue=${queue}&pn=${pn || ''}&cn=${cn || ''}`;
  
  // Request items for category from contents
  console.debug('tabId:', tabId);
  await timeout(2500); // DEBUG
  sendTabMessage(tabId, 'GET_ITEMS_BY_ID', {
    url: `${category}`
  }, (response) => {
    // TODO: Determine which items are new and display them
    // TODO: Update item cache for category

    // TODO: Response keeps coming back undefined?
    console.debug('response:', response);
  });

  console.debug('category:', category);
});

/// Aux functions

function timeout(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(undefined), ms);
  });
}