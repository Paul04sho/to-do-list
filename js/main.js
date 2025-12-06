// Sélection des éléments
const inputField = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const todoListContainer = document.getElementById('to-do-list');
const alertElement = document.querySelector('.alert-text');


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
};


// Appel des fonctions
addTask();
completedTask();
