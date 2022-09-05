import { BgMessageHandler, TabUpdatedHandler } from '../../types/Handlers';

/// Handlers

/** onMessage: Listen for messages intended for the background script */
export const handleBgMessage: BgMessageHandler = ({ type, payload }, sender, sendResponse) => {
  // console.log('Background received a message:', { type, payload });

  // Must use "Go to Implementations" to link to message controller method definitions
  // Always send a response using `.then()` after each controller is complete! async-await can't be used here :(
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

  // noop
};


/// Auxiliary methods
