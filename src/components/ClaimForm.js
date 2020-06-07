import React from "react"
import FormFlightInformation from "./FormFlightInformation"
import FormFlightCancellation from "./FormFlightCancellation"
import FormFlightDelay from "./FormFlightDelay"
import Confirm from "./Confirm"

export class ClaimForm extends React.Component {
  state = {
    step: 1,
    flightInterruptionType: "",
  }

  handleFlightInterruptionType = (type) => {
    this.setState({ flightInterruptionType: type })
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({ step: step + 1 })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({ step: step - 1 })
  }

  stepByStep = () => {
    const { step, flightInterruptionType } = this.state

    // eslint-disable-next-line default-case
    switch (step) {
      case 1:
        return (
          <FormFlightInformation
            nextStep={this.nextStep}
            onInterruptionType={this.handleFlightInterruptionType}
          />
        )

      case 2:
        return (
          <>
            {flightInterruptionType === "cancellation" && (
              <FormFlightCancellation
                nextStep={this.nextStep}
                prevStep={this.prevStep}
              />
            )}

            {flightInterruptionType === "delay" && (
              <FormFlightDelay
                nextStep={this.nextStep}
                prevStep={this.prevStep}
              />
            )}
          </>
        )

      case 3:
        return <Confirm />
    }
  }

  render() {
    return <>{this.stepByStep()}</>
  }
}

export default ClaimForm
