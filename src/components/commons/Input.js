import React from "react"
// import PropTypes from "prop-types"

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
          />
          {" "}{label}
        </label>
        {error && <div className="notification is-danger is-light">{error}</div>}
      </div>
    )
  }

  if (type === "select") {
    return (
      <div className="field">
        <label htmlFor={name} className="label">{label}</label>
        <div className={className}>
          <select name={name} value={value} onChange={onChange}>
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {error && <div className="notification is-danger is-light">{error}</div>}
      </div>
    )
  }

  console.log(error)

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {error && <div className="notification is-danger is-light">{error}</div>}
    </div>
  )
}

/* FormInput.defaultProps = {
  checked: null,
  required: false,
  value: "",
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
} */

export default FormInput
