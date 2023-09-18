import { type FieldError } from 'react-hook-form'

import { clsx } from 'clsx'

import styles from './FieldWrapper.module.css'

type FieldWrapperProps = {
  className?: string
  label: string
  error?: FieldError | undefined
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Pick<FieldWrapperProps, 'label'>

export default function FieldWrapper(props: FieldWrapperProps) {
  const { className, children, error, label } = props

  return (
    <div className={clsx(className, styles['form__control'])}>
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
