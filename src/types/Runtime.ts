import MESSAGE_TYPES from './MessageTypes';

export interface RuntimeMessage {
  type: keyof MESSAGE_TYPES,
  payload?: unknown
}