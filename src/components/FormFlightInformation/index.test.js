import React from "react"
import { render, fireEvent } from "@testing-library/react"
import FormFlightInformation from "."

test("renders <FormFlightInformation/> component", () => {
  const props = {
    onInterruptionType: () => {},
    nextStep: () => {},
  }

  const { getByText, getByTestId, getAllByTestId } = render(
    <FormFlightInformation {...props} />
  )
  const flightInfoTitle = getByText(/Flight Information/i)
  const selectInput = getByTestId(/select-input/i)
  const textInput = getByTestId(/text-input/i)
  const radioInputs = getAllByTestId(/radio-button/i)
  const nextButton = getByTestId(/submit-button/i)

  expect(flightInfoTitle).toBeInTheDocument()
  expect(selectInput).toBeInTheDocument()
  expect(textInput).toBeInTheDocument()
  expect(radioInputs.length).toBe(2)
  expect(nextButton).toBeInTheDocument()
})

test("renders <Notification/> component when form is empty", () => {
  const props = {
    onInterruptionType: () => {},
    nextStep: () => {},
  }

  const { getByTestId } = render(<FormFlightInformation {...props} />)
  const nextButton = getByTestId(/submit-button/i)

  fireEvent.click(nextButton)

  expect(getByTestId(/notification/i)).toBeInTheDocument()
})

test("renders <Notification/> component when Flight Datetime is invalid", () => {
  const props = {
    onInterruptionType: () => {},
    nextStep: () => {},
  }
  const { getByTestId } = render(<FormFlightInformation {...props} />)

  fireEvent.change(getByTestId(/text-input/i), {
    target: { value: "a" },
  })
  fireEvent.click(getByTestId(/submit-button/i))

  expect(getByTestId(/notification/i)).toBeInTheDocument()
})
