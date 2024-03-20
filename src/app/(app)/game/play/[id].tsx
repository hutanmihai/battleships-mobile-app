import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import GridBox from '@/components/game/box'
import Grid from '@/components/game/grid'
import { useAuth } from '@/context/auth'
import { useGetGame, useStrike } from '@/hooks/game'
import { useGrid } from '@/hooks/useGrid'
import { TBox } from '@/types/game'

function PlayGameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { user } = useAuth()
  const userId = user?.id
  // @ts-ignore
  const { mutate: strike } = useStrike(id)
  const { grid: myGrid, updateGridBox: updateMyGridBox } = useGrid()
  const { grid: enemyGrid, updateGridBox: updateEnemyGridBox } = useGrid()

  const [isMyTurn, setIsMyTurn] = useState(false)

  // @ts-ignore
  const { data: game } = useGetGame(id, !isMyTurn)

  useEffect(() => {
    if (game) {
      if (game?.playerToMoveId === userId) {
        setIsMyTurn(true)
      }
      for (const ship of game?.shipsCoord) {
        updateMyGridBox([...myGrid], ship.x, ship.y, 'ship')
      }
    }
  }, [game])

  if (!game) {
    return null
  }

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid grid={myGrid} />
      {isMyTurn ? <Text>ATTACK!</Text> : <Text>WAIT FOR ENEMY</Text>}
      {enemyGrid.map((row: TBox[], rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, colIndex) => (
            <GridBox
              key={`${rowIndex}-${colIndex}`}
              status={cell}
              onPress={() => {
                strike({ x: String.fromCharCode(65 + colIndex), y: rowIndex + 1 })
              }}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

export default PlayGameScreen
