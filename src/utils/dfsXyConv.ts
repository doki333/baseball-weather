import { IWeatherTypes } from 'types/weather'

const RE = 6371.00877
const GRID = 5.0 /* 격자간격 [ km ] */
const SLAT1 = 30.0 /* 표준위도 [degree] */
const SLAT2 = 60.0 /* 표준위도 [degree] */
const OLON = 126.0 /* 기준점의 경도 [degree] */
const OLAT = 38.0 /* 기준점의 위도 [degree] */
const XO = 210 / GRID /* 기준점의 X좌표 [격자거리] */
const YO = 675 / GRID /* 기준점의 Y좌표 [격자거리] */

export default function dfsXyConv(v1: number, v2: number) {
  // 출처: https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=javaking75&logNo=220089575454 에서 제가 필요한 부분만 따서 변형했습니다
  const DEGRAD = Math.PI / 180.0

  const re = RE / GRID
  const slat1 = SLAT1 * DEGRAD
  const slat2 = SLAT2 * DEGRAD
  const olon = OLON * DEGRAD
  const olat = OLAT * DEGRAD

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sf = (sf ** sn * Math.cos(slat1)) / sn

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
  ro = (re * sf) / ro ** sn

  const rs = {} as IWeatherTypes

  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5)
  ra = (re * sf) / ra ** sn

  let theta = v2 * DEGRAD - olon

  if (theta > Math.PI) theta -= 2.0 * Math.PI
  if (theta < -Math.PI) theta += 2.0 * Math.PI
  theta *= sn

  rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5)
  rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)

  return rs
}
