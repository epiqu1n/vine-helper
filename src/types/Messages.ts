type Payload = Record<string, unknown> | undefined;
type MessageData = { payload: Payload, response?: Payload };

/// Messages for content scripts

/** Types for messages intended for content scripts */
export enum ContentMessageType {
  UPDATE_NEW_ITEMS = 'UPDATE_NEW_ITEMS'
}
/** Payload and response data for messages intended for content scripts */
export interface ContentMessageData extends Record<ContentMessageType, MessageData> {
  [ContentMessageType.UPDATE_NEW_ITEMS]: {
    payload: { url: string },
    response: undefined
  }
}

/** General structure of a message intended for content scripts */
export interface ContentMessage {
  type: ContentMessageType,
  payload: ContentMessageData[keyof ContentMessageData]['payload']
}


/// Messages for background scripts

/** Types for messages intended for background scripts */
export enum BgMessageType {
  
}

/** Payload and response data for messages intended for background scripts */
export interface BgMessageData extends Record<BgMessageType, MessageData> {
  
}

/** General structure of a message intended for background scripts */
export interface BgMessage {
  type: BgMessageType,
  payload: BgMessageData[keyof BgMessageData]['payload']
}