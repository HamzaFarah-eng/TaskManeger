const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");

let tasks = [];

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        const task = { text: inputBox.value, checked: false };
        tasks.push(task);
        renderTasks();
        saveData();
    }
    inputBox.value = "";
}

function renderTasks() {
    listContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;
        li.addEventListener("dblclick", () => editTask(index));

        if (task.checked) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add('delete');
        span.onclick = function() {
            tasks.splice(index, 1);
            renderTasks();
            saveData();
        };

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null && newTask !== "") {
        tasks[index].text = newTask;
        renderTasks();
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const index = Array.from(listContainer.children).indexOf(e.target);
        tasks[index].checked = !tasks[index].checked;
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function searchTask() {
    const searchValue = searchBox.value.toLowerCase();
    const taskItems = listContainer.getElementsByTagName("li");

    Array.from(taskItems).forEach((taskItem, index) => {
        const taskText = tasks[index].text.toLowerCase();
        if (taskText.includes(searchValue)) {
            taskItem.style.display = "";
        } else {
            taskItem.style.display = "none";
        }
    });
}

loadData();

