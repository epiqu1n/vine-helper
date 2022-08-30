import MessageTypes, { MessageResponses } from '../../types/MessageTypes';

export function sendTabMessage<MT extends keyof MessageTypes>(
  tabId: number,
  type: MT,
  payload: MessageTypes[MT],
  onResponse?: (response: MessageResponses[MT]) => void
) {
  chrome.tabs.sendMessage(tabId, { type, payload }, onResponse);
}

export function sendBgMessage<MT extends keyof MessageTypes>(
  type: MT,
  payload: MessageTypes[MT],
  onResponse?: (response: MessageResponses[MT]) => void
) {
  chrome.runtime.sendMessage({ type, payload }, onResponse as Exclude<typeof onResponse, undefined>);
}