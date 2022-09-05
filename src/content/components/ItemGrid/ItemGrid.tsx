import { ItemList } from '../../../types/Items';
import ItemTile from './ItemTile';
import styles from '../styles/ItemGrid.module.scss';
import { pluralize } from '../../../modules/utils';

interface ItemGridProps {
  items: ItemList,
  title: string,
  searchable?: boolean
}

export default function ItemGrid({ items, title, searchable = false }: ItemGridProps) {

  const itemEls =  items.map((item) => <ItemTile key={`item_${item.sku}`} item={item} />);
  const numItemsText = itemEls.length > 0 && `(${items.length} ${pluralize('item', items.length)})`;

  return (
    <section className={styles['vh-section']}>
      <h3>{title} {itemEls.length > 0 && numItemsText}</h3>
      <ul className={styles['vh-item-list']}>
        { items.length > 0 ? itemEls : 'Nothing here!' }
      </ul>
    </section>
  );
}