import React, { useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Map = () => {
  const mapContainer = useRef(null);
  const { kakao } = window;
  const position = new kakao.maps.LatLng(37.1723, 127.0585);
  const mapOptions = {
    center: position,
    level: 9,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, mapOptions);
    const markers = [];

    const setMarkers = (map) => {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    };
    
    const addClickEventListener = (index, customOverlay) => {
      const closeButtonId = `info_close_${index + 1}`;
    
      const addEventListenerWhenAvailable = () => {
        const closeButton = document.getElementById(closeButtonId);
    
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            customOverlay.setMap(null);
          });
        } else {
          console.log(`${closeButtonId} 엘리먼트를 찾을 수 없습니다. 재시도...`);
          setTimeout(addEventListenerWhenAvailable, 100, index, customOverlay); // 100ms 간격으로 재시도
        }
      };
    
      // 초기 실행
      addEventListenerWhenAvailable();
    };
    
    const createContentsTag = (
      No,
      PosName,
      img,
      DoRoMyung,
      JiBun,
      HomePage,
      members
    ) => {
      var content = `<div class="wrap">
        <div class="info">
            <div class="title">
                ${PosName} 
                <div class="close" id="info_close_${No}" title="닫기"></div> 
            </div> 
            <div class="body"> 
                <div class="img">
                    <img src="${img}" width="75" height="70">
                </div> 
                <div class="desc"> 
                    <div class="ellipsis">${DoRoMyung}</div> 
                    <div class="jibun ellipsis">${JiBun}</div> 
                    <div><a href="${HomePage}" target="_blank" class="link">홈페이지</a></div> 
                    <div class="mem">${members}</div> 
                </div> 
            </div> 
        </div>   
    </div>`;
      return content;
    };

    const arrFetch = [
      {
        "Name": "aaa",
        "FACLT_NM": "dls",
        "REFINE_ROADNM_ADDR": "경기도 용인시 수지구 수지로 112번길 10",
        "REFINE_LOTNO_ADDR": "(우) 16858",
      },
      {
        "Name": "bbb",
        "FACLT_NM": "栗島國",
        "REFINE_ROADNM_ADDR": "제주특별자치도 제주시 첨단로 242",
        "REFINE_LOTNO_ADDR": "(우) 63309 (지번) 영평동 2181",
      },
    ];

    setMarkers(null);

    arrFetch.forEach((element, index) => {
      var addr = element.REFINE_ROADNM_ADDR;
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(addr, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const latitude = result[0].y;
          const longitude = result[0].x;

          const contents = createContentsTag(
            index + 1,
            element.FACLT_NM,
            "",
            element.REFINE_ROADNM_ADDR,
            element.REFINE_LOTNO_ADDR,
            "",
            element.Name
          );

          const pos = new kakao.maps.LatLng(latitude, longitude);

          const myMarker = new kakao.maps.Marker({
            map: map,
            position: pos,
          });

          markers.push(myMarker);

          const customOverlay = new kakao.maps.CustomOverlay({
            content: contents,
            map: map,
            position: myMarker.getPosition(),
          });

          kakao.maps.event.addListener(myMarker, "click", function () {
            customOverlay.setMap(map);
          });

          // 닫는 동작 하기 위해서
          addClickEventListener(index, customOverlay);

          // 기본적으로 닫아놓고 마커만 표시해놓는다.
          customOverlay.setMap(null);
        }
      });
    });
  }, []);

  return (
    <Box
      id='map'
      ref={mapContainer}
      sx={{ width: '100%', height: '800px' }}
    />
  );
};

export default Map;
