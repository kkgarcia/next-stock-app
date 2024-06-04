import { useController } from 'react-hook-form'

import FieldWrapper, { type FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: string
  className?: string
  name: string
  placeholder?: string
}

export default function InputField(props: InputFieldProps) {
  const { label, type = 'text', className, name, placeholder } = props

  const {
    field,
    fieldState: { error },
  } = useController({ name })

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={className}
        {...field}
        placeholder={placeholder}
      />
    </FieldWrapper>
  )
}
