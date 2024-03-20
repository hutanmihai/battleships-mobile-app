import Toast from 'react-native-root-toast'

export enum EToastType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export const showNotification = (type: 'error' | 'success', message: string) => {
  let backgroundColor = '#06D6A0' // default to success green
  if (type === 'error') {
    backgroundColor = '#EF476F' // error red
  }

  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor,
    textColor: '#FCFCFC',
  })
}
