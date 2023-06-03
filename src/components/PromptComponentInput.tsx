import {
  FC,
  Ref,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Popover } from '@headlessui/react'
import { miniId } from '../utils/mini-id'

export interface IPromptComponentInputProps {
  className?: string
  helpText?: string
  label: string
  value: string
  onChange: (value: string) => void
}

const split = (x: string) => x.split(',')

const PromptComponentInput: FC<IPromptComponentInputProps> = ({
  className,
  helpText,
  label,
  value,
  onChange,
}) => {
  const inputIdRef = useRef(miniId())
  const inputsRef = useRef<Ref<HTMLInputElement>[]>([])
  const [currIndex, currIndexSet] = useState(0)
  const splitValues = useRef(split(value))
  const [inputCount, inputCountSet] = useState([true])

  const cleanUpAndFocus = useCallback(() => {
    // remove inputs if more than one is empty
    let emptyInputs = 0
    const inputsMarkedToRemove: Array<string | null> = [...splitValues.current]
    splitValues.current.forEach((x, i) => {
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

    splitValues.current = newSplitValues

    inputCountSet(newSplitValues.map(() => true))
  }, [])

  const handleSplitChange = useCallback(
    (index: number, newValue: string) => {
      const valuesCopy = [...splitValues.current]
      valuesCopy[index] = newValue
      const newJointValue = valuesCopy.filter(x => x.length).join(',')
      splitValues.current = split(newJointValue)
      cleanUpAndFocus()
      onChange(newJointValue)
    },
    [cleanUpAndFocus, onChange],
  )

  useEffect(() => {
    splitValues.current = split(value)
    if (inputsRef.current.length < inputCount.length) {
      inputsRef.current.push(createRef())
    } else if (inputsRef.current.length > inputCount.length) {
      inputsRef.current.splice(-1, 1)
    }

    // update input values
    splitValues.current.forEach((_ref, i) => {
      const inputRef = inputsRef.current[i]
      const input = (inputRef as RefObject<HTMLInputElement> | undefined)
        ?.current
      if (input) input.value = _ref
    })

    // focus last input
    if (currIndex < splitValues.current.length - 1) {
      const newIndex = splitValues.current.length - 1
      currIndexSet(newIndex)
      // const input = document.getElementById(inputIdRef.current + newIndex)
      const input = (
        inputsRef.current[newIndex] as RefObject<HTMLInputElement> | undefined
      )?.current
      input?.focus()
    }
  }, [currIndex, inputCount.length, value])

  return (
    <div className={`card relative ${className}`}>
      <label htmlFor={inputIdRef.current + 0} className="mb-2 block text-xl">
        {label}
      </label>

      {helpText && (
        <Popover className="absolute right-8 top-8">
          <Popover.Button className="text-gray-600 transition-colors hover:text-gray-400">
            Help
          </Popover.Button>

          <Popover.Panel className="card card--popover absolute right-0 top-4 w-96 max-w-prose">
            {({ close }) => (
              <>
                {helpText}
                <div
                  className="button absolute right-2 top-2 text-sm"
                  onClick={() => close()}
                >
                  ✕
                </div>
              </>
            )}
          </Popover.Panel>
        </Popover>
      )}

      <div className="flex flex-col">
        {inputCount.map((_val, i) => (
          <input
            key={i}
            className="input text-3xl"
            defaultValue={splitValues.current[i]}
            id={inputIdRef.current + i}
            onChange={evt => handleSplitChange(i, evt.target.value)}
            ref={inputsRef.current[i]}
            type="text"
          />
        ))}
      </div>
    </div>
  )
}

export default PromptComponentInput
