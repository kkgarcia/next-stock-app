import {
  useController,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'

import { DateRangePicker } from '@tremor/react'

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper'

type DateRangePickerProps<TFieldValues extends FieldValues> =
  FieldWrapperPassThroughProps & {
    name: FieldPath<TFieldValues>
  }

export default function DateRangePickerComponent<
  TFieldValues extends FieldValues = FieldValues
>({ label, name }: DateRangePickerProps<TFieldValues>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  if (error) {
    error.message = '*Date range is required'
  }

  return (
    <FieldWrapper label={label} error={error}>
      <DateRangePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={onChange}
      />
    </FieldWrapper>
  )
}
