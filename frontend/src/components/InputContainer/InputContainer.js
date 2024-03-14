import classes from './inputContainer.module.css';

// wraps the input in a appealing container and labels
export default function InputContainer({ label, bgColor, children }) {
  return (
    <div className={classes.container} style={{ backgroundColor: bgColor }}>
      <label className={classes.label}>{label}</label>
      <div className={classes.content}>{children}</div>
    </div>
  );
}