export enum EGameAxis {
  X = 'x',
  Y = 'y',
}

export enum EAxisRange {
  MIN = 0,
  MAX = 9,
}

export enum EGameStatus {
  CREATED = 'CREATED',
  MAP_CONFIG = 'MAP_CONFIG',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export enum EShipPosition {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export type TGame = {
  status: EGameStatus
  playerToMove: number | null
  moves: TMove[]
}

export type TMove = {
  playerId: number
  result: boolean
  x: string
  y: number
}

export type TStrike = {
  x: string
  y: number
}

export type TShip = {
  x: string
  y: number
  size: number
  direction: EShipPosition
}

export type TGamesListResponse = {
  total: number
  games: TGame[]
}
