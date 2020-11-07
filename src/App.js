import React, { useCallback } from 'react';

import Header from './components/Header';
import Hero from './components/Hero'
import Features from './components/Features';
import Editor from './components/Editor';

import './App.css';

function App() {

	const openEditor = useCallback(() => {
		window.location.assign("#editor")
	}, [])


	const openTutorial = useCallback(() => {
		window.location.assign("/tutorial")
	}, [])

	return (
		<>
			<Header />
			<Hero openEditor={openEditor} openTutorial={openTutorial} />
			<Features />
			<Editor />
		</>
	);
}

export default App;
