import axios from 'axios'
import dayjs from 'dayjs'
import { IObj1Types, IResultTypes } from 'types/weather'

const TODAY = dayjs(new Date()).format('YYYYMMDD')

function getFilteredData(arr: IResultTypes[], keyword: string) {
  const value = arr.filter((m: any) => m.category === keyword)[0].fcstValue
  if (keyword === 'SKY' || keyword === 'PTY') {
    const keywordValue: IObj1Types = {
      SKY: { 1: '맑음', 3: '구름많음', 4: '흐림' },
      PTY: { 0: '-', 1: '비', 2: '비/눈', 3: '눈', 5: '빗방울', 6: '빗방울눈날림', 7: '눈날림' },
    }[keyword]

    return keywordValue[value]
  }
  return value
}

export async function getData(numArr: number[]) {
  const [x, y] = numArr
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
  // const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`

  const NOW_HOUR = dayjs(new Date()).format('HH')
  const NOW_MINUTE = dayjs(new Date()).format('mm')
  let baseTime = `${NOW_HOUR}30`

  if (Number(NOW_MINUTE) < 30) {
    const NEW_HOUR = dayjs(new Date()).subtract(1, 'h').format('HH')
    baseTime = `${NEW_HOUR}30`
  }

  try {
    const res = await axios.get(`${PROXY}`, {
      params: {
        serviceKey: `${process.env.REACT_APP_WEATHER_KEY}`,
        numOfRows: 60,
        pageNo: 1,
        dataType: 'JSON',
        base_date: TODAY,
        base_time: baseTime,
        nx: x,
        ny: y,
      },
    })
    const itemArr = res.data.response.body.items.item
    const timelines = itemArr.slice(0, 6).map((uData: IResultTypes) => uData.fcstTime)
    return timelines.map((r: string) => {
      const filtered = itemArr.filter((d: IResultTypes) => d.fcstTime === r)
      const NEW_TIMEZONE = filtered[0].fcstTime.substring(0, 2)

      return {
        baseDate: filtered[0].baseDate,
        baseTime: filtered[0].baseTime,
        fcstDate: filtered[0].fcstDate,
        fcstTime: `${NEW_TIMEZONE}시`,
        T1H: `${getFilteredData(filtered, 'T1H')}°C`, // 기온
        RN1: getFilteredData(filtered, 'RN1'), // 1시간 강수량
        SKY: getFilteredData(filtered, 'SKY'), // 하늘 상태
        REH: `${getFilteredData(filtered, 'REH')}%`, // 습도
        PTY: getFilteredData(filtered, 'PTY'), // 강수형태
      }
    })
  } catch (error) {
    throw new Error('오류가 발생했습니다')
  }
}
