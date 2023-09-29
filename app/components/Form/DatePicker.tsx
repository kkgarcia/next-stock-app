import {
  useController,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'

import { DatePicker } from '@tremor/react'

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper'

type DatePickerProps<TFieldValues extends FieldValues> =
  FieldWrapperPassThroughProps & {
    name: FieldPath<TFieldValues>
  }

export default function DatePickerComponent<
  TFieldValues extends FieldValues = FieldValues
>({ label, name }: DatePickerProps<TFieldValues>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  return (
    <FieldWrapper label={label} error={error}>
      <DatePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={onChange}
      />
    </FieldWrapper>
  )
}
