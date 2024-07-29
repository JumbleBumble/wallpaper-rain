import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { useSprings, animated, to } from '@react-spring/web'
import { throttle } from 'lodash'

const getRandom = (min: number, max: number) =>
	Math.random() * (max - min) + min

/**
 * @interface RainImagesProps
 */
interface RainImagesProps {
	/** Source URL of the image. */
	src: string
	/** Optional React nodes to be rendered inside the component. */
	children?: ReactNode
	/** Optional number of images to be displayed. Defaults to 50 */
	numImages?: number
	/** Optional gravity value to be applied to the images. Defaults to 60 */
	gravity?: number
	/** Optional radius for the force field effect. Defaults to 100 */
	forceFieldRadius?: number
	/** Optional friction value to be applied to the images. Defaults to a minimum of 15. */
	friction?: number
	/** Optional mass value to be applied to the images. Defaults to a minimum of 1. */
	mass?: number
	/** Optional image max velocity. Defaults to 100 */
	maxVelocity?: number
	/** Optional image size multiplier */
	sizeMultiplier?: number
	/** Optional cursor force multiplier. Defaults to 13.66 */
	forceMultiplier?: number
	/** Optional boolean to toggle cursor interaction. Defaults to true */
	cursorInteract?: boolean
	/** Optional boolean to toggle blackhole effect. Defaults to false */
	blackholeEffect?: boolean
}

const RainImages: React.FC<RainImagesProps> = ({
	src,
	children,
	numImages = 50,
	gravity = 60,
	forceFieldRadius = 100,
	friction = 15,
	mass = 1,
	maxVelocity = 100,
	sizeMultiplier = 1,
	forceMultiplier = 13.66,
	cursorInteract = true,
	blackholeEffect = false,
}) => {
	const [mouse, setMouse] = useState({ x: 0, y: 0 })
	const containerRef = useRef<HTMLDivElement>(null)
	const yoffset = numImages / 4
	friction = Math.max(friction, 15)
	mass = Math.max(mass, 1)
	const yTo = window.innerHeight + 100

	const FORCE_MULTIPLIER = gravity * forceMultiplier

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [springs, api] = useSprings(numImages, (_index: number) => ({
		from: {
			x: getRandom(0, window.innerWidth),
			y: getRandom(-window.innerHeight * yoffset, 0),
			scale: getRandom(0.5, 1) * sizeMultiplier,
			rotate: getRandom(0, 360),
		},
		to: { y: yTo },
		config: { mass: mass, tension: 170, friction: friction },
	}))

	useEffect(() => {
		if (cursorInteract) {
			const handleMouseMove = throttle((event: MouseEvent) => {
				setMouse({ x: event.clientX, y: event.clientY })
			}, 50)

			window.addEventListener('mousemove', handleMouseMove)

			return () => {
				window.removeEventListener('mousemove', handleMouseMove)
			}
		}
	}, [cursorInteract])

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
				if (distance < forceFieldRadius) {
					let forceDirection = blackholeEffect ? -1 : 1
					forceDirection =
						gravity > 0 ? forceDirection : -forceDirection
					const force =
						((forceFieldRadius - distance) / forceFieldRadius) *
						FORCE_MULTIPLIER *
						forceDirection
					fx = force * (dx / distance)
					fy = force * (dy / distance)
				}

				fx = Math.min(maxVelocity, Math.max(-maxVelocity, fx))
				fy = Math.min(maxVelocity, Math.max(-maxVelocity, fy))

				let newY = spring.y.get() + gravity + fy
				let newX = spring.x.get() + fx
				let newOpacity = 1
				let newFriction = friction
				let newMass = mass

				if (newY > window.innerHeight) {
					newOpacity = 0
				} else {
					newOpacity = 1
				}

				if (gravity > 1) {
					if (newY > window.innerHeight * 1.1) {
						newY = -window.innerHeight * yoffset
						newX = getRandom(0, window.innerWidth)
						newFriction = 0
						newMass = 0.1
						newOpacity = 0
					} else if (newY < -window.innerHeight * yoffset) {
						newY = -window.innerHeight * yoffset
					} else if (newY < -window.innerHeight) {
						newOpacity = 0
					}
				} else {
					if (newY < -window.innerHeight) {
						newY = window.innerHeight * yoffset
						newX = getRandom(0, window.innerWidth)
						newFriction = 0
						newMass = 0.1
						newOpacity = 1
					} else if (newY > window.innerHeight * yoffset) {
						newY = window.innerHeight * yoffset
					} else if (newY > window.innerHeight) {
						newOpacity = 1
					}
				}

				return {
					y: newY,
					x: newX,
					opacity: newOpacity,
					config: {
						mass: newMass,
						tension: 170,
						friction: newFriction,
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
	}, [
		mouse,
		api,
		springs,
		yoffset,
		gravity,
		forceFieldRadius,
		FORCE_MULTIPLIER,
		friction,
		mass,
		blackholeEffect,
	])

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
						backgroundImage: `url(${src})`,
						backgroundSize: 'cover',
					}}
				/>
			))}
			{children}
		</div>
	)
}

export default RainImages
