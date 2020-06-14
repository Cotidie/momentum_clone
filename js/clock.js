const display = document.querySelector(".time");

function timeToString(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`
}
function getTime() {
    const now = new Date();

    display.innerText = timeToString(now);
}
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();