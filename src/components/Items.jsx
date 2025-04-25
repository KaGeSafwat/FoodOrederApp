import { useFetch } from '../hooks/useFetch';
import Item from './Item';
import classes from './Items.module.css';

const config = {};

export default function Items() {
  const { items, isLoading, error } = useFetch('/Items.json', config, []);

  let content = <p>No items found</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (items.length > 0) {
    content = (
      <ul id={classes.items}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
}
