import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  if (type === undefined) {
    return {
      type,
      value,
      onChange,
    }
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    onReset: reset
  }
}