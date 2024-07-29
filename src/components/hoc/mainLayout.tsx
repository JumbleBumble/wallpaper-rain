import React from 'react'
//import Footer from '../ui/Footer'
import Navbar from '../ui/Navbar'

const mainLayout = (WrappedComponent: React.FC) => {
	return () => (
		<>
			<Navbar />
			<WrappedComponent />
		</>
	)
}

export default mainLayout
