import React from "react"
import PropTypes from "prop-types"
import Sugar from "sugar-date"
import LocalStorage from "../commons/LocalStorage"

function Confirm({ prevStep, nextStep }) {
  const [infoSubmited] = LocalStorage("flight")

  function previousStep(e) {
    e.preventDefault()
    prevStep()
  }

  function continueStep(e) {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <h2>Confirmation</h2>
            <p>
              We received your information. Soon you will here from
              us. Here you can see the information you enter.
            </p>
            <p className="label">Airline:</p>
            <p data-testid="airline">{infoSubmited.airline}</p>
            <p className="label">Flight Date & Time:</p>
            <p data-testid="flightDateTime">
              {Sugar.Date(infoSubmited.flightDateTime).long().raw}
            </p>
            <p className="label">Interruption Type:</p>
            <p data-testid="interruptionType">
              {infoSubmited.interruptionType}
            </p>

            {infoSubmited.interruptionType === "cancellation" && (
              <>
                <p className="label">New FLight Number:</p>
                <p>{infoSubmited.newFlightNumber}</p>
                <p className="label">New FLight Date & Time:</p>
                <p>
                  {
                    Sugar.Date(infoSubmited.newFlightDateTime).long()
                      .raw
                  }
                </p>
              </>
            )}

            {infoSubmited.interruptionType === "delay" && (
              <>
                <p className="label">FLight Delay in minutes:</p>
                <p>{infoSubmited.flightDelayTime}</p>
              </>
            )}

            <button
              type="button"
              className="button is-primary is-pulled-left"
              onClick={previousStep}
            >
              Back
            </button>
            <button
              type="button"
              className="button is-primary is-pulled-right"
              onClick={continueStep}
            >
              Confirm
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

Confirm.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
}

export default Confirm
