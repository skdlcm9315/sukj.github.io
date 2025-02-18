document.addEventListener("DOMContentLoaded", initMap);

let nearbyCarWashList = [
    { name: "강남 세차장", location: "서울특별시 강남구", lat: 37.4979, lng: 127.0276, available: true },
    { name: "서초 세차장", location: "서울특별시 서초구", lat: 37.4919, lng: 127.0076, available: false },
    { name: "송파 세차장", location: "서울특별시 송파구", lat: 37.5048, lng: 127.0546, available: true },
    { name: "은평 세차장", location: "서울특별시 은평구", lat: 37.6021, lng: 126.9299, available: true },
    { name: "마포 세차장", location: "서울특별시 마포구", lat: 37.5645, lng: 126.9087, available: false }
];

function initMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
        level: 5 // 지도 확대 수준
    };

    const map = new kakao.maps.Map(container, options);

    displayCarWashMarkers(nearbyCarWashList, map);
    updateRecommendedList(nearbyCarWashList);
}

function displayCarWashMarkers(carWashList, map) {
    carWashList.forEach(carWash => {
        const markerPosition = new kakao.maps.LatLng(carWash.lat, carWash.lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
            clickable: true
        });

        // 예약 가능 여부에 따라 배경색 설정
        const className = carWash.available ? 'available' : 'unavailable';
        const infoContent = `<div class="info-window ${className}" style="padding: 10px; border-radius: 5px;">
                                <strong>${carWash.name}</strong><br/>
                                위치: ${carWash.location}<br/>
                                예약 가능: <span style="color: ${carWash.available ? 'green' : 'red'}; font-weight: bold;">${carWash.available ? '가능' : '불가'}</span>
                             </div>`;
        const infowindow = new kakao.maps.InfoWindow({ content: infoContent });

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        kakao.maps.event.addListener(map, 'click', function () {
            infowindow.close();
        });
    });
}


function updateRecommendedList(carWashList) {
    const recommendedList = document.getElementById("recommended-list");
    recommendedList.innerHTML = '';
    carWashList.forEach(carWash => {
        const carWashCard = document.createElement("li");
        carWashCard.classList.add("recommend-item");
        carWashCard.innerHTML = `
            <div class="item-info">
                <h3>${carWash.name}</h3>
                <p>위치: ${carWash.location}</p>
            </div>
            <button class="reserve-button" style="background-color: ${carWash.available ? '#28a745' : '#dc3545'};">
                ${carWash.available ? '예약 가능' : '예약 불가'}
            </button>
        `;
        recommendedList.appendChild(carWashCard);
    });
}
