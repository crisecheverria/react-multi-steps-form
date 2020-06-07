import React from "react"
import { render, fireEvent } from "@testing-library/react"
import FormFlightDelay from "."

test("renders <FormFlightDelay/> component", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByTestId } = render(<FormFlightDelay {...props} />)
  const textInput = getByTestId(/text-input/i)
  const backButton = getByTestId(/back-button/i)
  const nextButton = getByTestId(/next-button/i)

  expect(textInput.type).toBe("number")
  expect(backButton).toBeInTheDocument()
  expect(nextButton).toBeInTheDocument()
})

test("renders <Notification/> component when input is empty", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByTestId } = render(<FormFlightDelay {...props} />)
  const nextButton = getByTestId(/next-button/i)

  fireEvent.click(nextButton)

  expect(getByTestId(/notification/i)).toBeInTheDocument()
})
