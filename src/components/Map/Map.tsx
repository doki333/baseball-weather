import { useRef, useState, useEffect } from 'react'

import { IPosTypes } from 'types/weather'
import { baseballStadiums } from 'utils/stadiumData'

const { kakao } = window as any

interface IMap {
  mapLevel: number
  mapCenter: number[]
  handleClickMarker: (pos: IPosTypes) => void
}

let isLoaded = false
const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'

const Map = ({ mapLevel, mapCenter, handleClickMarker }: IMap) => {
  const mapRef = useRef(null)
  const [kakaoMap, setKakaoMap] = useState<any>(null)

  useEffect(() => {
    // strictMode로 인해 map이 두번 생기는 것을 방지
    if (isLoaded === true) return

    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(36.11854456321755, 128.02188131960543),
      level: 13,
    })

    isLoaded = true

    map.setMaxLevel(13)
    setKakaoMap(map)
  }, [mapRef])

  useEffect(() => {
    if (kakaoMap === null) return

    baseballStadiums.map((po) => {
      const newMarkerss = new kakao.maps.Marker({
        map: kakaoMap,
        clickable: true,
        title: po.title,
        position: new kakao.maps.LatLng(...po.latlng),
        image: new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(32, 37)),
      })
      return kakao.maps.event.addListener(newMarkerss, 'click', () => {
        handleClickMarker(po)
      })
    })
  }, [handleClickMarker, kakaoMap])

  useEffect(() => {
    if (kakaoMap === null) return
    kakaoMap.setLevel(mapLevel)
    kakaoMap.setCenter(new kakao.maps.LatLng(...mapCenter))
  }, [kakaoMap, mapCenter, mapLevel])

  return <div id='map' ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />
}

export default Map
