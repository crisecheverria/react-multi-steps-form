import React from "react"
import { render } from "@testing-library/react"
import Success from "."

test("renders <Success/> component", () => {
  const { getByText } = render(<Success />)
  const confirmationTitle = getByText(/successfully/i)

  expect(confirmationTitle).toBeInTheDocument()
})
