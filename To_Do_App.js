const tasks= [];

function saveTasks() {
    const tasksStr = tasks.map(task => task.querySelector('.name').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasksStr));
}



const taskListOne = document.querySelector("#task-list ul ");
console.log(taskListOne);

taskListOne.addEventListener("click", (event) => {
    console.log(event);
    let classname = event.target.className;
    console.log(classname);
    if(Object.is(classname, "delete")){
        let li= event.target.parentElement;
        taskListOne.removeChild(li)
        tasks.splice(tasks.indexOf(li), 1)
        saveTasks()
    }

})

const searchTask = document.forms["search-tasks"]
const listOfTasks= document.querySelectorAll("#task-list li .name")

searchTask.addEventListener("keyup", function (e){
    let inputText = e.target.value.toLowerCase()
    listOfTasks.forEach((task) => {
        let title = task.textContent.toLowerCase()
        let isInclude =title.includes(inputText)
        let parentNode = task.parentNode
        console.log(parentNode)
        if(isInclude){
            parentNode.style.display = "block"
        } else {
            parentNode.style.display = "none"
        }

    })

})



const addTask = document.forms["add-Task"]
console.log(addTask);
addTask.addEventListener("submit",  (e) =>{
    e.preventDefault()
    const inputValue = addTask.querySelector("input").value.toString() ;
    if(inputValue.trim().length > 0 && /\w/.test(inputValue[e])) {
        const LiTag = document.createElement("li");
        const spanOne = document.createElement("span");
        const spanTwo = document.createElement("span");
        const spanThree = document.createElement("input");

        spanThree.type = "checkbox";
        spanOne.classList = "name";
        spanTwo.classList = 'delete'

        LiTag.appendChild(spanThree)
        LiTag.appendChild(spanOne);
        LiTag.appendChild(spanTwo);

        spanOne.textContent = inputValue;
        spanTwo.textContent = "delete";
        taskListOne.appendChild(LiTag);
        tasks.push(LiTag)
        saveTasks()
        addTask.reset()
    }
});
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach(taskText => {
            const LiTag = document.createElement("li");
            const spanOne = document.createElement("span");
            const spanTwo = document.createElement("span");
            const spanThree = document.createElement("input");

            spanThree.type = "checkbox";
            spanOne.classList = "name";
            spanTwo.classList = 'delete'

            LiTag.appendChild(spanThree)
            LiTag.appendChild(spanOne);
            LiTag.appendChild(spanTwo);

            spanOne.textContent = taskText;
            spanTwo.textContent = "delete";
            taskListOne.appendChild(LiTag);
            tasks.push(LiTag)
        });
    }
}

loadTasks();
