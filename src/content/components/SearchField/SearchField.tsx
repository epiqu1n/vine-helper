import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import styles from './SearchField.module.scss';

interface SearchBarProps<IT> {
  items: IT[],
  placeholder: string,
  filterBy?: (value: IT) => string,
  onFilterChange: (matches: IT[]) => void,
  filterIfNoInput?: boolean,
  ignoreCase?: boolean,
}

const DEBOUNCE_WAIT = 250;

export default function SearchField<IT>({
  items,
  placeholder,
  onFilterChange,
  filterBy,
  filterIfNoInput = true,
  ignoreCase = true,

}: SearchBarProps<IT>) {
  const [value, setValue] = useState('');
  
  /** Debounced function to filter items based on search */
  const filterItems_deb = useMemo(() => {
    return debounce((value: string) => {
      const query = ignoreCase ? value.toLowerCase() : value;
      const matches = !value && filterIfNoInput ? [] : items.filter((item) => {
        const filterValue = (
          typeof filterBy !== 'function' ? value
          : ignoreCase ? filterBy(item).toLowerCase()
          : filterBy(item)
        );
        return filterValue.match(query);
      });
      onFilterChange(matches);
    }, DEBOUNCE_WAIT);
  }, [ignoreCase, filterIfNoInput, items, onFilterChange, filterBy]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    filterItems_deb(event.target.value);
  };

  return (
    <div className={styles['search-field']}>
      <input type='text' placeholder={placeholder} onChange={handleInputChange} value={value} />
    </div>
  );
}