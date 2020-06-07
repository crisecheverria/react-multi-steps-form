import React from "react"
import { render } from "@testing-library/react"
import App from "."

test("renders <App/> component", () => {
  const { baseElement } = render(<App />)

  expect(baseElement).toMatchSnapshot()
})
