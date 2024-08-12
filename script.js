const taskDescInput = document.getElementById("task-desc");
const modalTask = document.getElementById("myModalTask");
const modalCategory = document.getElementById("myModalCategory");
const btnAddTask = document.getElementById("addtask");
const btnAddCategory = document.getElementById("add");
const spanClose = document.getElementsByClassName("close");
const btnAddNewCategory = document.getElementById("add-new-category-btn");
const btnAddNewTask = document.getElementById("add-new-task-btn");
const taskList = document.getElementById("tasks-list");
const categorySelection = document.getElementById("category-selection");
const categorySelectionTask = document.getElementById(
  "category-selection-task"
);
const categoriesList = document.getElementById("categories-list");
const clearCompleted = document.getElementById("clear-completed");
const tasksCountDisplay = document.getElementById("tasks-count");

const categories = ["Completed", "Urgent", "Important", "Later", "To study"];
const categoryColors = {
  Completed: "#4caf50",
  Urgent: "#ff5252",
  Important: "#ffc107",
  Later: "#9c27b0",
  "To study": "#25a7b8",
};

const colors = [
  "#FF6347",
  "#4682B4",
  "#32CD32",
  "#FFD700",
  "#6A5ACD",
  "#FF69B4",
  "#8A2BE2",
  "#00CED1",
  "#FF4500",
  "#DA70D6",
];

function getCategoryColor(category) {
  if (!categoryColors[category]) {
    categoryColors[category] =
      colors[Math.floor(Math.random() * colors.length)];
  }
  return categoryColors[category];
}

function populateAsideCategories() {
  categoriesList.innerHTML = "";
  categories.forEach((category, index) => {
    const categoryElement = document.createElement("p");
    categoryElement.className = "categories-options";
    categoryElement.id = `category-${index + 1}`;
    categoryElement.style.backgroundColor = getCategoryColor(category);
    categoryElement.innerText = category;
    categoriesList.appendChild(categoryElement);
  });
}

function populateTaskModalCategories() {
  categorySelectionTask.innerHTML = "";
  categories.forEach((category, index) => {
    const categoryElement = document.createElement("p");
    categoryElement.className = "categories-options";
    categoryElement.id = `category-task-${index + 1}`;
    categoryElement.style.backgroundColor = getCategoryColor(category);
    categoryElement.innerText = category;
    categorySelectionTask.appendChild(categoryElement);
  });
  // Add event listener to category selection in task modal
  document
    .querySelectorAll("#category-selection-task .categories-options")
    .forEach((item) => {
      item.addEventListener("click", (event) => {
        document
          .querySelectorAll("#category-selection-task .categories-options")
          .forEach((option) => {
            option.classList.remove("selected-category");
          });
        event.target.classList.add("selected-category");
      });
    });
}

function populateCategoryModalCategories() {
  categorySelection.innerHTML = "";
  categories.forEach((category, index) => {
    const categoryElement = document.createElement("p");
    categoryElement.className = "categories-options";
    categoryElement.id = `category-modal-${index + 1}`;
    categoryElement.style.backgroundColor = getCategoryColor(category);
    categoryElement.innerHTML = `${category} <i class="fa-solid fa-trash delete-btn" aria-hidden="true"></i>`;
    categorySelection.appendChild(categoryElement);
  });

  const deleteButtons = document.querySelectorAll(
    "#category-selection .delete-btn"
  );
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const categoryElement = event.target.closest(".categories-options");
      if (categoryElement) {
        const categoryName = categoryElement.textContent.trim();
        removeCategory(categoryName);
      }
    });
  });
}

function removeCategory(categoryName) {
  const index = categories.indexOf(categoryName);
  if (index !== -1) {
    categories.splice(index, 1);
  }

  updateCategoriesUI();
}

document
  .getElementById("add-new-category-btn")
  .addEventListener("click", () => {
    const newCategory = document.getElementById("new-category-input").value;
    if (newCategory && !categories.includes(newCategory)) {
      categories.push(newCategory);
      updateCategoriesUI();
    }
  });

function updateCategoriesUI() {
  populateAsideCategories();
  populateTaskModalCategories();
  populateCategoryModalCategories();
}

btnAddNewTask;

function addTaskToTaskList(description, category) {
  const taskElement = document.createElement("div");
  taskElement.className = "task-item";
  taskElement.style.borderLeft = `5px solid ${getCategoryColor(category)}`;
  taskElement.innerHTML = `
    <input type="checkbox" class="task-checkbox" />
    <label>${description}</label>
    <span class="task-category">${category}</span>
    <button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>
  `;
  taskList.appendChild(taskElement);
  updateTaskCount();
}

updateCategoriesUI();
function updateTaskCount() {
  const taskCount = taskList.children.length;
  tasksCountDisplay.textContent = `${taskCount} tasks`;
}
btnAddTask.onclick = function () {
  modalTask.style.display = "block";
};

btnAddCategory.onclick = function () {
  modalCategory.style.display = "block";
};

for (let i = 0; i < spanClose.length; i++) {
  spanClose[i].onclick = function () {
    modalTask.style.display = "none";
    modalCategory.style.display = "none";
    document.getElementById("task-desc").value = "";
    document.getElementById("errorMessage").innerText = "";
    document.getElementById("new-category-input").value = "";
    document
      .querySelectorAll("#category-selection-task .categories-options")
      .forEach((option) => {
        option.classList.remove("selected-category");
      });

    document
      .querySelectorAll("#category-selection .categories-options")
      .forEach((option) => {
        option.classList.remove("selected-category");
      });
  };
}

window.onclick = function (event) {
  if (event.target == modalTask) {
    modalTask.style.display = "none";
    document.getElementById("task-desc").value = "";
    document.getElementById("errorMessage").innerText = "";

    document
      .querySelectorAll("#category-selection-task .categories-options")
      .forEach((option) => {
        option.classList.remove("selected-category");
      });
  } else if (event.target == modalCategory) {
    modalCategory.style.display = "none";
    document.getElementById("new-category-input").value = "";
    document.getElementById("errorMessage").innerText = "";

    document
      .querySelectorAll("#category-selection .categories-options")
      .forEach((option) => {
        option.classList.remove("selected-category");
      });
  }
};

let selectedCategory = null;
categorySelection.addEventListener("click", function (e) {
  if (e.target.classList.contains("categories-options")) {
    const categories =
      categorySelection.getElementsByClassName("categories-options");
    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("selected-category");
    }
    e.target.classList.add("selected-category");
    selectedCategory = e.target.textContent;
  }
});
categorySelectionTask.addEventListener("click", function (e) {
  if (e.target.classList.contains("categories-options")) {
    const categories =
      categorySelectionTask.getElementsByClassName("categories-options");
    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("selected-category");
    }
    e.target.classList.add("selected-category");
    selectedCategory = e.target.textContent;
  }
});

btnAddNewTask.onclick = function () {
  const taskDesc = taskDescInput.value.trim();
  if (taskDesc && selectedCategory) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-bar");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.classList.add("task-label");
    label.textContent = taskDesc;
    taskItem.appendChild(label);

    const category = document.createElement("p");
    category.classList.add("categories-options");
    category.textContent = selectedCategory;
    category.style.backgroundColor = getCategoryColor(selectedCategory);
    taskItem.appendChild(category);

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "delete-btn");
    deleteBtn.onclick = function () {
      taskList.removeChild(taskItem);
      updateTaskCount();
    };
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    taskDescInput.value = "";
    selectedCategory = null;
    const categories =
      categorySelection.getElementsByClassName("categories-options");
    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("selected-category");
    }
    modalTask.style.display = "none";
    updateTaskCount();
  } else {
    document.getElementById("errorMessage").innerHTML =
      "You must add a description and select a Category";
  }
};
function removeErrorMessage() {
  if (taskDescInput.value.length > 0) {
    document.getElementById("errorMessage").innerHTML = "";
  }
}
taskDescInput.addEventListener("input", function () {
  removeErrorMessage();
});
clearCompleted.addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  if (checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      const taskBar = checkbox.closest(".task-bar");
      if (taskBar) {
        taskBar.remove();
        updateTaskCount();
      }
    });
  } else {
    alert("No completed tasks yet");
  }
});
updateTaskCount();

const categoryDeleteBtns = document.querySelectorAll(
  ".categories-section .delete-btn"
);
categoryDeleteBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const categoryItem = e.target.closest(".categories-options");
    categoryItem.remove();
    updateTaskModalCategories();
  });
});

function updateTaskModalCategories() {
  const taskModalCategories = document.querySelectorAll(
    "#category-selection .categories-options"
  );
  taskModalCategories.forEach(function (category) {});

  const categorySelection = document.getElementById("category-selection");
  const dynamicCategoriesItems =
    categorySelection.getElementsByClassName("categories-options");
  for (let i = 0; i < dynamicCategoriesItems.length; i++) {
    dynamicCategoriesItems[i].remove();
    break;
  }
}

function filterSelection(status, button) {
  const tasks = document.querySelectorAll(".task-bar");
  const buttons = document.querySelectorAll(".footer-button");
  buttons.forEach((btn) => (btn.style.color = "#5ed3d1"));

  if (status === "All") {
    tasks.forEach((task) => (task.style.display = "flex"));
  } else if (status === "Completed") {
    tasks.forEach((task) => {
      const checkbox = task.querySelector(".checkbox");
      const isChecked = checkbox.checked;
      task.style.display = isChecked ? "flex" : "none";
    });
  } else if (status === "Active") {
    tasks.forEach((task) => {
      const checkbox = task.querySelector(".checkbox");
      const isChecked = checkbox.checked;
      task.style.display = !isChecked ? "flex" : "none";
    });
  }
  button.style.color = "white";
  updateTaskCount();
}

document.addEventListener("DOMContentLoaded", function () {
  const allButton = document.querySelector(".footer-button[data-status='All']");
  filterSelection("All", allButton);
});

document.querySelectorAll(".footer-button").forEach((button) => {
  button.addEventListener("click", () =>
    filterSelection(button.dataset.status, button)
  );
});
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;

  const elements = document.querySelectorAll(".aside, .components ");
  elements.forEach((element) => {
    if (themeName === "theme-dark") {
      element.style.backgroundColor = "#354259";
    } else {
      element.style.backgroundColor = "";
    }
  });
}
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
})();
