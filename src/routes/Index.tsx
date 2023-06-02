import { useCallback, useEffect, useMemo, useState } from 'react'
import PromptComponentInput from '../components/PromptComponentInput'
import { usePromptStore } from '../stores/prompt'

function App() {
  const [clipboardNotice, clipboardNoticeSet] = useState<string | null>(null)

  const subject = usePromptStore(state => state.subject)
  const details = usePromptStore(state => state.details)
  const style = usePromptStore(state => state.style)
  const params = usePromptStore(state => state.params)
  const quality = usePromptStore(state => state.quality)

  const subjectSet = usePromptStore(state => state.subjectSet)
  const detailsSet = usePromptStore(state => state.detailsSet)
  const styleSet = usePromptStore(state => state.styleSet)
  const paramsSet = usePromptStore(state => state.paramsSet)
  const qualitySet = usePromptStore(state => state.qualitySet)

  const prompt = useMemo(
    () =>
      [subject, details, style, params, quality]
        .filter(x => x.trim().length)
        .map(x => x.trim())
        .join(', '),
    [subject, details, style, params, quality],
  )

  const handleCopyPrompt = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(
      () => {
        clipboardNoticeSet('copied!')
      },
      () => {
        clipboardNoticeSet("couldn't copy")
      },
    )
  }, [prompt])

  useEffect(() => {
    clipboardNoticeSet(null)
  }, [prompt])

  return (
    <div className="container mx-auto">
      <h1>Hello World</h1>
      <div className="flex gap-4">
        <PromptComponentInput
          label="Subject"
          value={subject}
          handleChange={subjectSet}
        />
        <PromptComponentInput
          label="Details & Surroundings"
          value={details}
          handleChange={detailsSet}
        />
        <PromptComponentInput
          label="Style"
          value={style}
          handleChange={styleSet}
        />
        <PromptComponentInput
          label="Parameters"
          value={params}
          handleChange={paramsSet}
        />
        <PromptComponentInput
          label="Quality"
          value={quality}
          handleChange={qualitySet}
        />
      </div>
      <h2 className="mt-8">Prompt:</h2>
      <div className="relative rounded-lg bg-gray-50 p-4">
        <span className="mr-2">/imagine</span>
        <span className="rounded bg-black px-2 py-1 text-white">{prompt}</span>
        <span
          className={clipboardNotice ? 'tooltip right-7 top-3' : 'hidden'}
          role="tooltip"
        >
          {clipboardNotice}
        </span>
        <button
          className="button absolute right-2 top-2 h-10 w-10"
          onClick={handleCopyPrompt}
        >
          📋
        </button>
      </div>
    </div>
  )
}

export default App
