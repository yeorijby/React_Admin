import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "./components/useKakaoLoader"
import { useState } from "react"
import React from "react"

export default function BasicMap() {
  useKakaoLoader()
  const [bounds, setBounds] = useState<{
    sw: string
    ne: string
  }>()

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3} // 지도의 확대 레벨
        onBoundsChanged={(map) => {
          const bounds = map.getBounds()
          setBounds({
            sw: bounds.getSouthWest().toString(),
            ne: bounds.getNorthEast().toString(),
          })
        }}
      />
      <p>
        <em>지도 영역이 변경되면 지도 정보가 표출됩니다</em>
      </p>
      <p id="result">
        {bounds && (
          <p>
            영역좌표는 남서쪽 위도, 경도는 {bounds.sw}이고 <br />
            북동쪽 위도, 경도는 {bounds.ne}입니다{" "}
          </p>
        )}
      </p>
    </>
  )
}


{/* 
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=920f04a92b0d4bff8ceccf191eede4a3&libraries=services"
></script> 
*/}

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };  

// // 지도를 생성합니다    
// var map = new kakao.maps.Map(mapContainer, mapOption); 

// // 주소-좌표 변환 객체를 생성합니다
// var geocoder = new kakao.maps.services.Geocoder();

// // 주소로 좌표를 검색합니다
// geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function(result, status) {

//     // 정상적으로 검색이 완료됐으면 
//      if (status === kakao.maps.services.Status.OK) {

//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 결과값으로 받은 위치를 마커로 표시합니다
//         var marker = new kakao.maps.Marker({
//             map: map,
//             position: coords
//         });

//         // 인포윈도우로 장소에 대한 설명을 표시합니다
//         var infowindow = new kakao.maps.InfoWindow({
//             content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
//         });
//         infowindow.open(map, marker);

//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//     } 
// });    
