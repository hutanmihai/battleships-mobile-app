import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'

import { TBox } from '@/types/game'

type TGridBoxProps = {
  status: TBox
  onPress: () => void
}

const colorMap = {
  clear: 'white',
  ship: 'blue',
  destroyed: 'red',
  'not-allowed': 'gray',
}

// Getting screen width
const { width } = Dimensions.get('window')
// Calculate the box size, subtract a little if you need spacing between boxes
const BOX_SIZE = Math.floor(width / 11)

function GridBox({ status, onPress }: TGridBoxProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: BOX_SIZE,
        height: BOX_SIZE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorMap[status],
      }}
    />
  )
}

export default GridBox
