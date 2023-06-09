import { create } from 'zustand'

export type PromptState = {
  subject: string
  details: string
  style: string
  aspectRatio: string
  options: string
  optionStyle: string
  quality: string
}

type Actions = {
  subjectSet: (subject: string) => void
  detailsSet: (details: string) => void
  styleSet: (style: string) => void
  aspectRatioSet: (aspectRatio: string) => void
  optionsSet: (options: string) => void
  optionStyleSet: (optionStyle: string) => void
  qualitySet: (quality: string) => void
}

export const buildPrompt = ({
  subject,
  details,
  style,
  aspectRatio,
  optionStyle,
  options,
  quality,
}: PromptState) => {
  const commaSeparated = [subject, details, style]
    .filter(x => x.trim().length)
    .map(x => x.trim())
    .join(', ')
  const spaceSeparated = [aspectRatio, optionStyle, options, quality]
    .map(x => x.trim())
    .join(' ')
  return commaSeparated + ' ' + spaceSeparated
}

export const usePromptStore = create<PromptState & Actions>(set => ({
  subject: '',
  details: '',
  style: '',
  aspectRatio: '',
  options: '',
  optionStyle: '',
  quality: '',

  subjectSet: subject => set({ subject }),
  detailsSet: details => set({ details }),
  styleSet: style => set({ style }),
  aspectRatioSet: aspectRatio => set({ aspectRatio }),
  optionsSet: options => set({ options }),
  optionStyleSet: optionStyle => set({ optionStyle }),
  qualitySet: quality => set({ quality }),
}))
