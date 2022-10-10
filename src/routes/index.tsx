import { useRef, MouseEvent, useState, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'

import Map from 'components/Map/Map'
import DataTable from './DataTable/DataTable'
import WeatherBtns from './WeatherBtns/WeatherBtns'

import dfsXyConv from 'utils/dfsXyConv'
import { getData } from 'utils/getData'

import styles from './index.module.scss'

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'

const { kakao } = window as any

const App = () => {
  const [location, setLocation] = useState<[] | number[]>([])
  const [mapCenter, setMapCenter] = useState<number[]>([36.11854456321755, 128.02188131960543])
  const [mapLevel, setMapLevel] = useState(13)
  const [isVisible, setIsVisible] = useState(false)

  const { data } = useQuery(['weather', location], () => getData(location), {
    enabled: location.length !== 0,
    suspense: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { latitude, longitude } = e.currentTarget.dataset
    const { x, y } = dfsXyConv(Number(latitude), Number(longitude))

    if (x && y) {
      setLocation([x, y])
    }

    setIsVisible((prev) => !prev)

    if (latitude && longitude) {
      setMapLevel(2)
      setMapCenter([Number(latitude), Number(longitude)])
    }
  }

  const handleWeatherClick = () => {
    window.open('https://www.weather.go.kr/w/weather/forecast/short-term.do')
  }

  return (
    <div className={styles.appWrapper}>
      <Map mapLevel={mapLevel} mapCenter={mapCenter} />
      <button type='button' className={styles.goBtn} onClick={handleWeatherClick}>
        🌐
      </button>
      <WeatherBtns handleClick={handleClick} isClicked={isVisible} setIsClicked={setIsVisible} />
      {data && <DataTable data={data} />}
    </div>
  )
}

export default App
