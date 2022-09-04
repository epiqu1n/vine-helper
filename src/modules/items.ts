import { ItemSet } from '../types/Items';
const domParser = new DOMParser();

/** Gets all of the items for the given category url */
export async function getCurrentItems(catUrl: string) {
  const items: ItemSet = {};

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
        recId: itemEl.dataset.recommendationId as string,
        imageUrl: itemEl.dataset.imgUrl as string,
        inputBtn: (itemEl.querySelector('.vvp-details-btn') as HTMLElement).outerHTML,
        title: (itemEl.querySelector('.a-link-normal .a-truncate-full') as HTMLSpanElement).innerText,
        isParentAsin: (itemEl.querySelector('input.a-button-input') as HTMLInputElement).dataset.isParentAsin === 'true'
      };
    }
  }

  return items;
}

/** Gets the last stored items for a given category url */
export async function getLastItems(catUrl: string): Promise<ItemSet> {
  const catKey = `cached-items-${catUrl}`;
  const items = (await chrome.storage.local.get(catKey))[catKey] as ItemSet;
  return items;
}

/** Updates the last stored items for a given category url */
export async function setLastItems(catUrl: string, items: ItemSet): Promise<void> {
  const catKey = `cached-items-${catUrl}`;
  await chrome.storage.local.set({ [catKey]: items});
}