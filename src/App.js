import React, { useCallback } from 'react';

import Header from './components/Header';
import Hero from './components/Hero'
import Features from './components/Features';
import Editor from './components/Editor';

import GithubIcon from './images/github.svg'
import LinkedInIcon from './images/linkedin.svg'

import './App.css';

function App() {

	const openEditor = useCallback(() => {
		window.location.assign("#editor")
	}, [])

	return (
		<>
			<Header />
			<Hero openEditor={openEditor} />
			<Features />
			<Editor />
			<footer>
				<a href="https://github.com/Jaggler3" target="_blank"><img src={GithubIcon} /></a>
				<p>Made by Martin Darazs</p>
				<a href="https://www.linkedin.com/in/martindarazs" target="_blank"><img src={LinkedInIcon} /></a>
			</footer>
		</>
	);
}

export default App;
