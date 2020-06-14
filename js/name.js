const input = document.querySelector("#askName");
const greeting = document.querySelector("#greeting");

const USERNAME_LS = "user_name";

function handleKeyPress(e) {
    //Enter키를 누를 시 input을 숨기고 텍스트를 표시한다.
    const keyCode = e.keyCode;
    const userName = input.value;

    //Enter키를 누르면
    if (keyCode === 13 && userName !== "") {
        //Local Storage에 값을 전달한다.
        localStorage.setItem(USERNAME_LS, userName)
        //input을 숨기고 텍스트를 표시한다.
        getName();
    }
}
function getName() {
    //local storage에 값이 있는지 검사한다.
    const userName = localStorage.getItem(USERNAME_LS);
    
    //값이 존재할 때
    if (userName) {
        //input을 숨기고 greeting을 표시한다.
        input.classList.add("hide");

        greeting.innerText = `Hello, ${userName}!`;
        greeting.classList.remove("hide");
        greeting.classList.add("show");
    }
}
function init() {
    input.addEventListener("keypress", handleKeyPress);
    getName();
}

init();