import { useCallback, useEffect, useMemo, useState } from 'react'

import PromptComponentInput from '../components/PromptComponentInput'
import PromptComponentSelect from '../components/PromptComponentSelect'
import PromptComponentFlags from '../components/PromptComponentFlags'

import { useCollectionStore } from '../stores/collection'
import { buildPrompt, usePromptStore } from '../stores/prompt'

function App() {
  const [clipboardNotice, clipboardNoticeSet] = useState<string | null>(null)

  const savePrompt = useCollectionStore(state => state.addPrompt)

  const subject = usePromptStore(state => state.subject)
  const details = usePromptStore(state => state.details)
  const style = usePromptStore(state => state.style)
  const aspectRatio = usePromptStore(state => state.aspectRatio)
  const options = usePromptStore(state => state.options)
  const optionStyle = usePromptStore(state => state.optionStyle)
  const quality = usePromptStore(state => state.quality)

  const subjectSet = usePromptStore(state => state.subjectSet)
  const detailsSet = usePromptStore(state => state.detailsSet)
  const styleSet = usePromptStore(state => state.styleSet)
  const aspectRatioSet = usePromptStore(state => state.aspectRatioSet)
  const optionsSet = usePromptStore(state => state.optionsSet)
  const optionStyleSet = usePromptStore(state => state.optionStyleSet)
  const qualitySet = usePromptStore(state => state.qualitySet)

  const prompt = useMemo(() => {
    return buildPrompt({
      subject,
      details,
      style,
      aspectRatio,
      optionStyle,
      options,
      quality,
    })
  }, [subject, details, style, aspectRatio, optionStyle, options, quality])

  const handleSaveCopyPrompt = useCallback(() => {
    savePrompt({
      aspectRatio,
      details,
      optionStyle,
      options,
      quality,
      style,
      subject,
    })
    navigator.clipboard.writeText(prompt).then(
      () => {
        clipboardNoticeSet('copied!')
      },
      () => {
        clipboardNoticeSet("couldn't copy")
      },
    )
  }, [
    aspectRatio,
    details,
    optionStyle,
    options,
    prompt,
    quality,
    savePrompt,
    style,
    subject,
  ])

  useEffect(() => {
    clipboardNoticeSet(null)
  }, [prompt])

  return (
    <>
      <div className="container mx-auto flex flex-col gap-8 pb-80">
        <div className="card mt-8 flex flex-wrap justify-between gap-8">
          <PromptComponentInput
            className="flex-grow"
            helpText="Examples: a botanical-bearded fairy prince, flowing hair, sky-eyes, symmetrical mossy antlers, intensely sad gaze, wearing a floral diadem"
            label="Subject"
            value={subject}
            onChange={subjectSet}
          />
          <PromptComponentInput
            className="flex-grow"
            helpText="Examples: magical details, twilight atmosphere"
            label="Details & Surroundings"
            value={details}
            onChange={detailsSet}
          />
          <PromptComponentInput
            className="flex-grow"
            label="Stylizations, Media Type, Artists"
            helpText="Examples: in the style of ArtGerm, Alyssa Monks, Studio Ghibli, close-up, glamour shot"
            value={style}
            onChange={styleSet}
          />
          <PromptComponentSelect
            className="flex-grow"
            label="Aspect Ratio"
            value={aspectRatio}
            onChange={aspectRatioSet}
            options={[
              { label: '1:1', value: '' },
              { label: '16:9', value: '--ar 16:9' },
              { label: '4:3', value: '--ar 4:3' },
              { label: '9:16', value: '--ar 9:16' },
            ]}
          />
          <PromptComponentSelect
            className="flex-grow"
            label="Style"
            value={optionStyle}
            onChange={optionStyleSet}
            options={[
              { label: '250', value: '--s 250' },
              { label: '500', value: '--s 500' },
              { label: '750', value: '--s 750' },
              { label: '1000', value: '--s 1000' },
            ]}
          />
          <PromptComponentSelect
            label="Quality"
            value={quality}
            onChange={qualitySet}
            options={[
              { label: 'high', value: '' },
              { label: 'med', value: '--q 0.5 --stop 80' },
              { label: 'low', value: '--q 0.25 --stop 50' },
            ]}
          />
          <PromptComponentFlags
            className="flex-grow"
            label="Options"
            value={options}
            onChange={optionsSet}
            options={[{ label: 'Tile Pattern', value: '--tile' }]}
          />
        </div>
      </div>
      <div className="card fixed bottom-0 left-0 flex w-screen items-center gap-4 backdrop-blur">
        <span className="absolute left-9 top-1">/imagine</span>
        <span className="rounded bg-black px-4 py-2 text-3xl text-white">
          {prompt}
        </span>
        <div className="relative ml-auto">
          <span
            className={clipboardNotice ? 'tooltip right-10 top-4' : 'hidden'}
            role="tooltip"
          >
            {clipboardNotice}
          </span>
          <button
            className="button button--cta h-20 w-20"
            onClick={handleSaveCopyPrompt}
            disabled={!prompt}
          >
            Save & Copy
          </button>
        </div>
      </div>
    </>
  )
}

export default App
