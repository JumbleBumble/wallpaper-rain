import './App.css'
import RainImages from './components/pages/RainWrapper'

function App() {
	return (
		<div className="bg-black">
			<RainImages
				src="https://media-public.canva.com/56DI4/MAFIJu56DI4/1/tl.png"
				gravity={29}
			>
				<div>Your content here</div>
			</RainImages>
		</div>
	)
}

export default App
