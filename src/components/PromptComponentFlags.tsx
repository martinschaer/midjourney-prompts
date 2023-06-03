import { FC, useCallback, useState } from 'react'
import { Switch } from '@headlessui/react'
import { IPromptComponentInputProps } from './PromptComponentInput'

interface IPromptComponentFlagsProps extends IPromptComponentInputProps {
  options: { label: string; value: string }[]
}

const PromptComponentFlags: FC<IPromptComponentFlagsProps> = ({
  className,
  label,
  onChange,
  options,
  value,
}) => {
  const [enabled, enabledSet] = useState(
    options.map(x => value.includes(x.value)),
  )
  const setEnabled = useCallback(
    (index: number) => {
      const newState = [...enabled]
      newState[index] = !newState[index]
      enabledSet(newState)
      onChange(
        newState
          .map((en, i) => (en ? options[i].value : null))
          .filter(x => !!x)
          .join(', '),
      )
    },
    [enabled, onChange, options],
  )
  return (
    <div className={`card ${className}`}>
      <span className="mb-2 block text-xl">{label}</span>
      {options.map((option, i) => (
        <Switch
          key={option.label}
          checked={enabled[i]}
          onChange={() => setEnabled(i)}
          className="flex items-center gap-4 p-2 text-2xl"
        >
          <div
            className={`${
              enabled[i] ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enabled[i] ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </div>
          <span>{option.label}</span>
        </Switch>
      ))}
    </div>
  )
}

export default PromptComponentFlags
