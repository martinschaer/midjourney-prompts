function About() {
  return (
    <>
      <div className="card mx-auto my-10 max-w-prose">
        <h1>Midjourney Prompts Generator</h1>
        <h2>A systematic and growth-driven approach</h2>
        <p className="my-4">
          Save time and accelerate your process with this tool.
        </p>
        <p>
          Created by{' '}
          <a href="https://www.schaerweb.com" target="_self" rel="noreferrer">
            Martin Schaer
          </a>
        </p>
        <h3 className="my-4 font-bold">References:</h3>
        <ul>
          <li>
            <a
              href="https://bit.ly/Clarinet-Prompt-Troubleshooting"
              target="_blank"
              rel="noreferrer"
            >
              Clarinet Prompt Troubleshooting
            </a>
          </li>
        </ul>
      </div>
      <div className="card mx-auto my-10 max-w-prose">
        <div className="flex h-20 w-full">
          <div className="w-3/5 bg-gray-900"></div>
          <div className="w-[30%] bg-black"></div>
          <div className="w-[10%] bg-blue-500"></div>
        </div>
      </div>
    </>
  )
}

export default About
