import FieldWrapper, { type FieldWrapperPassThroughProps } from './FieldWrapper'
import { type UseFormRegisterReturn } from 'react-hook-form'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: string
  className?: string
  registration: UseFormRegisterReturn
  placeholder?: string
}

export default function InputField(props: InputFieldProps) {
  const {
    label,
    error,
    type = 'text',
    className,
    registration,
    placeholder,
  } = props

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={className}
        {...registration}
        placeholder={placeholder}
      />
    </FieldWrapper>
  )
}
