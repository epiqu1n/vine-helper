interface SearchBarProps{
  items: unknown[]
}

export default function SearchField({ items }: SearchBarProps) {
  return (
    <input type='text'defaultValue='Search this category...' />
  );
}