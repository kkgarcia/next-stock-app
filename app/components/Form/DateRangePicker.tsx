import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'

import { DateRangePicker } from '@tremor/react'

import FieldWrapper from './FieldWrapper'

type DateRangePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  label: string
  error?: FieldError | undefined
  name: FieldPath<TFieldValues>
}

export default function DateRangePickerComponent<
  TFieldValues extends FieldValues
>(props: DateRangePickerProps<TFieldValues>) {
  const { control, label, error, name } = props

  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateRangePicker
            className="max-w-md mx-auto"
            value={value}
            onValueChange={onChange}
          />
        )}
      />
    </FieldWrapper>
  )
}
