// Sélection des éléments
let inputField = document.getElementById('taskInput');
let addButton = document.getElementById('addBtn');
let todoListContainer = document.getElementById('to-do-list');

// Fonction pour ajouter une tâche
function addTask() {
    addButton.addEventListener("click", () => {
        const taskText = inputField.value.trim();

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        todoListContainer.appendChild(taskItem);

        // Ajout de la case à cocher
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskItem.appendChild(checkbox);
    });
};

// Fonction pour marquer une tâche comme terminée
function completedTask() {
   todoListContainer.addEventListener("change", () => {
        const checkboxes = todoListContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.parentElement.style.textDecoration = "line-through";
            } else {
                checkbox.parentElement.style.textDecoration = "none";
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

    deleteButton.addEventListener("click", () => {
        const taskItem = deleteButton.parentElement;

        if (taskItem) {
            todoListContainer.removeChild(taskItem);
        } else {
            console.error("Aucune tâche trouvée à supprimer.");
        }

        taskItem.appendChild(deleteButton);
    });
};

// Appel des fonctions
addTask();
completedTask();
deleteTask();