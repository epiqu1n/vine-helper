import { BgMessageData, BgMessageType} from '../../types/Messages';

type BgMessageHandler<T extends BgMessageType> = (payload: BgMessageData[T]['payload']) => Promise<void>

type BgMessageController = {
  [Key in BgMessageType]: BgMessageHandler<Key>;
}

const bgMessageController: BgMessageController = {

};

export default bgMessageController;