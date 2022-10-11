import { useRef, useState, useEffect, useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isVisible, mapCenter, mapLevel, transformedLocation, whereAmINow } from 'recoil/weather.atom'

import { IPosTypes } from 'types/weather'
import dfsXyConv from 'utils/dfsXyConv'
import { baseballStadiums } from 'utils/stadiumData'

const { kakao } = window as any

let isLoaded = false
const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'

const Map = () => {
  const setVisible = useSetRecoilState(isVisible)
  const setLocation = useSetRecoilState(transformedLocation)
  const setArea = useSetRecoilState(whereAmINow)

  const [center, setCenter] = useRecoilState(mapCenter)
  const [level, setLevel] = useRecoilState(mapLevel)

  const mapRef = useRef(null)
  const [kakaoMap, setKakaoMap] = useState<any>(null)

  const handleClickMarker = useCallback(
    (pos: IPosTypes) => {
      const { x, y } = dfsXyConv(Number(pos.lat), Number(pos.lng))
      if (x && y) {
        setLocation([x, y])
      }
      setVisible(false)
      setLevel(2)
      setCenter([Number(pos.lat), Number(pos.lng)])
      setArea(pos.region)
    },
    [setArea, setCenter, setLevel, setLocation, setVisible]
  )

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

    const forMarkers = [...baseballStadiums]

    forMarkers.forEach((po) => {
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
    kakaoMap.setLevel(level)
    kakaoMap.setCenter(new kakao.maps.LatLng(...center))
  }, [kakaoMap, center, level])

  return <div id='map' ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />
}

export default Map
