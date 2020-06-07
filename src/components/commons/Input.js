import React from "react"
import PropTypes from "prop-types"

function FormInput({
  name,
  label,
  value,
  onChange,
  type,
  checked,
  className,
  error,
  options,
  custom,
  ...rest
}) {
  if (type === "radio") {
    return (
      <div className="field">
        <label htmlFor={name} className={type}>
          <input
            id={name}
            type={type}
            className={className}
            name={name}
            value={value}
            onChange={onChange}
            checked={custom === value}
            data-testid="radio-button"
          />{" "}
          {label}
        </label>
        {error && (
          <div className="notification is-danger is-light">
            {error}
          </div>
        )}
      </div>
    )
  }

  if (type === "select") {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className={className}>
          <select
            name={name}
            value={value}
            onChange={onChange}
            data-testid="select-input"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="notification is-danger is-light">
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        data-testid="text-input"
        id={name}
        type={type}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        {...rest}
      />
      {error && (
        <div className="notification is-danger is-light">{error}</div>
      )}
    </div>
  )
}

FormInput.defaultProps = {
  checked: null,
  required: false,
  value: "",
  error: "",
  options: [],
  custom: "",
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  custom: PropTypes.string,
}

export default FormInput
