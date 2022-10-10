import React, { MouseEvent, SetStateAction, Dispatch } from 'react'
import { cx } from 'styles'
import { baseballStadiums } from 'utils/stadiumData'
import styles from './weather.module.scss'

interface IWeatherBtns {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
  isClicked: boolean
  setIsClicked: Dispatch<SetStateAction<boolean>>
  region: string
}

const WeatherBtns = ({ handleClick, isClicked, setIsClicked, region }: IWeatherBtns) => {
  const handleClickSelector = () => {
    setIsClicked((prev) => !prev)
  }
  return (
    <div className={styles.btnsWrapper}>
      <button
        className={cx(styles.selectorBtn, { [styles.isVisible]: isClicked })}
        type='button'
        onClick={handleClickSelector}
      >
        ⚾지역
      </button>
      {isClicked && (
        <ul className={styles.btnList}>
          {baseballStadiums.map((lists) => (
            <li key={lists.region}>
              <button
                type='button'
                onClick={handleClick}
                className={cx(styles.listBtn, { [styles.isHere]: region === lists.region })}
                data-reig={lists.region}
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

// className={cx(styles.listBtn, { [styles.isHere]: newRegion === lists.region })}
