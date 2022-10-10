/* global kakao */

import React, { useRef, useState, useEffect, useMemo } from 'react'
import { baseballStadiums } from 'utils/stadiumData'

const { kakao } = window as any

declare global {
  interface Window {
    kakao: any
  }
}

interface IMap {
  mapLevel: number
  mapCenter: number[]
}

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
let isLoaded = false

const Map = ({ mapLevel, mapCenter }: IMap) => {
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
    if (kakaoMap === null) return // map이 세팅되기 전에는 리턴
    // const newMarkers = baseballStadiums.map((pos) => {
    //   return new kakao.maps.Marker({
    //     map: kakaoMap,
    //     clickable: true,
    //     title: pos.title,
    //     position: new kakao.maps.LatLng(...pos.latlng),
    //     image: new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(32, 37)),
    //   })
    // })

    baseballStadiums.forEach((po) => {
      const newMarkerss = new kakao.maps.Marker({
        map: kakaoMap,
        clickable: true,
        title: po.title,
        position: new kakao.maps.LatLng(...po.latlng),
        image: new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(32, 37)),
      })

      kakao.maps.event.addListener(newMarkerss, 'click', () => {
        console.log('hello')
      })
    })

    // kakaoMap.event.addListener(newMarkers, 'click', () => {
    //   console.log('hello')
    // })
  }, [kakaoMap])

  useEffect(() => {
    if (kakaoMap === null) return
    kakaoMap.setLevel(mapLevel, { anchor: new kakao.maps.LatLng(...mapCenter) })
  }, [kakaoMap, mapCenter, mapLevel])

  // const imageSize = new kakao.maps.Size(32, 37)
  //     const newMarker = new kakao.maps.Marker({
  //       map, // 마커를 표시할 지도
  //       clickable: true,
  //       position: stadium.latlng, // 마커를 표시할 위치
  //       title: stadium.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
  //       image: new kakao.maps.MarkerImage(imageSrc, imageSize), // 마커 이미지
  //     })

  return <div id='map' ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />
}

export default Map
