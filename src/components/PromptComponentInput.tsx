import { FC, useRef } from 'react'
import { miniId } from '../utils/mini-id'

interface IPromptComponentInputProps {
  label: string
  value: string
  handleChange: (value: string) => void
}

const PromptComponentInput: FC<IPromptComponentInputProps> = ({
  label,
  value,
  handleChange,
}) => {
  const inputIdRef = useRef(miniId())
  return (
    <>
      <label htmlFor={inputIdRef.current}>{label}</label>
      <input
        id={inputIdRef.current}
        type="text"
        value={value}
        onChange={evt => handleChange(evt.target.value)}
      />
    </>
  )
}

export default PromptComponentInput
