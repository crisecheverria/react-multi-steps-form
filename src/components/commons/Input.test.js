import React from "react"
import { render } from "@testing-library/react"
import Input from "./Input"

test("renders <input type='text' /> element", () => {
  const props = {
    name: "username",
    label: "Username",
    value: "john_rambo",
    onChange: () => {},
    type: "text",
    checked: null,
    className: "input",
  }
  const { getByDisplayValue } = render(<Input {...props} />)
  const username = getByDisplayValue(/john_rambo/i)

  expect(username.type).toBe("text")
})

test("renders <input type='radio' /> element", () => {
  const props = {
    name: "delay",
    label: "Delay",
    value: "delay",
    onChange: () => {},
    type: "radio",
    checked: true,
    className: "radio",
  }
  const { getByDisplayValue } = render(<Input {...props} />)
  const delay = getByDisplayValue(/delay/i)

  expect(delay.type).toBe("radio")
})

test("renders <select /> element", () => {
  const props = {
    name: "airline",
    label: "Airline",
    value: "sas",
    onChange: () => {},
    type: "select",
    className: "select",
  }
  const { getByTestId } = render(<Input {...props} />)
  const selectInput = getByTestId(/select-input/i)

  expect(selectInput).toBeInTheDocument()
})
