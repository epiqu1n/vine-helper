import { ContentMessageData, ContentMessageType as CMT } from '../../types/Messages';

type ContentMessageHandler<T extends CMT> = (payload: ContentMessageData[T]['payload']) => Promise<void>

type ContentMessageController = {
  [Key in CMT]: ContentMessageHandler<Key>;
}

type MessageListenerStore = {
  [key in CMT]?: Parameters<typeof registerMessageListener>[1]
}

const messageListeners: MessageListenerStore = {};

interface ListenerTypes extends Record<CMT, (...data: never[]) => void> {
}

export function registerMessageListener<T extends CMT>(type: T, callback: ListenerTypes[T]): void {
  messageListeners[type] = callback;
}

// Receive message from background script
// Make class for message controller
// Trigger state update in React component
const contentMessageController: ContentMessageController = {

};

export default {
  ...contentMessageController
};
// export default contentMessageController;

/// Auxiliary functions