import React, { useState } from "react"
import Input from "./commons/Input"
import LocalStorage from "./commons/LocalStorage"

export default function FormFlightCancellation({
  nextStep,
  prevStep,
}) {
  const [cancellationInfo, setInfo] = LocalStorage("flight")
  const [inputErrors, setErrors] = useState({
    errors: {},
  })

  function onChange({ currentTarget: input }) {
    const errors = { ...inputErrors.errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    setErrors({ errors })
    setInfo({
      ...cancellationInfo,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}
    const { newFlightNumber, newFlightDateTime } = cancellationInfo
    if (newFlightNumber.trim() === "") {
      errors["newFlightNumber"] = "newFlightNumber is required."
    }
    if (newFlightDateTime.trim() === "") {
      errors["newFlightDateTime"] = "newFlightDateTime is required."
    }
    if (new Date(newFlightDateTime) > new Date()) {
      errors["newFlightDateTime"] =
        "newFlightDateTime only today/past."
    }

    return Object.keys(errors).length === 0 ? null : errors
  }

  function validateProperty({ name, value }) {
    if (name === "newFlightNumber") {
      if (value.trim() === "") return "newFlightNumber is required."
    }

    if (name === "newFlightDateTime") {
      if (new Date(value) > new Date())
        return "newFlightDateTime past/today only."
    }
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
    <div>
      <Input
        type="input"
        name="newFlightNumber"
        className="input"
        label="New Flight No."
        value={cancellationInfo.newFlightNumber}
        onChange={onChange}
        error={inputErrors.errors.newFlightNumber}
      />
      <Input
        type="input"
        name="newFlightDateTime"
        className="input"
        label="New Flight DateTime"
        value={cancellationInfo.newFlightDateTime}
        onChange={onChange}
        error={inputErrors.errors.newFlightDateTime}
      />
      <button
        className="button is-primary is-pulled-left"
        onClick={previousStep}
      >
        Back
      </button>
      <button
        className="button is-primary is-pulled-right"
        onClick={continueStep}
      >
        Next
      </button>
    </div>
  )
}
