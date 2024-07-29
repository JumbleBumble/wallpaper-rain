import { NavLink } from 'react-router-dom'

function Navbar() {
	return (
		<nav className="bg-gray-900 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<NavLink to="/" className="text-white text-lg font-semibold">
					ReaperWare
				</NavLink>
				<button className="block lg:hidden text-white focus:outline-none">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path>
					</svg>
				</button>
				<div className="hidden lg:flex lg:items-center lg:space-x-4">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							isActive
								? 'text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
								: 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/store"
						className={({ isActive }) =>
							isActive
								? 'text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
								: 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
						}
					>
						Store
					</NavLink>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
