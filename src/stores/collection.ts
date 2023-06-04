import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { PromptState } from './prompt'
import { miniId } from '../utils/mini-id'

export type CollectionState = {
  prompts: (PromptState & { id: string })[]
}

type Actions = {
  addPrompt: (prompt: PromptState) => void
  deletePrompt: (id: string) => void
}

export const useCollectionStore = create<CollectionState & Actions>()(
  persist(
    (set, get) => ({
      prompts: [],

      addPrompt: prompt =>
        set(state => ({
          prompts: [...state.prompts, { ...prompt, id: miniId(16) }],
        })),

      deletePrompt: id => {
        const index = get().prompts.findIndex(x => x.id === id)
        const promptsCopy = [...get().prompts]
        promptsCopy.splice(index, 1)
        set({ prompts: promptsCopy })
      },
    }),
    {
      name: 'collection',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ prompts: state.prompts }),
    },
  ),
)
