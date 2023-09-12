import { type FieldError } from 'react-hook-form'

import styles from './FieldWrapper.module.css'

type FieldWrapperProps = {
  className?: string
  label: string
  error?: FieldError | undefined
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>

export default function FieldWrapper(props: FieldWrapperProps) {
  const { className, children, error, label } = props

  return (
    <div className={className || styles['form__control']}>
      <label>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <div
          className={styles['form__error-message']}
          role="alert"
          aria-label={error.message}
        >
          {error.message}
        </div>
      )}
    </div>
  )
}
