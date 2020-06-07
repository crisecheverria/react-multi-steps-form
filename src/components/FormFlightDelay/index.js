import React, { useState } from "react"
import PropTypes from "prop-types"
import Input from "../commons/Input"
import LocalStorage from "../commons/LocalStorage"
import Notification from "../commons/Notification"

export default function FormFlightDelay({ nextStep, prevStep }) {
  const [delayInfo, setInfo] = LocalStorage("flight")
  const [inputErrors, setErrors] = useState({
    errors: {},
  })

  // eslint-disable-next-line
  function validateProperty({ name, value }) {
    if (name === "flightDelayTime") {
      if (value.trim() === "") return "Field is required."
    }
  }

  function onChange({ currentTarget: input }) {
    const errors = {
      ...inputErrors.errors,
    }
    const errorMessage = validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    if (errors.empty) delete errors.empty

    setErrors({
      errors,
    })
    setInfo({
      ...delayInfo,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}

    if (delayInfo.flightDelayTime) {
      const { flightDelayTime } = delayInfo
      if (flightDelayTime.trim() === "") {
        errors.flightDelayTime = "Field is required."
      }

      return Object.keys(errors).length === 0 ? null : errors
    }

    errors.empty = "Field is empty."
    return errors
  }

  function continueStep(e) {
    e.preventDefault()
    const errors = validate()
    setErrors({
      errors: errors || {},
    })
    if (errors) return

    nextStep()
  }

  function previousStep(e) {
    e.preventDefault()
    prevStep()
  }
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <Input
            type="number"
            name="flightDelayTime"
            className="input"
            label="Flight Delay Time (minutes)"
            value={delayInfo.flightDelayTime}
            onChange={onChange}
            min="1"
            error={inputErrors.errors.flightDelayTime}
          />

          {inputErrors && inputErrors.errors.empty && (
            <Notification message={inputErrors.errors.empty} />
          )}

          <button
            type="button"
            className="button is-primary is-pulled-left"
            onClick={previousStep}
            data-testid="back-button"
          >
            Back
          </button>
          <button
            type="button"
            className="button is-primary is-pulled-right"
            onClick={continueStep}
            data-testid="next-button"
          >
            Next
          </button>
        </div>
      </article>
    </div>
  )
}

FormFlightDelay.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
}
