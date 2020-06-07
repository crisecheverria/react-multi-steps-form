import React, { useState } from "react"
import Input from "./commons/Input"
import LocalStorage from "./commons/LocalStorage"

export default function FormFlightInformation({
  nextStep,
  onInterruptionType,
}) {
  const [flight, setFlight] = LocalStorage("flight")
  const [inputErrors, setErrors] = useState({
    errors: {},
  })

  function onChange({ currentTarget: input }) {
    const errors = { ...inputErrors.errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    setErrors({ errors })
    setFlight({
      ...flight,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}
    const { airline, flightDateTime, interruptionType } = flight
    if (airline.trim() === "") {
      errors["airline"] = "Airline is required."
    }
    if (flightDateTime.trim() === "") {
      errors["flightDateTime"] = "flightDateTime is required."
    }
    if (new Date(flightDateTime) > new Date()) {
      errors["flightDateTime"] = "flightDateTime only today/past."
    }
    if (interruptionType.trim() === "") {
      errors["interruptionType"] = "interruptionType is required."
    }

    return Object.keys(errors).length === 0 ? null : errors
  }

  function validateProperty({ name, value }) {
    if (name === "airline") {
      if (value.trim() === "") return "Airline is required."
    }

    if (name === "flightDateTime") {
      if (new Date(value) > new Date())
        return "flightDateTime past/today only."
    }

    if (name === "interruptionType") {
      if (value.trim() === "") return "interruptionType is required."
    }
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
    <>
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

      <button
        type="submit"
        className="button is-primary is-pulled-right"
        onClick={continueStep}
      >
        Next
      </button>
    </>
  )
}
