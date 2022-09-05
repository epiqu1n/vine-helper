import { ContentMessageHandler } from '../../types/Handlers';

/** onMessage: Listen for messages intended for the content script */
export const handleContentMessage: ContentMessageHandler = ({ type, payload }, sender, sendResponse) => {
  // console.log('Content script received a message:', { type, payload });

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