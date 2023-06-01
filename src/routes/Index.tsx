import { useMemo } from 'react'
import PromptComponentInput from '../components/PromptComponentInput'
import { usePromptStore } from '../stores/prompt'

function App() {
  const subject = usePromptStore(state => state.subject)
  const details = usePromptStore(state => state.details)
  const style = usePromptStore(state => state.style)

  const subjectSet = usePromptStore(state => state.subjectSet)
  const detailsSet = usePromptStore(state => state.detailsSet)
  const styleSet = usePromptStore(state => state.styleSet)

  const prompt = useMemo(
    () => [subject, details, style].filter(x => x.trim().length).join(', '),
    [subject, details, style],
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
      <div>{prompt}</div>
    </div>
  )
}

export default App
