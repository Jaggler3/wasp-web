import React, { useState, useRef } from 'react'

import Wasp from '../lib/Wasp'

import '../styles/Editor.css'

export default function Editor() {

	const outputRef = useRef(null)

	const [waspInstance, setWaspInstance] = useState(new Wasp({
		outstr: (text, newline) => {
			setOutput(previous => previous + text + (newline ? "\n" : ""))
			setTimeout(() => {
				outputRef.current.scrollTop = outputRef.current.scrollHeight
			}, 0)
		}
	}))

	const [code, setCode] = useState(";>@2|;>_0|;>_1|;>(?[>]$-[<]$+;>@5|[<<<]##@3|[>>>]$'[<<<]#?[>>>>]!!$;>_1|$'[<<<<<]!$;<;<[<<]##@2|/#)*$")
	const [artifacts, setArtifacts] = useState("10\n#")
	const [output, setOutput] = useState("")

	const run = () => {
		waspInstance.execute(code)
	}

	const updateArtifacts = (val) => {
		const list = val.split("\n")
		setArtifacts(val)
		waspInstance.artifacts = list
	}

	return (

		<div id="editor">
			<p>Editor</p>
			<div id="input">
				<div id="code">
					<p className="editor-subtitle">Code</p>
					<textarea
						spellCheck="false"
						className="editor-textarea"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					></textarea>
				</div>
				<div id="artifacts">
					<p className="editor-subtitle">Artifacts <span>(line-separated)</span></p>
					<textarea
						spellCheck="false"
						className="editor-textarea"
						value={artifacts}
						onChange={(e) => updateArtifacts(e.target.value)}
					></textarea>
				</div>
			</div>
			<div id="run-parent">
				<div id="run" onClick={run}>
					&#9654;
			</div>
			</div>
			<div id="output">
				<p className="editor-subtitle">Output</p>
				<div id="output-parent">
					<textarea
						disabled
						ref={outputRef}
						spellCheck="false"
						className="editor-textarea"
						id="output-content"
						value={output}
					></textarea>
				</div>
			</div>
		</div>
	)
}
