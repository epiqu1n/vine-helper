import { ItemSet } from '../types/Items';
import mt from '../types/MessageTypes';
import { RuntimeMessage } from '../types/Runtime';
import { sendBgMessage } from './modules/messenger';
console.log('Running Vine Helper content script');

/// Globals
const domParser = new DOMParser();

/** onMessage: Listen for messages from popup or content script */
chrome.runtime.onMessage.addListener(async (message: RuntimeMessage, sender, sendResponse) => {
  console.debug('Content script received a message:', message);

  switch (message.type) {
    case 'GET_ITEMS_BY_ID':
      const { url } = message.payload as mt[typeof message.type];
      const items: ItemSet = {};

      // Determine number of pages
      const maxPage = parseInt((document.querySelector('ul.a-pagination > li.a-normal:nth-last-of-type(2) > a') as HTMLLinkElement)?.innerText) || 1;

      // Iterate through number of pages
      for (let i = 1; i <= maxPage; i++) {
        const pag_url = `${url}&page=${i}`;
        const raw_page = await fetch(pag_url).then(res => res.text()) as string;
        const page = domParser.parseFromString(raw_page, 'text/html');

        // Find items and store their data
        const itemElems = page.querySelectorAll('.vvp-item-tile') as unknown as HTMLElement[];
        for (const itemEl of itemElems) {
          const href = (itemEl.querySelector('.vvp-item-product-title-container .a-link-normal') as HTMLLinkElement).href;
          items[href] = {
            recId: itemEl.dataset.recommendationId as string,
            imageUrl: itemEl.dataset.imgUrl as string,
            inputBtn: (itemEl.querySelector('.vvp-details-btn') as HTMLElement).outerHTML,
            title: (itemEl.querySelector('.a-link-normal .a-truncate-full') as HTMLSpanElement).innerText
          };
        }
      }
      console.log(items);
      
      sendResponse({ type: 'RECEIVE_ITEMS', payload: items });
      break;
    default:
      console.error(`Unknown message type: ${message.type}`);
      break;
  }
});