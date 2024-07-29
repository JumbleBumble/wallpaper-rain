# RainImages Component

A React component that displays a rain-like effect with images using `@react-spring/web`. The images can interact with the cursor, simulate gravity, and includes a force field and blackhole effect.

## Installation

npm install @react-spring/web lodash

## Usage
```ts
import React from 'react'
import RainImages from './RainWrapper'

const App = () => {
  return (
    <div>
      <RainImages 
        src="path/to/your/image.png" 
        numImages={100} 
        gravity={80} 
        forceFieldRadius={150} 
        friction={20} 
        mass={1.5} 
        maxVelocity={150} 
        sizeMultiplier={1.2} 
        forceMultiplier={15} 
        blackholeEffect={true} 
      >
        <YourContentHere />
      </RainImages>
    </div>
  )
}

export default App
```
## Props

### `src`
- **Type:** `string`
- **Description:** Source URL of the image.

### `children`
- **Type:** `ReactNode`
- **Optional:** Yes
- **Description:** Optional React nodes to be rendered inside the component.

### `numImages`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `50`
- **Description:** Number of images to be displayed.

### `gravity`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `60`
- **Description:** Gravity value to be applied to the images.

### `forceFieldRadius`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `100`
- **Description:** Radius for the force field effect.

### `friction`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `15`
- **Description:** Friction value to be applied to the images.

### `mass`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `1`
- **Description:** Mass value to be applied to the images.

### `maxVelocity`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `100`
- **Description:** Image max velocity.

### `sizeMultiplier`
- **Type:** `number`
- **Optional:** Yes
- **Description:** Image size multiplier.

### `forceMultiplier`
- **Type:** `number`
- **Optional:** Yes
- **Default:** `13.66`
- **Description:** Cursor force multiplier.

### `cursorInteract`
- **Type:** `boolean`
- **Optional:** Yes
- **Default:** `true`
- **Description:** Toggle cursor interaction.

### `blackholeEffect`
- **Type:** `boolean`
- **Optional:** Yes
- **Default:** `false`
- **Description:** Toggle blackhole effect.

