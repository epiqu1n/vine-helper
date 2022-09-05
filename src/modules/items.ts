import { ItemMap } from '../types/Items';
import { timeout } from './utils';
const domParser = new DOMParser();

/** Gets all of the items for the given category url */
export async function getCategoryItems(catUrl: string, pageLimit = 15) {
  const BASE_DELAY = 700;
  const BASE_VARIANCE = 100;
  const currItems: ItemMap = {};

  // Determine number of pages
  const numPages = parseInt((document.querySelector('ul.a-pagination > li.a-normal:nth-last-of-type(2) > a') as HTMLLinkElement)?.innerText) || 1;
  const overPageLimit = numPages > pageLimit;

  // Iterate through number of pages
  // Store fetch promises so that multiple can go out at a time and be awaited at once later
  // Add artificial delay between fetches to avoid spamming requests
  const fetchPromises: Promise<ItemMap>[] = [];
  for (let i = 1; i <= numPages; i++) {
    // If over the page limit, only use the first and last (limit / 2) pages
    if (overPageLimit && (pageLimit / 2 < i && i < numPages - pageLimit / 2 + 1)) continue;
    
    const pageUrl = `${catUrl}&page=${i}`;
    fetchPromises.push(getItemsOnPage(pageUrl).then((items) => Object.assign(currItems, items)));

    const delay = BASE_DELAY + (Math.random() * BASE_VARIANCE);
    await timeout(delay);
  }

  await Promise.all(fetchPromises);

  const prevItems = await getStoredItems(catUrl);
  const newItems = checkNewItems(prevItems, currItems);
  setStoredItems(catUrl, currItems)
  .catch((err) => console.error(err));

  return {
    allItems: currItems,
    newItems,
    overPageLimit
  };
}

async function getItemsOnPage(url: string) {
  const items: ItemMap = {};
  
  const rawPage = await fetch(url).then(res => res.text()) as string;
  const page = domParser.parseFromString(rawPage, 'text/html');    // Find items and store their data

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

  return items;
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