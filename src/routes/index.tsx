import { MouseEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Map from 'components/Map/Map'
import DataTable from './DataTable/DataTable'
import WeatherBtns from './WeatherBtns/WeatherBtns'

import dfsXyConv from 'utils/dfsXyConv'
import { getData } from 'utils/getData'
import { IPosTypes } from 'types/weather'

import styles from './index.module.scss'

const App = () => {
  const [location, setLocation] = useState<[] | number[]>([])
  const [mapCenter, setMapCenter] = useState<number[]>([36.11854456321755, 128.02188131960543])
  const [mapLevel, setMapLevel] = useState(13)
  const [isVisible, setIsVisible] = useState(false)
  const [region, setRegion] = useState('지역')

  const { data } = useQuery(['weather', location], () => getData(location), {
    enabled: location.length !== 0,
    suspense: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { latitude, longitude, reig } = e.currentTarget.dataset
    const { x, y } = dfsXyConv(Number(latitude), Number(longitude))

    if (x && y) {
      setLocation([x, y])
    }

    setIsVisible(false)

    if (latitude && longitude && reig) {
      setMapLevel(2)
      setMapCenter([Number(latitude), Number(longitude)])
      setRegion(reig)
    }
  }

  const handleClickMarker = (pos: IPosTypes) => {
    const { x, y } = dfsXyConv(Number(pos.lat), Number(pos.lng))
    if (x && y) {
      setLocation([x, y])
    }
    setIsVisible(false)
    setMapLevel(2)
    setMapCenter([Number(pos.lat), Number(pos.lng)])
    setRegion(pos.region)
  }

  const handleWeatherClick = () => {
    window.open('https://www.weather.go.kr/w/weather/forecast/short-term.do')
  }

  return (
    <div className={styles.appWrapper}>
      <Map mapLevel={mapLevel} mapCenter={mapCenter} handleClickMarker={handleClickMarker} />
      <button type='button' className={styles.goBtn} onClick={handleWeatherClick}>
        <span>🌐</span>
        기상청
      </button>
      <WeatherBtns handleClick={handleClick} region={region} isClicked={isVisible} setIsClicked={setIsVisible} />
      {data && <DataTable data={data} />}
    </div>
  )
}

export default App
