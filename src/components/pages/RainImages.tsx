import React, { useEffect, useRef, useState } from 'react'
import { useSprings, animated, to } from '@react-spring/web'
import { throttle } from 'lodash'

const NUM_IMAGES = 140
const GRAVITY = 40
const FORCE_FIELD_RADIUS = 100
const FORCE_MULTIPLIER = 40
const FRICTION = 26

const getRandom = (min: number, max: number) =>
	Math.random() * (max - min) + min

const RainImages: React.FC = () => {
	const [mouse, setMouse] = useState({ x: 0, y: 0 })
	const containerRef = useRef<HTMLDivElement>(null)
	const yoffset = 20

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [springs, api] = useSprings(NUM_IMAGES, (_index: number) => ({
		from: {
			x: getRandom(0, window.innerWidth),
			y: getRandom(-window.innerHeight * yoffset, 0),
			scale: getRandom(0.5, 1),
			rotate: getRandom(0, 360),
		},
		to: { y: window.innerHeight + 100 },
		config: { mass: 1, tension: 170, friction: FRICTION },
	}))

	useEffect(() => {
		const handleMouseMove = throttle((event: MouseEvent) => {
			setMouse({ x: event.clientX, y: event.clientY })
		}, 50)

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	useEffect(() => {
		let animationFrameId: number | undefined

		const animate = () => {
			api.start((i) => {
				const spring = springs[i]
				const dx = spring.x.get() - mouse.x
				const dy = spring.y.get() - mouse.y
				const distance = Math.sqrt(dx * dx + dy * dy)

				let fx = 0,
					fy = 0
				if (distance < FORCE_FIELD_RADIUS) {
					const force =
						((FORCE_FIELD_RADIUS - distance) /
							FORCE_FIELD_RADIUS) *
						FORCE_MULTIPLIER
					fx = force * (dx / distance)
					fy = force * (dy / distance)
				}

				let newY = spring.y.get() + GRAVITY + fy
				let newX = spring.x.get() + fx
				let newOpacity = 1
				let friction = 26
				let mass = 1

				if (newY > window.innerHeight) {
					newOpacity = 0
				} else {
					newOpacity = 1
				}

				if (newY > window.innerHeight * 1.1) {
					newY = -window.innerHeight * 20
					newX = getRandom(0, window.innerWidth)
					friction = 0
					mass = 0.1
					newOpacity = 0
				} else if (newY < -window.innerHeight * yoffset) {
					newY = -window.innerHeight * yoffset
				} else if (newY < -window.innerHeight) {
					newOpacity = 0
				}
				return {
					y: newY,
					x: newX,
					opacity: newOpacity,
					config: {
						mass: mass,
						tension: 170,
						friction: friction,
					},
				}
			})

			animationFrameId = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			if (animationFrameId !== undefined) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [mouse, api, springs])

	return (
		<div
			ref={containerRef}
			style={{
				position: 'relative',
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			{springs.map((props, i) => (
				<animated.div
					key={i}
					style={{
						position: 'absolute',
						willChange: 'transform',
						transform: to(
							[props.x, props.y, props.scale, props.rotate],
							(x, y, scale, rotate) =>
								`translate3d(${x}px,${y}px,0) scale(${scale}) rotate(${rotate}deg)`
						),
						width: 50,
						height: 50,
						backgroundImage: 'url(https://via.placeholder.com/50)',
						backgroundSize: 'cover',
					}}
				/>
			))}
		</div>
	)
}

export default RainImages
