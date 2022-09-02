import { BgMessage, ContentMessage } from './Messages';

export interface TabUpdatedHandler {
  (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ): void;
}

export interface ContentMessageHandler {
  (
    message: ContentMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ): void
}

export interface BgMessageHandler {
  (
    message: BgMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ): void
}