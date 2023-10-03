document.addEventListener("DOMContentLoaded", function () {
    // Variables for elements and tasks
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text ${task.completed ? "complete" : ""}">${task.text}</span>
                <button class="delete-task" data-index="${index}">X</button>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener to add a new task
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    // Event delegation for deleting tasks
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-task")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Event delegation for marking tasks as complete
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("task-text")) {
            const index = e.target.parentElement.querySelector(".delete-task").getAttribute("data-index");
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});
