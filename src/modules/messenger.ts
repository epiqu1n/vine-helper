import { ContentMessageData, ContentMessageType } from '../types/Messages';

/** Sends a message to a specific tab */
export function sendTabMessage<MT extends ContentMessageType>(
  tabId: number,
  type: MT,
  payload: ContentMessageData[MT]['payload']
) {
  return new Promise<ContentMessageData[MT]['response']>((resolve) => {
    chrome.tabs.sendMessage(tabId, { type, payload }, (response: ContentMessageData[MT]['response']) => {
      resolve(response);
    });
  });
}

/** Sends a message to the background script */
export function sendBgMessage<MT extends ContentMessageType>(
  type: MT,
  payload: ContentMessageData[MT]['payload']
) {
  return new Promise<ContentMessageData[MT]['response']>((resolve) => {
    chrome.runtime.sendMessage({ type, payload }, (response: ContentMessageData[MT]['response']) => {
      resolve(response);
    });
  });
}