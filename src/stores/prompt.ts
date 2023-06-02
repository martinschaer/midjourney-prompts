import { create } from 'zustand'

export type PromptState = {
  subject: string
  details: string
  style: string
  params: string
  quality: string
}

type Actions = {
  subjectSet: (subject: string) => void
  detailsSet: (details: string) => void
  styleSet: (style: string) => void
  paramsSet: (params: string) => void
  qualitySet: (quality: string) => void
}

export const usePromptStore = create<PromptState & Actions>(set => ({
  subject: '',
  details: '',
  style: '',
  params: '',
  quality: '',

  subjectSet: subject => set({ subject }),
  detailsSet: details => set({ details }),
  styleSet: style => set({ style }),
  paramsSet: params => set({ params }),
  qualitySet: quality => set({ quality }),
}))
