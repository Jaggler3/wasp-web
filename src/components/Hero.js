import React from 'react'

import '../styles/Hero.css'
import Button from './Button'

const HOWTO_LINK = "https://github.com/Jaggler3/wasp-web/blob/main/HOWTO.md"

const Hero = ({ openEditor, openTutorial }) => (
	<div id="hero">
		<p id="hero-title">An <span>easy to learn</span> code golf language<span id="caret">|</span></p>
		<p id="hero-subtitle">Built with JavaScript</p>
		<div>
			<Button onClick={openEditor}>
				<p>Open Editor</p>
			</Button>
			<Button id="cheatsheet" onClick={() => window.location.assign(HOWTO_LINK)}>
				<p>Cheatsheet</p>
			</Button>
		</div>
	</div>
)

export default Hero
