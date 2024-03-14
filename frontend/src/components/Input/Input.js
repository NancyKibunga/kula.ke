import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import classes from './input.module.css';
function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
    /* gives specific errors based on the error type */
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    /* these are the defined defaults */
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
        // if the error is not defined, a star is returned
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {/* checks for error and gets the error message for the input */}
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);