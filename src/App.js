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

	return (
		<>
			<Header />
			<Hero openEditor={openEditor} />
			<Features />
			<Editor />
		</>
	);
}

export default App;
