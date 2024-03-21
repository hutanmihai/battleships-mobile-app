import { useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import Grid from '@/components/game/grid'
import Button from '@/components/ui/button'
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
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: palette.white,
        height: '100%',
        marginTop: '10%',
      }}
    >
      <Grid grid={grid} onPress={placeShipOnGrid} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginVertical: 20,
        }}
      >
        <Pressable onPress={() => setSelectedShip('s')} disabled={areAllShipsPlaced.s}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: palette.blue,
              backgroundColor: palette.blue,
              width: 50,
              borderRadius: 100,
            }}
          >
            <Text style={{ color: palette.white }}>S</Text>
            <Text style={{ color: palette.white }}>{shipsNum.s}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setSelectedShip('m')} disabled={areAllShipsPlaced.m}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: palette.blue,
              backgroundColor: palette.blue,
              width: 50,
              borderRadius: 100,
            }}
          >
            <Text style={{ color: palette.white }}>M</Text>
            <Text style={{ color: palette.white }}>{shipsNum.m}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setSelectedShip('l')} disabled={areAllShipsPlaced.l}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: palette.blue,
              backgroundColor: palette.blue,
              width: 50,
              borderRadius: 100,
            }}
          >
            <Text style={{ color: palette.white }}>L</Text>
            <Text style={{ color: palette.white }}>{shipsNum.l}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setSelectedShip('l')} disabled={areAllShipsPlaced.xl}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: palette.blue,
              backgroundColor: palette.blue,
              width: 50,
              borderRadius: 100,
            }}
          >
            <Text style={{ color: palette.white }}>XL</Text>
            <Text style={{ color: palette.white }}>{shipsNum.xl}</Text>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          marginBottom: 20,
        }}
      >
        <Button
          onPress={() => setSelectedShipPosition(EShipPosition.HORIZONTAL)}
          title="Horizontal"
          style={{ width: 150 }}
        />
        <Button
          onPress={() => setSelectedShipPosition(EShipPosition.VERTICAL)}
          title="Vertical"
          style={{ width: 150 }}
        />
      </View>
      <Button title="Revert" onPress={handleRevert} style={{ width: 300 }} />
      {areAllShipsPlaced.s &&
        areAllShipsPlaced.m &&
        areAllShipsPlaced.l &&
        areAllShipsPlaced.xl && (
          <Button
            title="Send Map"
            onPress={() => sendMap({ ships: shipsCoord })}
            style={{ width: 300 }}
          />
        )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: palette.blue,
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          Selected Ship
        </Text>
        <Text>{selectedShip?.toUpperCase()}</Text>
        <Text>{selectedShipPosition}</Text>
      </View>
    </View>
  )
}

export default MapConfigScreen
