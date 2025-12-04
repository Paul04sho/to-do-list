// Sélection des éléments
const inputField = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const todoListContainer = document.getElementById('to-do-list');

// Fonction pour ajouter une tâche
function addTask() {
    addButton.addEventListener("click", () => {
        const taskText = inputField.value.trim();

        const taskItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan);

        todoListContainer.appendChild(taskItem);

        // Ajout de la case à cocher
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskItem.appendChild(checkbox);

        deleteTask(taskItem, todoListContainer);
        return taskItem;
    });
    saveTasksToLocalStorage();
};

// Fonction pour marquer une tâche comme terminée
function completedTask() {
   todoListContainer.addEventListener("change", () => {
        const checkboxes = todoListContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.parentElement.classList.add("completed");
            } else {
                checkbox.parentElement.classList.remove("completed");
            }
        });
   });
   saveTasksToLocalStorage();
};

// Fonction pour supprimer des tâches
function deleteTask() {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn'; // Pour le style
    const icon = document.createElement('i');
    icon.className = 'fa fa-trash'; // Classe FontAwesome pour l'icône de la corbeille
    deleteButton.appendChild(icon);
    const taskElement = todoListContainer.lastChild;

    deleteButton.addEventListener("click", () => {

        if (taskElement && todoListContainer) {
            todoListContainer.removeChild(taskElement);
        } else {
            console.error("Aucune tâche trouvée à supprimer.");
        }
    });
    taskElement.appendChild(deleteButton);
    saveTasksToLocalStorage();
};

// Sauvegarder toutes les tâches dans le localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const allTasks = todoListContainer.querySelectorAll('li');

    allTasks.forEach(task => {
        const text = task.querySelector('span')
        ? task.querySelector('span').textContent
        : task.firstChild.textContent;

        const isCompleted = task.classList.contains('completed');

        tasks.push({
            text: text,
            completed: isCompleted
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis le localStorage au démarrage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    tasks.forEach(task => {
        const taskItem = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task.text;
        taskItem.appendChild(span);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        taskItem.appendChild(checkbox);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteBtn';
        const icon = document.createElement('i');
        icon.className = 'fa fa-trash';
        deleteButton.appendChild(icon);
        taskItem.appendChild(deleteButton);

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskItem.classList.add("completed");
            } else {
                taskItem.classList.remove("completed");
            }
            saveTasksToLocalStorage();
        });

        deleteButton.addEventListener("click", () => {
            todoListContainer.removeChild(taskItem);
            saveTasksToLocalStorage();
        });

        todoListContainer.appendChild(taskItem);
    });
}


// Appel des fonctions
addTask();
completedTask();
loadTasksFromLocalStorage();