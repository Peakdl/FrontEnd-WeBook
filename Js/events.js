async function displayTodos() {
  try {
    const response = await fetch("http://localhost:3005/event/get_all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const todos = await response.json();

    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.id;


      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos", error);
  }
}
//token تسجيل حروج وحذف
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "/Html/login.html";
});
displayTodos();
