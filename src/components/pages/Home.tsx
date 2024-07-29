import mainLayout from '../hoc/mainLayout'

function Home() {	
	return (
		<>
			<div className='flex items-center justify-center mt-20'>
				<h2>Jumbles Template</h2>
			</div>
		</>
	)
}

export const WrappedHome = mainLayout(Home)

