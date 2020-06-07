import React, { useState } from "react"
import PropTypes from "prop-types"
import Input from "../commons/Input"
import LocalStorage from "../commons/LocalStorage"
import Notification from "../commons/Notification"

export default function FormFlightInformation({
  nextStep,
  onInterruptionType,
}) {
  const [flight, setFlight] = LocalStorage("flight")
  const [inputErrors, setErrors] = useState({
    errors: {},
  })

  // eslint-disable-next-line
  function validateProperty({ name, value }) {
    if (name === "airline") {
      if (value.trim() === "") return "Airline is required."
    }

    if (name === "flightDateTime") {
      if (new Date(value) > new Date())
        return "Flight DateTime has to be in the past or today only."
    }

    if (name === "interruptionType") {
      if (value.trim() === "")
        return "Flight Interruption Type is required."
    }
  }

  function onChange({ currentTarget: input }) {
    const errors = { ...inputErrors.errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    if (errors.empty) delete errors.empty

    setErrors({ errors })
    setFlight({
      ...flight,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}
    if (
      flight.airline &&
      flight.flightDateTime &&
      flight.interruptionType
    ) {
      const { airline, flightDateTime, interruptionType } = flight

      if (airline.trim() === "") {
        errors.airline = "Airline is required."
      }
      if (flightDateTime.trim() === "") {
        errors.flightDateTime = "Flight DateTime is required."
      }
      if (new Date(flightDateTime) > new Date()) {
        errors.flightDateTime =
          "Flight DateTime has to be in the past or today only."
      }
      if (interruptionType.trim() === "") {
        errors.interruptionType =
          "Flight Interruption Type is required."
      }

      return Object.keys(errors).length === 0 ? null : errors
    }

    errors.empty = "Form is empty."
    return errors
  }

  function continueStep(e) {
    e.preventDefault()

    const { interruptionType } = flight

    const errors = validate()
    setErrors({ errors: errors || {} })
    if (errors) return

    onInterruptionType(interruptionType)
    nextStep()
  }

  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <h2 className="title">Flight Information</h2>
          <Input
            type="select"
            name="airline"
            className="select"
            label="Airline"
            value={flight.airline}
            onChange={onChange}
            options={[
              "Scandinavian Airlines",
              "British Airways",
              "Lufthansa",
              "KLM",
              "Air France",
            ]}
            error={inputErrors.errors.airline}
          />

          <Input
            type="datetime-local"
            name="flightDateTime"
            className="input"
            label="Flight DateTime"
            value={flight.flightDateTime}
            onChange={onChange}
            error={inputErrors.errors.flightDateTime}
          />

          <h2 className="title">Flight Interruption Type</h2>

          <Input
            type="radio"
            name="interruptionType"
            className="radio"
            label="Cancellation"
            value="cancellation"
            custom={flight.interruptionType}
            onChange={onChange}
            error={inputErrors.errors.interruptionType}
          />

          <Input
            type="radio"
            name="interruptionType"
            className="radio"
            label="Delay"
            value="delay"
            custom={flight.interruptionType}
            onChange={onChange}
            error={inputErrors.errors.interruptionType}
          />

          {inputErrors && inputErrors.errors.empty && (
            <Notification message={inputErrors.errors.empty} />
          )}

          <button
            type="submit"
            className="button is-primary is-pulled-right"
            onClick={continueStep}
            data-testid="submit-button"
          >
            Next
          </button>
        </div>
      </article>
    </div>
  )
}

FormFlightInformation.propTypes = {
  onInterruptionType: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
}
