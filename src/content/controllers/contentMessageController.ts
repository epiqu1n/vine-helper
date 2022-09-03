import { getCurrentItems, getLastItems, setLastItems } from '../../modules/items';
import { ItemSet } from '../../types/Items';
import { ContentMessageData, ContentMessageType } from '../../types/Messages';

type ContentMessageHandler<T extends ContentMessageType> = (payload: ContentMessageData[T]['payload']) => Promise<void>

type ContentMessageController = {
  [Key in ContentMessageType]: ContentMessageHandler<Key>;
}

const contentMessageController: ContentMessageController = {
  UPDATE_NEW_ITEMS: async (payload) => {
    const { catUrl } = payload;
    const currItems = await getCurrentItems(catUrl);
    console.log('Current items:', currItems);

    // TODO: Determine which items are new and display them
    const lastItems = await getLastItems(catUrl);
    const newItems = checkNewItems(lastItems, currItems);
    console.log('New items:', newItems);

    // Update item cache for category
    setLastItems(catUrl, currItems);
  }
};
export default contentMessageController;

/// Auxiliary functions
function checkNewItems(prev: ItemSet, curr: ItemSet): ItemSet {
  const newItems: ItemSet = {};
  for (const sku in curr) {
    if (!(sku in prev)) newItems[sku] = curr[sku];
  }
  return newItems;
}