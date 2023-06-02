import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { miniId } from '../utils/mini-id'

interface IPromptComponentInputProps {
  label: string
  value: string
  handleChange: (value: string) => void
}

const split = (x: string) => x.split(',')

const PromptComponentInput: FC<IPromptComponentInputProps> = ({
  label,
  value,
  handleChange,
}) => {
  const inputIdRef = useRef(miniId())
  const [currIndex, currIndexSet] = useState(0)
  const [splitValues, splitValuesSet] = useState(split(value))

  const handleSplitChange = useCallback(
    (index: number, newValue: string) => {
      const valuesCopy = [...splitValues]
      valuesCopy[index] = newValue
      const newJointValue = valuesCopy.filter(x => x.length).join(',')
      splitValuesSet(split(newJointValue))
      handleChange(newJointValue)
    },
    [handleChange, splitValues],
  )

  useEffect(() => {
    splitValuesSet(split(value))
  }, [value])

  useEffect(() => {
    // remove inputs if more than one is empty
    let emptyInputs = 0
    const inputsMarkedToRemove: Array<string | null> = [...splitValues]
    splitValues.forEach((x, i) => {
      if (!x.trim().length) {
        emptyInputs += 1
      }
      if (emptyInputs > 1) {
        inputsMarkedToRemove[i] = null
      }
    })
    const newSplitValues: string[] = inputsMarkedToRemove.filter(
      x => x !== null,
    ) as string[]

    // to have at least 1 empty input
    if (!emptyInputs) newSplitValues.push('')

    // focus last input
    if (currIndex < newSplitValues.length - 1) {
      const newIndex = newSplitValues.length - 1
      currIndexSet(newIndex)
      document.getElementById(inputIdRef.current + newIndex)?.focus()
    }
    splitValuesSet(newSplitValues)
  }, [splitValues, currIndex])

  return (
    <div>
      <label htmlFor={inputIdRef.current + 0}>{label}</label>
      <div className="flex flex-col gap-1">
        {splitValues.map((val, i) => (
          <input
            key={i}
            id={inputIdRef.current + i}
            type="text"
            value={val}
            onChange={evt => handleSplitChange(i, evt.target.value)}
            className="rounded border shadow-inner"
          />
        ))}
      </div>
    </div>
  )
}

export default PromptComponentInput
