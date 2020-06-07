import React from "react"
import { render } from "@testing-library/react"
import Confirm from "."

test("renders <Confirm/> component", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByText, getByTestId } = render(<Confirm {...props} />)
  const confirmationTitle = getByText(/confirmation/i)
  const airlineInfo = getByTestId(/airline/i)
  const flightDateTimeInfo = getByTestId(/flightDateTime/i)
  const interruptionTypeInfo = getByTestId(/interruptionType/i)

  expect(confirmationTitle).toBeInTheDocument()
  expect(airlineInfo).toBeInTheDocument()
  expect(flightDateTimeInfo).toBeInTheDocument()
  expect(interruptionTypeInfo).toBeInTheDocument()
})
