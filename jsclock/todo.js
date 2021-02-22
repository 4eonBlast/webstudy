const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

// toDos 를 localStorage에 저장하기 위한 함수
// local storage에는 string만 저장됨(JSON 데이터를 저장할 수 없음.)


function deleteToDo(event){
    const btn = event.target; //event.target를 통해 parentNode(어떤 li의
    const li = btn.parentNode; //버튼이 눌렸는지 찾을수 있다. console.dir(event.target)을 이용해 parentNode 항목을 찾는다.
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(
        function filterFn(toDo){
            // array를 하나 만들고 함수가 true를 리턴하는 아이템을 만든다?
            return toDo.id != parseInt(li.id);
            // li의 id 와 삭제하려는 toDo의 idrk 다른것만 남겨두는.
        })
    toDos = cleanToDos;
    saveToDos();
    //filter 함수 -> toDos의 모든 배열에서 filter의 인자 함수에서 true를 반환하는 것만을(return 조건에 맞는것만) 리턴해준다
}


function saveToDos()
{
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    //json.stringify를 이용해 자바스크립트 object를 string 형식으로 바꿔서 저장한다.
}

function paintToDo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text; 
    li.appendChild(delBtn); // li >span,delbtn
    li.appendChild(span);   //father element 안에 넣는 함수 appendChild
    li.id = newId;
    toDoList.appendChild(li); // ul > 위에서 만든 li
    const toDoObj = {
        text : text,
        id : newId
    }; //todos array에 obj를 저장하기 위해
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    if(currentValue != "")
    {
        paintToDo(currentValue);
    }
    toDoInput.value = "";
}

function loadToDos()
{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null)
    {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            //forEach 내부에 함수를 정의해 각각의 toDo에 대해서 paintToDo가
            //되도록 할 수 있다.
            paintToDo(toDo.text);
        });
    }
}

function init()
{
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();