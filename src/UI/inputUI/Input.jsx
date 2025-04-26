import classes from './Input.module.css';

export default function Input({ label, id, ...props }) {
  return (
    <p className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
}
