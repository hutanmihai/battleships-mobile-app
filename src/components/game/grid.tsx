import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import GridBox from '@/components/game/box'
import { useSendMap } from '@/hooks/game'
import { useGrid } from '@/hooks/useGrid'
import { EShipPosition, TBox, TShip } from '@/types/game'
import { generateEmptyGrid, mapShipSizeToLength } from '@/utils/grid'
import { showNotification } from '@/utils/toast'

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

type TGameGridProps = {
  id: string
}

function GameGrid({ id }: TGameGridProps) {
  const {
    grid,
    shipsCoord,
    shipsNum,
    areAllShipsPlaced,
    selectedShip,
    selectedShipPosition,
    setSelectedShip,
    setSelectedShipPosition,
    placeShipOnGrid,
    handleRevert,
  } = useGrid()
  const { mutate: sendMap } = useSendMap(id)

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      {grid.map((row: TBox[], rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, colIndex) => (
            <GridBox
              key={`${rowIndex}-${colIndex}`}
              status={cell}
              onPress={() => placeShipOnGrid(rowIndex, colIndex)}
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
