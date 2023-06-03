import { FC } from 'react'
import { RadioGroup } from '@headlessui/react'
import { IPromptComponentInputProps } from './PromptComponentInput'

interface IPromptComponentSelectProps extends IPromptComponentInputProps {
  options: { label: string; value: string }[]
}

const PromptComponentSelect: FC<IPromptComponentSelectProps> = ({
  className,
  label,
  onChange,
  options,
  value,
}) => {
  return (
    <div className={`card ${className}`}>
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="mb-2 block text-xl">
          {label}
        </RadioGroup.Label>
        {options.map(option => (
          <RadioGroup.Option key={option.label} value={option.value}>
            {({ checked }) => (
              <div
                className={
                  'button text-2xl' + (checked ? ' button--toggled' : '')
                }
              >
                {option.label}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <button className="button mt-8" onClick={() => onChange('')}>
        ⊘ Reset
      </button>
    </div>
  )
}

export default PromptComponentSelect
