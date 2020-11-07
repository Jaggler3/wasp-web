import React from 'react'

import '../styles/Header.css'
import logo from '../images/icon.png';

const Header = () => (
	<header>
		<img id="logo" src={logo} />
		<p>WASP</p>
	</header>
)

export default Header
