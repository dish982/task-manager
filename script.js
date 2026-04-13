document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
});

function addTask() {

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const deadline = document.getElementById("taskDeadline").value;
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
        <div>
            <strong>${title}</strong> - ${description} (Deadline: ${deadline})
        </div>
        <button onclick="markCompleted(this)">Complete</button>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);

    // Reset the form fields
    document.getElementById("taskForm").reset();
}

function editTask(button) {

    const taskItem = button.parentElement;
    const title = prompt("Edit Task Title:", taskItem.querySelector("strong").textContent);
    const description = prompt("Edit Task Description:", taskItem.querySelector("div").textContent);
    const deadline = prompt("Edit Deadline:", taskItem.querySelector("div").textContent);

    taskItem.innerHTML = `
        <div>
            <strong>${title}</strong> - ${description} (Deadline: ${deadline})
        </div>

        <button onclick="markCompleted(this)">Complete</button>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

}function markCompleted(button) {

    const taskItem = button.parentElement;
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
        button.textContent = "Undo";
    } else {
        button.textContent = "Complete";
    }

}

function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
        tasks.push({
            title: item.querySelector("strong").textContent,
            description: item.querySelector("div").textContent,
            completed: item.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function deleteTask(button) {

    const taskItem = button.parentElement;
    taskItem.remove();

}