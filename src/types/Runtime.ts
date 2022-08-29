import MESSAGE_TYPES from './MessageTypes';

export interface RuntimeMessage {
  type: MESSAGE_TYPES,
  payload?: unknown
}