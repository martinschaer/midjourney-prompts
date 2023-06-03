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
    <>
      <div className="container mx-auto flex flex-col gap-8 pb-80">
        <div className="card mt-8 flex flex-wrap justify-between gap-8">
          <PromptComponentInput
            className="flex-grow"
            label="Subject"
            value={subject}
            onChange={subjectSet}
          />
          <PromptComponentInput
            className="flex-grow"
            label="Details & Surroundings"
            value={details}
            onChange={detailsSet}
          />
          <PromptComponentInput
            className="flex-grow"
            label="Style"
            value={style}
            onChange={styleSet}
          />
          <PromptComponentInput
            className="flex-grow"
            label="Parameters"
            value={params}
            onChange={paramsSet}
          />
          <PromptComponentInput
            label="Quality"
            value={quality}
            onChange={qualitySet}
          />
        </div>
      </div>
      <div className="card fixed bottom-0 left-0 flex w-screen items-center gap-4 backdrop-blur">
        <span className="mr-2">/imagine</span>
        <span className="rounded bg-black px-4 py-2 text-3xl text-white">
          {prompt}
        </span>
        <div className="relative ml-auto">
          <span
            className={clipboardNotice ? 'tooltip right-5 top-2' : 'hidden'}
            role="tooltip"
          >
            {clipboardNotice}
          </span>
          <button
            className="button button--cta h-20 w-20 text-xl"
            onClick={handleCopyPrompt}
          >
            📋
          </button>
        </div>
      </div>
    </>
  )
}

export default App
