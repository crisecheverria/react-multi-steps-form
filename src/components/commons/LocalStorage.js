import React from "react"
import PropTypes from "prop-types"

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || ""
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [localStorageKey, value])

  return [value, setValue]
}

useStateWithLocalStorage.propTypes = {
  localStorageKey: PropTypes.string.isRequired,
}

export default useStateWithLocalStorage
