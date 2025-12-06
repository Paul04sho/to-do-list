// Sélection des éléments
const inputField = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const todoListContainer = document.getElementById('to-do-list');
const alertElement = document.querySelector('.alert-text');

const key = 'tasks';
let todos = [];

// Fonction pour ajouter une tâche
function addTask() {
    addButton.addEventListener("click", () => {
        const taskText = inputField.value.trim();

        if (taskText === '') {
            alertElement.style.display = 'block';
            return;
        } else {
            alertElement.style.display = 'none';
        }

        // Créer un objet tâche et l'ajouter au tableau
        const newTask = {
            text: taskText,
            completed: false
        };

        todos.push(newTask);
        saveTasks();
        createTaskElement(newTask.text, newTask.completed);

        // Vider le champ de saisie après l'ajout
        inputField.value = '';

    });
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
};

// Fonction pour supprimer des tâches
function deleteTask() {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn'; // Pour le style
    const icon = document.createElement('i');
    icon.className = 'fas fa-trash-alt'; // Classe FontAwesome pour l'icône de la corbeille
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
};

// Fonction pour charger les tâches depuis le localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem(key);

    if (storedTasks) {
        todos = JSON.parse(storedTasks);
        todos.forEach(task => createTaskElement(task.text, task.completed));
    }
    console.log(todos);
}

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasks() {
    localStorage.setItem(key, JSON.stringify(todos));
    console.log(todos);
}

function createTaskElement(text, completed = false) {
    const taskItem = document.createElement('li');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);

    // Ajout de la case à cocher
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    taskItem.appendChild(checkbox);

    if (completed) {
        taskItem.classList.add('completed');
    }

    // Ajout du bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn';
    const icon = document.createElement('i');
    icon.className = 'fas fa-trash-alt';
    deleteButton.appendChild(icon);
    taskItem.appendChild(deleteButton);

    checkbox.addEventListener("change", () => {
        taskItem.classList.toggle("completed");
        const index = [...todoListContainer.children].indexOf(taskItem);
        todos[index].completed = checkbox.checked;
        saveTasks();
    });

    deleteButton.addEventListener("click", () => {
        const index = [...todoListContainer.children].indexOf(taskItem);
        todos.splice(index, 1);
        taskItem.remove();
        saveTasks();
    });

    todoListContainer.appendChild(taskItem);
}


// Appel des fonctions
addTask();
loadTasks();
