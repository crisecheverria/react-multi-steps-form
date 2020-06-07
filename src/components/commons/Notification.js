import React from "react"
import PropTypes from "prop-types"

export default function Notification({ message }) {
  return (
    <div
      data-testid="notification"
      className="notification is-danger is-light"
    >
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}
