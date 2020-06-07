import React from "react"
import { render, fireEvent } from "@testing-library/react"
import FormFlightCancellation from "."

test("renders <FormFlightCancellation/> component", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByTestId, getAllByTestId } = render(
    <FormFlightCancellation {...props} />
  )
  const textInputs = getAllByTestId(/text-input/i)
  const backButton = getByTestId(/back-button/i)
  const nextButton = getByTestId(/next-button/i)

  expect(textInputs[0].type).toBe("text")
  expect(textInputs[1].type).toBe("datetime-local")
  expect(backButton).toBeInTheDocument()
  expect(nextButton).toBeInTheDocument()
})

test("renders <Notification/> component when inputs are empty", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByTestId } = render(
    <FormFlightCancellation {...props} />
  )
  const nextButton = getByTestId(/next-button/i)

  fireEvent.click(nextButton)

  expect(getByTestId(/notification/i)).toBeInTheDocument()
})

test("renders <Notification/> component when New Flight Number is invalid", () => {
  const props = {
    prevStep: () => {},
    nextStep: () => {},
  }
  const { getByTestId, getAllByTestId } = render(
    <FormFlightCancellation {...props} />
  )
  const textInputs = getAllByTestId(/text-input/i)

  fireEvent.change(textInputs[0], {
    target: { value: "a" },
  })
  fireEvent.click(getByTestId(/next-button/i))

  expect(getByTestId(/notification/i)).toBeInTheDocument()
})
