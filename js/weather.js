const textWeather = document.querySelector(".weather");

const API_KEY = "dc3b90c2907c31b0cf5973f8bb2607c0"
const COORDS_LS = "coords";

function setWeatherLS(lat, lng) {
    const info = {
        lat,
        lng
    }

    localStorage.setItem(COORDS_LS, JSON.stringify(info));
}
function displayWeather(temp, city) {
    //API로부터 받은 기온, 도시명을 시계 위쪽에 표시한다.
    textWeather.innerHTML = `${temp}'C/${city}`
    textWeather.classList.remove("hide");
    textWeather.classList.add("show");
}
function getWeather(lat, lng) {
    //날씨정보를 받아 화면에 표시한다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const city = json.name;
        displayWeather(temp, city);
    });
}
function coordsFail() {
    //위치접근을 거부했을 경우
    alert('날씨를 불러오지 못했습니다.');

}
function coordsSuccess(info) {
    //위치접근을 허용했을 경우 
    const latitude = info.coords.latitude;
    const longitude = info.coords.longitude;

    console.log(latitude, longitude);

    setWeatherLS(latitude, longitude);
    getWeather(latitude, longitude);
}
function getCoords() {
    //사용자에게 위치를 요청한다.
    navigator.geolocation.getCurrentPosition(
        coordsSuccess, coordsFail);

}
function loadCoords() {
    //유저의 좌표를 가져온다.
    const coords = JSON.parse(localStorage.getItem(COORDS_LS));

    if (coords) {
        //좌표가 이미 존재할 경우
        getWeather(coords.lat, coords.lng);
    } else {
        getCoords();
    }
}
function init() {
    loadCoords();
}

init();