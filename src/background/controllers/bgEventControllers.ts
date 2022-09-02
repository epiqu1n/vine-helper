import { sendTabMessage } from '../../modules/messenger';
import { BgMessageHandler, TabUpdatedHandler } from '../../types/Handlers';
import { ContentMessageType as CMT } from '../../types/Messages';
import BGMC from './bgMessageController';

/// Handlers

/** onMessage: Listen for messages intended for the background script */
export const handleBgMessage: BgMessageHandler = ({ type, payload }, sender, sendResponse) => {
  // console.log('Background received a message:', { type, payload });

  // Must use "Go to Implementations" to link to message controller method definitions
  // Use `return true` instead of `break` if it is necessary to send an asynchronous response
  // Always send a response after each controller is complete! async-await can't be used here :(
  switch (type) {
    default:
      // Send an empty response so that sender Promise can resolve
      const errMsg = `Unknown message type: ${type}`;
      console.error(errMsg);
      sendResponse(undefined);
      return;
  }

  // Allows sending an asynchronous response
  return true;
};

/** onUpdated: Get all items for the current category and display any new ones */
export const handleTabUpdate: TabUpdatedHandler = (tabId, changeInfo, tab) => {
  const { status } = changeInfo;
  if (!tab.url?.match(/amazon\.com\/vine\/vine-items/i) || status !== 'complete') return;

  requestUpdateNewItems(tab).catch((err) => console.error(err));
};


/// Auxiliary methods
/** Makes a request to the content script to display new items for the current category on the page */
async function requestUpdateNewItems(tabInfo: chrome.tabs.Tab) {
  if (!tabInfo.url || !tabInfo.id) throw new Error('Missing tab information');

  const category = getCurrentCategory(tabInfo.url);
  await sendTabMessage(tabInfo.id, CMT.UPDATE_NEW_ITEMS, { url: category });
}

/** Gets the current category on the page */
function getCurrentCategory(url: string) {
  const { queue, pn, cn } = Object.fromEntries((new URL(url)).searchParams);
  const category = `?queue=${queue}&pn=${pn || ''}&cn=${cn || ''}`;
  return category;
}