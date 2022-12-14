import { handleContentMessage } from './controllers/contentEventController';
import { createRoot } from 'react-dom/client';
import App from './components/App';

console.info('Running Vine Helper content script');


/// Tab event listeners
chrome.runtime.onMessage.addListener(handleContentMessage);


/// Initialize item grid React app
const helperContainer = document.createElement('div');
helperContainer.id = 'vh-container';
helperContainer.classList.add('a-section');
helperContainer.style.borderBottom = '2px solid #b4b4b4';

const buttonBarEl = document.querySelector('.a-section.vvp-items-button-and-search-container');
if (!buttonBarEl) console.error('Error: Could not find button bar element to create Vine Helper container');
else {
  buttonBarEl.insertAdjacentElement('afterend', helperContainer);

  const root = createRoot(helperContainer);
  root.render(<App />);
}

console.log('Initialized item grid React app');