import { getCurrentItems, getLastItems } from '../../modules/items';
import { ContentMessageData, ContentMessageType } from '../../types/Messages';

type ContentMessageHandler<T extends ContentMessageType> = (payload: ContentMessageData[T]['payload']) => Promise<void>

type ContentMessageController = {
  [Key in ContentMessageType]: ContentMessageHandler<Key>;
}

const contentMessageController: ContentMessageController = {
  UPDATE_NEW_ITEMS: async (payload) => {
    const { catUrl } = payload;
    const currItems = await getCurrentItems(catUrl);
    console.log(currItems);
    // TODO: Determine which items are new and display them
    // TODO: Update item cache for category
  }
};
export default contentMessageController;

/// Auxiliary functions

