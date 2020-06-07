import React from "react"
import { render } from "@testing-library/react"
import Main from "."

test("renders <Main/> component", () => {
  const { getByText, baseElement } = render(<Main />)
  const flightInfoTitle = getByText(/Flight Information/i)

  expect(flightInfoTitle).toBeInTheDocument()
  expect(baseElement).toMatchSnapshot()
})
