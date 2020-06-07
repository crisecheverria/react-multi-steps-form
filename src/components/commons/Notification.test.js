import React from "react"
import { render } from "@testing-library/react"
import Notification from "./Notification"

test("renders <Notification/> component", () => {
  const props = {
    message: "Hello world!",
  }
  const { getByTestId } = render(<Notification {...props} />)
  const notification = getByTestId(/notification/i)

  expect(notification).toBeInTheDocument()
})
