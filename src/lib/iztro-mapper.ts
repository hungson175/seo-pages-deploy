/**
 * Convert form data to iztro parameters.
 */
export interface IztroParams {
  date: string
  timeIndex: number
  gender: 'male' | 'female'
}

export interface FormData {
  name?: string
  birth_date: string
  birth_time: string
  gender: 'nam' | 'nu'
}

export function mapFormToIztro(form: FormData): IztroParams {
  return {
    date: form.birth_date,
    timeIndex: parseInt(form.birth_time, 10),
    gender: form.gender === 'nam' ? 'male' : 'female',
  }
}
