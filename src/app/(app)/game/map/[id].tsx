import { useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import Grid from '@/components/game/grid'
import { useSendMap } from '@/hooks/game'
import { useGrid } from '@/hooks/useGrid'
import { palette } from '@/theme'
import { EShipPosition } from '@/types/game'

function MapConfigScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

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
  // @ts-ignore
  const { mutate: sendMap } = useSendMap(id)

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: palette.white }}>
      <Grid grid={grid} onPress={placeShipOnGrid} />
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

export default MapConfigScreen
