export interface IWeatherTypes {
  x?: number
  y?: number
}

export interface IResultTypes {
  baseDate: string
  baseTime: string
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

export interface IDataTypes {
  baseDate: string
  baseTime: string
  fcstDate: string
  fcstTime: string
  T1H: string
  RN1: string
  SKY: string
  REH: string
  PTY: string
  [key: string]: string
}

export interface IObj1Types {
  [key: string]: string
}

export interface ITableTypes {
  data: IDataTypes[]
}
