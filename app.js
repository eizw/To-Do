const menu = document.getElementById("menu");
const body = document.querySelector("body");
var listBlur = 0.3;
var listUnblur = 1;

function disableLists() {
    var lists = document.getElementsByClassName('list');
    for (let list of lists) {
        list.style.opacity = listBlur;
        list.style.transform = "scale(0.993)";
    }
}

function selectList(self) {
    disableLists();
    self.style.opacity = listUnblur;
    self.style.transform = "scale(1.007)";
    self.setAttribute("id", "selected-list");
}

function deleteList(self) {
    let list = self.parentElement;
    list.remove();
}

function confirmDelete(self) {
    self.style.display = "none";
    let list = self.parentElement;
    list.lastChild.style.display = "flex";
}

// function flexText(self) {
//     let parent = document.querySelector('[]')
//     .style.height = "1px";
//     self.style.height = (20+self.scrollHeight)+"px";
// }

function firstMake() {
    let button = document.getElementById("make-list-btn");
    button.style.justifyContent = "center";
    button.style.fontFamily = "Times New Roman";
    button.innerHTML = "+"
    button.padding = "0px";
    button.style.width = "1em";
}

function noNewLine() {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
}

function makeList() {
    let list = document.createElement("div");
    list.classList.add("list");
    list.style.display = "none";
    //title
    let title = document.createElement("textarea");
    title.classList.add("list-title");
    title.placeholder = "Title";
    // todo
    let todo = document.createElement("div");
    todo.classList.add("list-todo");
    let todo_check = document.createElement("input");
    todo_check.type = "checkbox";
    let todo_todo = document.createElement("textarea");
    todo_todo.spellcheck = false;
    todo_todo.placeholder = "Press Enter to make a new To-Do";
    todo.append(todo_check, todo_todo);

    let deleteButton = document.createElement("div");
    deleteButton.classList.add("del-btn");
    let confirmButton = document.createElement("div");
    confirmButton.className = "con-btn";
    confirmButton.innerHTML = "Click again to delete";
    deleteButton.innerHTML = "DELETE";
    
    todo_todo.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let newtodo = document.createElement("div");
            newtodo.classList.add("list-todo");
            let todo_check = document.createElement("input");
            todo_check.type = "checkbox";
            let todoinput = event.target.value;
            let todo_todo = document.createElement("textarea");
            todo_todo.innerText = todoinput;
            newtodo.append(todo_check, todo_todo);
            list.insertBefore(newtodo, todo);
            event.target.value = "";
        }
    })
    list.append(title, todo, deleteButton, confirmButton);
    menu.prepend(list);
    list.style.display = "flex";
    title.select();
}

document.addEventListener('click', event => {
    var a = event.target;
    if (a.classList.contains("con-btn")) {
        deleteList(a);
    } else {
        if (a.classList.contains("del-btn")) {
            confirmDelete(a);
        } else {
            let deleteButton = document.getElementsByClassName("del-btn");
            for (let btn of deleteButton) {
                let confirmButton = btn.parentNode.lastChild
                if (confirmButton.style.display == "flex") {
                    btn.style.display = "flex";
                    confirmButton.style.display = "none";
                }
            }
            while (a) {
                if (a.classList.contains("list")) {
                    selectList(a);
                    break;
                } else {
                    disableLists();
                }
                a = a.parentNode;
            }
        }
    }
});