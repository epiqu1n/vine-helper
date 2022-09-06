import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import styles from './SearchField.module.scss';
import { pluralize } from '../../../modules/utils';

export type SearchInputModifer<T> = (value: T) => string
export type SearchFilterHandler<T> = (matches: T[]) => void;
export type SearchInputHandler = (value: string) => void;

interface SearchBarProps<IT> {
  items: IT[],
  placeholder: string,

  /** Determines how to compare given options against search query */
  filterBy?: SearchInputModifer<IT>,

  /** Triggered when the filtered results change */
  onFilterChange?: SearchFilterHandler<IT>,

  /** A debounced input change handler */
  onInputChange?: SearchInputHandler,

  /** Whether or not all results should be filtered if there is no input. Default `true` */
  filterIfNoInput?: boolean,

  /** Default `true` */
  ignoreCase?: boolean
}

const DEBOUNCE_WAIT = 250;

export default function SearchField<IT>({
  items,
  placeholder,
  onFilterChange,
  onInputChange,
  filterBy,
  filterIfNoInput = true,
  ignoreCase = true,

}: SearchBarProps<IT>) {
  const [value, setValue] = useState('');
  
  /** Debounced function to filter items based on search */
  const handleInputDebounced = useMemo(() => {
    return debounce((value: string) => {
      // Trigger input change listener (debounced)
      if (typeof onInputChange === 'function') onInputChange(value);

      // Create regex query to match all separate words (plural or not)
      const query = ignoreCase ? value.toLowerCase() : value;
      const tokens = query.match(/\b\w+\b/g)?.map((token) => `(?=.*\\b${pluralize(token)}${token !== 's' ? '?' : ''}\\b)`);
      const regexp = new RegExp(tokens?.join('') || '', (ignoreCase ? 'i' : ''));

      // Filter results by regex matcher
      const invalidQuery = !query || !tokens || tokens.length === 0;
      const matches = (
        invalidQuery || (!value && filterIfNoInput) ? []
        : items.filter((item) => {
          const filterValue = (
            typeof filterBy !== 'function' ? value
            : ignoreCase ? filterBy(item).toLowerCase()
            : filterBy(item)
          );

          return !!filterValue.match(regexp);
        })
      );

      // Trigger filter change listener
      if (typeof onFilterChange === 'function') onFilterChange(matches);
    }, DEBOUNCE_WAIT);
  }, [ignoreCase, filterIfNoInput, items, onFilterChange, onInputChange, filterBy]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    handleInputDebounced(event.target.value);
  };

  return (
    <div className={styles['search-field']}>
      <input type='text' placeholder={placeholder} onChange={handleInputChange} value={value} />
    </div>
  );
}