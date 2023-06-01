import { create } from 'zustand'

export type PromptState = {
  subject: string
  details: string
  style: string
}

type Actions = {
  subjectSet: (subject: string) => void
  detailsSet: (details: string) => void
  styleSet: (style: string) => void
}

export const usePromptStore = create<PromptState & Actions>(set => ({
  subject: '',
  details: '',
  style: '',

  subjectSet: subject => set({ subject }),
  detailsSet: details => set({ details }),
  styleSet: style => set({ style }),
}))
