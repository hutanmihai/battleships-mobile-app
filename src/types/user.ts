export type TUser = {
  id: number
  email: string
}

export type TMeResponse = {
  user: TUser
  gamesLost: number
  gamesWon: number
  gamesPlayed: number
  currentlyGamesPlaying: number
}
