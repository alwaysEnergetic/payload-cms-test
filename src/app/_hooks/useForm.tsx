import { useActionState } from 'react'

export enum FormStatus {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
type FormState = {
  status: FormStatus
  error?: string
}

export const useForm = (
  onSubmit: (formdata: FormData) => Promise<true | string>,
  initialState: FormState = { status: FormStatus.INIT },
) => {
  const [state, submitAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const res = await onSubmit(formData)

      if (typeof res === 'string') {
        return {
          status: FormStatus.ERROR,
          error: res,
        }
      } else {
        return {
          status: FormStatus.SUCCESS,
        }
      }
    },
    initialState,
  )

  return { state, submitAction, isPending }
}
