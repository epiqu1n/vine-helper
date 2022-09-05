import { Item } from '../../../types/Items';
import styles from '../styles/ItemTile.module.scss';

interface ItemTileProps {
  item: Item
}

export default function ItemTile({ item }: ItemTileProps) {
  return (
    <div className={`vvp-item-tile ${styles['vh-item-tile']}`}
      data-recommendation-id={item.recId}
      data-img-url={item.imageUrl}
    >
      <div className={`vvp-item-tile-content ${styles['vh-item-tile-content']}`}>
        <img alt="" src={item.imageUrl} />
        <div className="vvp-item-product-title-container">
          <a className="a-link-normal" target="_blank" rel="noreferrer" href={`/dp/${item.sku}`}>
            <span className="a-truncate"
              data-a-word-break="normal"
              data-a-max-rows="2"
              data-a-overflow-marker="&amp;hellip;"
              style={{ lineHeight: '1.3em !important', maxHeight: '2.6em' }}
              data-a-recalculate="false"
              data-a-updated="true"
            >
              <span className="a-truncate-full a-offscreen">
                {item.title}
              </span>
              <span className="a-truncate-cut"
                aria-hidden="true"
                style={{ height: '2.6em' }}
              >
                {truncateString(item.title)}
              </span>
            </span>
          </a>
        </div>
        <span className="a-button a-button-primary vvp-details-btn" id="a-autoid-0">
          <span className="a-button-inner">
            <input
              data-asin={item.sku}
              data-is-parent-asin={item.isParentAsin}
              data-recommendation-id={item.recId}
              data-recommendation-type="VENDOR_TARGETED"
              className="a-button-input"
              type="submit"
              aria-labelledby="a-autoid-0-announce"
            />
            <span className="a-button-text" aria-hidden="true" id="a-autoid-0-announce">See details</span>
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * Truncates a string to the specified length.
 * Adds a trailing ellipsis if `string.length` is greater than `maxLength`
 */
function truncateString(string: string, maxLength = 50): string {
  return (string.length > maxLength ? string.slice(0, 49) + '…' : string);
}