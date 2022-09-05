import { ItemMap } from '../types/Items';
const domParser = new DOMParser();

/** Gets all of the items for the given category url */
export async function getCategoryItems(catUrl: string) {
  const items: ItemMap = {};

  // Determine number of pages
  const maxPage = parseInt((document.querySelector('ul.a-pagination > li.a-normal:nth-last-of-type(2) > a') as HTMLLinkElement)?.innerText) || 1;

  // Iterate through number of pages
  for (let i = 1; i <= maxPage; i++) {
    const pag_url = `${catUrl}&page=${i}`;
    const raw_page = await fetch(pag_url).then(res => res.text()) as string;
    const page = domParser.parseFromString(raw_page, 'text/html');

    // Find items and store their data
    const itemElems = page.querySelectorAll('.vvp-item-tile') as unknown as HTMLElement[];
    for (const itemEl of itemElems) {
      const sku = (itemEl.querySelector('.vvp-item-product-title-container .a-link-normal') as HTMLLinkElement)?.href.split('amazon.com/dp/')[1];
      if (!sku) {
        console.error('Could not find href for item:', itemEl);
        continue;
      }

      items[sku] = {
        sku,
        recId: itemEl.dataset.recommendationId as string,
        imageUrl: itemEl.dataset.imgUrl as string,
        inputBtn: (itemEl.querySelector('.vvp-details-btn') as HTMLElement).outerHTML,
        title: (itemEl.querySelector('.a-link-normal .a-truncate-full') as HTMLSpanElement).innerText,
        isParentAsin: (itemEl.querySelector('input.a-button-input') as HTMLInputElement).dataset.isParentAsin === 'true'
      };
    }
  }

  const storedItems = await getStoredItems(catUrl);
  const newItems = checkNewItems(storedItems, items);
  setStoredItems(catUrl, newItems)
  .catch((err) => console.error(err));

  return {
    allItems: items,
    newItems
  };
}

/** Gets the last stored items for a given category url */
export async function getStoredItems(catUrl: string): Promise<ItemMap> {
  const catKey = `cached-items-${catUrl}`;
  const items = (await chrome.storage.local.get(catKey))[catKey] as ItemMap;
  return items;
}

/** Updates the last stored items for a given category url */
export async function setStoredItems(catUrl: string, items: ItemMap): Promise<void> {
  const catKey = `cached-items-${catUrl}`;
  await chrome.storage.local.set({ [catKey]: items});
}

/** Gets the current category on the page */
export function getCategoryUrl(url: string) {
  const { queue, pn, cn } = Object.fromEntries((new URL(url)).searchParams);
  const category = `?queue=${queue}&pn=${pn || ''}&cn=${cn || ''}`;
  return category;
}

/** Checks current items against previous items and returns which ones are new */
export function checkNewItems(prev: ItemMap, curr: ItemMap): ItemMap {
  if (!prev) return {};

  const newItems: ItemMap = {};
  for (const sku in curr) {
    if (!(sku in prev)) newItems[sku] = curr[sku];
  }
  return newItems;
}