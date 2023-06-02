import { useMemo } from 'react'
import PromptComponentInput from '../components/PromptComponentInput'
import { usePromptStore } from '../stores/prompt'

function App() {
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
        .join(', '),
    [subject, details, style, params, quality],
  )

  return (
    <div className="container mx-auto">
      <h1>Hello World</h1>
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
      <div>{prompt}</div>
    </div>
  )
}

export default App
