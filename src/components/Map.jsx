import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Map = () => {
  const mapContainer = useRef(null);  
  const {kakao} = window;
  const position = new kakao.maps.LatLng(37.1723, 127.0585);
  const mapOptions = {
    center : position,  // 지도의 중심좌표 
    level : 8           // 지도의 확대 레벨
  };

  let markers = [];

  const theme = useTheme();                     // 필요시 활용 
  const colors = tokens(theme.palette.mode);    // 필요시 활용

  const [isOpen, setIsOpen] = useState(false);

  const test = 0;
  //===========================================================================================================================
  // 함수들 선언부
  //===========================================================================================================================



  useEffect(()=>{
    const map = new kakao.maps.Map(mapContainer.current, mapOptions);
    const marker = new kakao.maps.Marker({ position }); // 마커 생성

    if (test === 1)
    {
      //alert('이거 됩니까1');
      const content = `
      <div className="customoverlay">
        <span>포썸</span>
      </div>`;
      //alert('이거 됩니까2');
    
      // 커스텀 오버레이 생성
      new kakao.maps.CustomOverlay({
        map,
        position,
        content
      });
      //alert('이거 됩니까3');

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);
      //alert('이거 됩니까4');

    }
    else 
    {
      // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
      const setMarkers = (map) => {
        //console.log("markers.length:",markers.length, "map : ", map);
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }            
      }      
      const AddClickEventListener = (nIndex, customOverlay) => {
        var strGetElementById = "info_close_" + nIndex;
    
        //alert("전" + strGetElementById);
        document.getElementById(strGetElementById).addEventListener("click", function (event) {
          //alert(strGetElementById + "후");
          customOverlay.setMap(null);
        });
      }

      //alert('이거 됩니까2');
      const CreateContentsTag = (
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
        }


      //alert('이거 됩니까3');
      let i = 1; // 이런 경우 굳이 인덱스 일 필요(0으로 시작할 필요)가?
            
      // const drawMakerNCustomOverlay = () => {
      const arrFetch = [
        {
          "Name": "정복열",
          "FACLT_NM": "두산로지스틱스솔루션",
          "REFINE_ROADNM_ADDR": "경기도 용인시 수지구 수지로 112번길 10",
          "REFINE_LOTNO_ADDR": "(우) 16858",
        },
        {
          "Name": "홍길동",
          "FACLT_NM": "栗島國",
          "REFINE_ROADNM_ADDR": "제주특별자치도 제주시 첨단로 242",
          "REFINE_LOTNO_ADDR": "(우) 63309 (지번) 영평동 2181",
        },
      ];  

      //================================================================================================
      // 마커 동적 제거
      //================================================================================================
      setMarkers(null);
      //------------------------------------------------------------------------------------------------

      arrFetch.forEach(element => {
        var addr = element.REFINE_ROADNM_ADDR;

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addr, function(result, status) {
          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {
            let latitude = result[0].y;
            let longitude = result[0].x;

            //alert(' i: ' + i + '\n addr : ' + addr + '\n latitude : ' + latitude + '\n longitude : ' + longitude);
            const contents = CreateContentsTag(
              i,
              element.FACLT_NM,   // "카카오 스페이스닷원",
              "",//element.image,    // "https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/community/83cd8a98017a00001.png", //"https://cfile181.uf.daum.net/image/250649365602043421936D",
              element.REFINE_ROADNM_ADDR,     // "제주특별자치도 제주시 첨단로 242",
              element.REFINE_LOTNO_ADDR,    // "(우) 63309 (지번) 영평동 2181",
              "",//element.home,     // "https://www.kakaocorp.com/main",
              element.Name
            );
    
            //alert(contents);
            // 커스텀 오버레이가 표시될 위치입니다
            var pos = new kakao.maps.LatLng(latitude, longitude);
    
            // 지도에 마커를 표시합니다
            var myMarker = new kakao.maps.Marker({
              map: map,
              position: pos, //new kakao.maps.LatLng(latitude, longitude),
            });
    
            markers.push(myMarker);
    
            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
              content: contents,
              map: map,
              position: myMarker.getPosition()
            });
    
            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(myMarker, "click", function () {
              customOverlay.setMap(map);
            });
    
            //alert("Before 클릭이벤트 생성");

            // 닫는 동작 하기 위해서
            window.onload = () =>  {
              AddClickEventListener(i, customOverlay);
            }

            // 기본적으로 닫아놓고 마커만 표시해놓는다. 
            customOverlay.setMap(null);
            ++i;            
          }
        });
      });
    }
  }, isOpen);     // 빈배열을 넣으면 최초 한번만 실행 // 특정 항목을 넣으면 해당 항목 바뀔때 실행 // 안넣으면 랜더링 될때마다 실행
  //---------------------------------------------------------------------------------------------------------------------------

  return (
    <Box 
      id='map'
      ref={mapContainer}
      sx={{ width:'100%', height:'800px' }}
    >

    </Box>
  );
};

export default Map;