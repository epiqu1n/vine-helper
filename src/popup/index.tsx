import { createRoot } from 'react-dom/client';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

console.log('Running popup app');

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);