import { MouseEvent } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isVisible, mapCenter, mapLevel, transformedLocation, whereAmINow } from 'recoil/weather.atom'

import { baseballStadiums } from 'utils/stadiumData'
import dfsXyConv from 'utils/dfsXyConv'

import { cx } from 'styles'
import styles from './weather.module.scss'

const WeatherBtns = () => {
  const [visible, setVisible] = useRecoilState(isVisible)
  const [area, setArea] = useRecoilState(whereAmINow)

  const setLocation = useSetRecoilState(transformedLocation)
  const setCenter = useSetRecoilState(mapCenter)
  const setLevel = useSetRecoilState(mapLevel)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { latitude, longitude, zone } = e.currentTarget.dataset
    const { x, y } = dfsXyConv(Number(latitude), Number(longitude))

    if (x && y) {
      setLocation([x, y])
    }

    setVisible(false)

    if (latitude && longitude && zone) {
      setLevel(2)
      setCenter([Number(latitude), Number(longitude)])
      setArea(zone)
    }
  }

  const handleClickSelector = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className={styles.btnsWrapper}>
      <button
        className={cx(styles.selectorBtn, { [styles.isVisible]: visible })}
        type='button'
        onClick={handleClickSelector}
      >
        ⚾지역
      </button>
      {visible && (
        <ul className={styles.btnList}>
          {baseballStadiums.map((lists) => (
            <li key={lists.region}>
              <button
                type='button'
                onClick={handleClick}
                className={cx(styles.listBtn, { [styles.isHere]: area === lists.region })}
                data-zone={lists.region}
                data-latitude={lists.lat}
                data-longitude={lists.lng}
              >
                {lists.region}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WeatherBtns
