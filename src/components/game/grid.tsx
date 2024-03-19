import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import GridBox from '@/components/game/box'
import { useSendMap } from '@/hooks/game'
import { EShipPosition, TBox, TShip } from '@/types/game'

type TStateHistory = {
  grid: TBox[][]
  shipsCoord: TShip[]
  shipsNum: {
    s: number
    m: number
    l: number
    xl: number
  }
  areAllShipsPlaced: {
    s: boolean
    m: boolean
    l: boolean
    xl: boolean
  }
}

export const ShipsLengthMap = {
  s: 2,
  m: 3,
  l: 4,
  xl: 6,
}

type TGameGridProps = {
  id: string
}

function GameGrid({ id }: TGameGridProps) {
  const [grid, setGrid] = useState<TBox[][]>(Array(10).fill(Array(10).fill('clear')))
  const [shipsCoord, setShipsCoord] = useState<TShip[]>([])
  const { mutate: sendMap } = useSendMap(id)
  const [stateHistory, setStateHistory] = useState<TStateHistory[]>([
    {
      grid: Array(10).fill(Array(10).fill('clear')),
      shipsCoord: [],
      shipsNum: {
        s: 4,
        m: 3,
        l: 2,
        xl: 1,
      },
      areAllShipsPlaced: {
        s: false,
        m: false,
        l: false,
        xl: false,
      },
    },
  ])

  const [shipsNum, setShipsNum] = useState({
    s: 4,
    m: 3,
    l: 2,
    xl: 1,
  })

  const [areAllShipsPlaced, setAreAllShipsPlaced] = useState({
    s: false,
    m: false,
    l: false,
    xl: false,
  })

  const [selectedShip, setSelectedShip] = useState<string | null>(null)
  const [selectedShipPosition, setSelectedShipPosition] = useState<EShipPosition>(
    EShipPosition.HORIZONTAL
  )

  useEffect(() => {
    if (shipsNum.s === 0) {
      setAreAllShipsPlaced((prev) => ({ ...prev, s: true }))
    }
    if (shipsNum.m === 0) {
      setAreAllShipsPlaced((prev) => ({ ...prev, m: true }))
    }
    if (shipsNum.l === 0) {
      setAreAllShipsPlaced((prev) => ({ ...prev, l: true }))
    }
    if (shipsNum.xl === 0) {
      setAreAllShipsPlaced((prev) => ({ ...prev, xl: true }))
    }
  }, [shipsNum])

  const handlePress = (rowIndex: number, colIndex: number) => {
    console.log(`Cell pressed at row ${rowIndex}, col ${colIndex}`)
    placeShipOnGrid(rowIndex, colIndex)
    // Placeholder for updating the grid based on the game logic
  }

  const placeShipOnGrid = (rowIndex: number, colIndex: number) => {
    if (!selectedShip || selectedShipPosition === null) return

    // @ts-ignore
    const shipLength = ShipsLengthMap[selectedShip]

    let isValidPlacement = true
    const newGrid = JSON.parse(JSON.stringify(grid)) // Deep copy to modify

    // Check if the ship can be placed
    for (let i = 0; i < shipLength; i++) {
      const currentRow = selectedShipPosition === EShipPosition.HORIZONTAL ? rowIndex : rowIndex + i
      const currentCol = selectedShipPosition === EShipPosition.HORIZONTAL ? colIndex + i : colIndex
      if (currentRow >= 10 || currentCol >= 10 || newGrid[currentRow][currentCol] !== 'clear') {
        isValidPlacement = false
        break
      }
    }

    // Place the ship if valid and mark the surrounding cells as 'not-allowed'
    if (isValidPlacement) {
      for (let i = 0; i < shipLength; i++) {
        const currentRow =
          selectedShipPosition === EShipPosition.HORIZONTAL ? rowIndex : rowIndex + i
        const currentCol =
          selectedShipPosition === EShipPosition.HORIZONTAL ? colIndex + i : colIndex

        newGrid[currentRow][currentCol] = 'ship' // Mark the ship's position

        // Mark the surrounding cells as 'not-allowed'
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              currentRow + x >= 0 &&
              currentRow + x < 10 &&
              currentCol + y >= 0 &&
              currentCol + y < 10
            ) {
              if (newGrid[currentRow + x][currentCol + y] === 'clear') {
                // Only mark 'clear' cells to avoid overwriting other ships
                newGrid[currentRow + x][currentCol + y] = 'not-allowed'
              }
            }
          }
        }
      }

      // Additional step to clean 'not-allowed' markings for the ship's cells
      for (let i = 0; i < shipLength; i++) {
        const currentRow =
          selectedShipPosition === EShipPosition.HORIZONTAL ? rowIndex : rowIndex + i
        const currentCol =
          selectedShipPosition === EShipPosition.HORIZONTAL ? colIndex + i : colIndex
        newGrid[currentRow][currentCol] = 'ship' // Re-mark the ship's position in case it was overwritten
      }

      setGrid(newGrid) // Update grid state
      setShipsCoord((prev) => [
        ...prev,
        {
          x: String.fromCharCode(65 + colIndex),
          y: rowIndex + 1,
          size: shipLength,
          direction: selectedShipPosition,
        },
      ]) // Add the ship's coordinates to the state

      console.log('Ships coord', shipsCoord)

      // decrement number of ships
      if (selectedShip === 's') {
        setShipsNum((prev) => ({ ...prev, s: prev.s - 1 }))
      } else if (selectedShip === 'm') {
        setShipsNum((prev) => ({ ...prev, m: prev.m - 1 }))
      } else if (selectedShip === 'l') {
        setShipsNum((prev) => ({ ...prev, l: prev.l - 1 }))
      } else if (selectedShip === 'xl') {
        setShipsNum((prev) => ({ ...prev, xl: prev.xl - 1 }))
      }

      setSelectedShip(null)

      setStateHistory((prev) => [
        ...prev,
        {
          grid: newGrid,
          shipsCoord: [...shipsCoord],
          shipsNum: { ...shipsNum },
          areAllShipsPlaced: { ...areAllShipsPlaced },
        },
      ])
    } else {
      console.log('Invalid placement')
    }
  }

  const handleRevert = () => {
    if (stateHistory.length > 1) {
      const lastState = stateHistory[stateHistory.length - 2]
      setGrid(lastState.grid)
      setShipsCoord(lastState.shipsCoord)
      setShipsNum(lastState.shipsNum)
      setAreAllShipsPlaced(lastState.areAllShipsPlaced)
      setStateHistory((prev) => prev.slice(0, prev.length - 1))
    }
  }

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      {grid.map((row: TBox[], rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, colIndex) => (
            <GridBox
              key={`${rowIndex}-${colIndex}`}
              status={cell}
              onPress={() => handlePress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
      <Pressable onPress={() => setSelectedShip('s')} disabled={areAllShipsPlaced.s}>
        <Text>S ships: {shipsNum.s}</Text>
      </Pressable>
      <Pressable onPress={() => setSelectedShip('m')} disabled={areAllShipsPlaced.m}>
        <Text>M ships: {shipsNum.m}</Text>
      </Pressable>
      <Pressable onPress={() => setSelectedShip('l')} disabled={areAllShipsPlaced.l}>
        <Text>L ships: {shipsNum.l}</Text>
      </Pressable>
      <Pressable onPress={() => setSelectedShip('xl')} disabled={areAllShipsPlaced.xl}>
        <Text>XL ships: {shipsNum.xl}</Text>
      </Pressable>

      <View>
        <Text>
          Selected ship: {selectedShip} {selectedShipPosition}
        </Text>
        <Pressable onPress={() => setSelectedShipPosition(EShipPosition.HORIZONTAL)}>
          <Text>Horizontal</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedShipPosition(EShipPosition.VERTICAL)}>
          <Text>Vertical</Text>
        </Pressable>
      </View>
      <Pressable onPress={handleRevert}>
        <Text>Revert</Text>
      </Pressable>
      {areAllShipsPlaced.s &&
        areAllShipsPlaced.m &&
        areAllShipsPlaced.l &&
        areAllShipsPlaced.xl && (
          <Pressable onPress={() => sendMap({ ships: shipsCoord })}>
            <Text>Send map</Text>
          </Pressable>
        )}
    </View>
  )
}

export default GameGrid
