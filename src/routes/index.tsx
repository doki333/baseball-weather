import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import { transformedLocation } from 'recoil/weather.atom'

import Map from 'components/Map/Map'
import DataTable from './DataTable/DataTable'
import WeatherBtns from './WeatherBtns/WeatherBtns'

import { getData } from 'utils/getData'

import styles from './index.module.scss'

const App = () => {
  const location = useRecoilValue(transformedLocation)

  const { data } = useQuery(['weather', location], () => getData(location), {
    enabled: location.length !== 0,
    suspense: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  })

  const handleWeatherClick = () => {
    window.open('https://www.weather.go.kr/w/weather/forecast/short-term.do')
  }

  return (
    <div className={styles.appWrapper}>
      <Map />
      <button type='button' className={styles.goBtn} onClick={handleWeatherClick}>
        <span>🌐</span>
        기상청
      </button>
      <WeatherBtns />
      {data && <DataTable data={data} />}
    </div>
  )
}

export default App
