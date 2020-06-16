const todoInput = document.querySelector("#askTodo");
const todoUl = document.querySelector("#todoList");

const ITEMLIST_LS = "todo_list";
const IDCOUNT_LS = "todo_cnt";

let arrTodo = [];
let cntTodo = 0;

function getLS() {
    arrTodo = localStorage.getItem(ITEMLIST_LS);
    if (!arrTodo) arrTodo = [];
    else arrTodo = JSON.parse(arrTodo);
    cntTodo = Number(localStorage.getItem(IDCOUNT_LS));
}
function setLS(arr, cnt) {
    localStorage.setItem(ITEMLIST_LS, JSON.stringify(arrTodo));
    localStorage.setItem(IDCOUNT_LS, cntTodo);
}
function handleEnter(e) {
    //Enter키를 누를 시 paintTodo 실행
    const keyCode = e.keyCode;
    const text = todoInput.value;

    if (keyCode === 13 && text !== "") {
        const newInfo = {
            "id": cntTodo,
            "text": text
        }
        const newNode = createListItem(newInfo);

        //카운트와 항목정보 갱신
        getLS();
        cntTodo += 1;
        arrTodo.push(newInfo);

        //화면에 항목 추가
        todoUl.appendChild(newNode);

        //항목정보 LS에 반영
        setLS(arrTodo, cntTodo);

        //input박스 초기화
        todoInput.value = "";
    }
}
function handleRemove() {
    //List 항목 노드를 삭제하는 함수.
    const rmNode = this.parentNode;
    const rmID = rmNode.id;

    //먼저 화면에서 삭제한다.
    rmNode.style.opacity = "0";
    setTimeout(function() {todoUl.removeChild(rmNode)}, 500);

    //Local Storage에 반영한다.
    arrTodo = arrTodo.filter(function(todo) {
        return Number(todo.id) !== Number(rmID); 
    })
    setLS(arrTodo, cntTodo);
}   
function createListItem(info) {
    //List 항목 노드를 생성한다.
    const li = document.createElement("li");
    const delSpan = document.createElement("span");
    
    //삭제 버튼 추가
    delSpan.innerText = "X";
    delSpan.addEventListener("click", handleRemove);
    delSpan.classList.add("delBtn");
    li.innerText = info.text;
    li.id = info.id;
    li.appendChild(delSpan);
    li.style.animation = "fadeIn 0.7s";
    
    return li;
}
function loadTodo() {
    //LS로부터 리스트를 받아 표시한다.
    getLS();

    if (arrTodo) {
        for (let i=0; i<arrTodo.length; i++) {
            let li = createListItem(arrTodo[i]);
            todoUl.appendChild(li);
        }
    }
}
function init() {
    loadTodo();
    todoInput.addEventListener("keypress", handleEnter);
}

init();
