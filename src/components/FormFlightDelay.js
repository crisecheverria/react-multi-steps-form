import React, { useState } from "react"
import Input from "./commons/Input"
import LocalStorage from "./commons/LocalStorage"

export default function FormFlightDelay({ nextStep, prevStep }) {
  const [delayInfo, setInfo] = LocalStorage("flight")
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
      ...delayInfo,
      [input.name]: input.value,
    })
  }

  function validate() {
    const errors = {}
    const { flightDelayTime } = delayInfo
    if (flightDelayTime.trim() === "") {
      errors["flightDelayTime"] = "flightDelayTime is required."
    }

    return Object.keys(errors).length === 0 ? null : errors
  }

  function validateProperty({ name, value }) {
    if (name === "flightDelayTime") {
      if (value.trim() === "") return "flightDelayTime is required."
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
        name="flightDelayTime"
        className="input"
        label="Flight Delay Time"
        value={delayInfo.flightDelayTime}
        onChange={onChange}
        error={inputErrors.errors.flightDelayTime}
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
