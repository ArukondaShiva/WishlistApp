function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo = "";

let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo = todoInput.value;
    if(todo.length>0){
        todoList.push({
            todo,
            id : uuid(),
            isCompleted : false
        });
        renderTodoList(todoList);
        localStorage.setItem("todos",JSON.stringify(todoList)); 
        todoInput.value="";
    }
});


showTodos.addEventListener("click",(e)=>{
    // console.log("clicked");
    e.preventDefault();
    let key = e.target.dataset.key;
    // console.log(key);
    // console.log(e.target);
    let delTodokey = e.target.dataset.todokey;

    todoList = todoList.map(todo => todo.id === key ? {...todo,isCompleted: !todo.isCompleted} : todo);
    todoList = todoList.filter(todo =>todo.id !== delTodokey);
    
    renderTodoList(todoList);
    localStorage.setItem("todos",JSON.stringify(todoList));
    console.log(todoList);
});


function renderTodoList(todoList){
    console.log(todoList);
    showTodos.innerHTML = todoList.map(
      ({
         todo,
         id,
         isCompleted
       })=>
         `<div class=" todo relative">
            <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ? "checked" : ""}>
            <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted? "checked-todo" : ""}" data-key=${id}>${todo}</label>
            <button class="absolute right-0 button cursor">
               <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button>
         </div>`    

    );
}

renderTodoList(todoList);
