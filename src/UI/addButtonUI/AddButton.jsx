import classes from './AddButton.module.css';

export default function AddButton({ onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.shadow}></span>
      <span className={classes.edge}></span>
      <div className={classes.front}>
        <span>Add to Cart</span>
      </div>
    </button>
  );
}
