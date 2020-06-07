import React from 'react'
import Input from "./commons/Input"

export default function FormInterruptionType({ nextStep, prevStep, handleChange, values }) {
  function continueStep(e) {
    e.preventDefault()
    nextStep()
  }

  function previousStep(e) {
    e.preventDefault()
    prevStep()
  }

  return (
    <div>
      <h2 className="title">Interruption Type</h2>
      <Input 
        type="radio"
        name="flightInterruptionType"
        className="radio"
        label="Cancellation"
        value="cancellation"
        onChange={handleChange}
        custom={values.flightInterruptionType}
        error={values.errors.flightInterruptionType}
      />

      <Input 
        type="radio"
        name="flightInterruptionType"
        className="radio"
        label="Delay"
        value="delay"
        onChange={handleChange}
        custom={values.flightInterruptionType}
        error={values.errors.flightInterruptionType}
      />
      
     
      <button className="button is-primary is-pulled-left" onClick={previousStep}>Back</button>
      <button className = "button is-primary is-pulled-right" onClick={continueStep}>Next</button>
    </div>
  )
}
