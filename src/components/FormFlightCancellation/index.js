import React, { useState } from "react"
import PropTypes from "prop-types"
import Sugar from "sugar-date"
import Input from "../commons/Input"
import LocalStorage from "../commons/LocalStorage"
import Notification from "../commons/Notification"

export default function FormFlightCancellation({
  nextStep,
  prevStep,
}) {
  const [cancellationInfo, setInfo] = LocalStorage("flight")
  const [inputErrors, setErrors] = useState({
    errors: {},
  })

  // eslint-disable-next-line
  function validateProperty({ name, value }) {
    const { flightDateTime } = cancellationInfo
    if (name === "newFlightNumber") {
      if (value.trim() === "") return "New Flight Number is required."
    }

    if (name === "newFlightDateTime") {
      if (new Date(value) < new Date(flightDateTime)) {
        return `New Flight DateTime most be after ${
          Sugar.Date(flightDateTime).long().raw
        }.`
      }
    }
  }

  function onChange({ currentTarget: input }) {
    const errors = { ...inputErrors.errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    if (errors.empty) delete errors.empty

    setErrors({ errors })
    setInfo({
      ...cancellationInfo,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}
    if (
      cancellationInfo.newFlightNumber &&
      cancellationInfo.newFlightDateTime &&
      cancellationInfo.flightDateTime
    ) {
      const {
        newFlightNumber,
        newFlightDateTime,
        flightDateTime,
      } = cancellationInfo
      const newFlightNumberPattern = /^[a-zA-Z]{2}[0-9]{4}$/g
      if (newFlightNumber.trim() === "") {
        errors.newFlightNumber = "New Flight Number is required."
      }
      if (newFlightNumber.trim() === "") {
        errors.newFlightNumber = "New Flight Number is required."
      }

      if (
        !newFlightNumber
          .replace(/['"]+/g, "")
          .match(newFlightNumberPattern)
      ) {
        errors.newFlightNumber =
          "New Flight Number only accept 2 letters and 1-4 numbers."
      }
      if (new Date(newFlightDateTime) < new Date(flightDateTime)) {
        errors.newFlightDateTime = `New Flight DateTime most be after ${
          Sugar.Date(flightDateTime).long().raw
        }.`
      }

      return Object.keys(errors).length === 0 ? null : errors
    }

    errors.empty = "Form is empty."
    return errors
  }

  function continueStep(e) {
    e.preventDefault()
    const errors = validate()
    setErrors({ errors: errors || {} })
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
            type="text"
            name="newFlightNumber"
            className="input"
            placeholder="AB1234"
            label="New Flight Number"
            value={cancellationInfo.newFlightNumber}
            onChange={onChange}
            error={inputErrors.errors.newFlightNumber}
          />
          <Input
            type="datetime-local"
            name="newFlightDateTime"
            className="input"
            label="New Flight DateTime"
            value={cancellationInfo.newFlightDateTime}
            onChange={onChange}
            error={inputErrors.errors.newFlightDateTime}
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

FormFlightCancellation.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
}
