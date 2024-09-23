const inputText = document.getElementById('input-text');
const submitBtn = document.getElementById('submit-btn');
const saveBtn = document.getElementById('save-btn');
const listItem = document.getElementById('list-ul');
let editedId = null;

let data = JSON.parse(localStorage.getItem('todos')) || [];

function saveLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodo() {
  listItem.innerHTML = '';

  data.map((item) => {
    const printLi = `
            <li>
            <h1>${item.title}</h1>
            <div class="btn-container">
            <button class="delete-btn" data-id=${item.id} >delete</button>
            <button class="edit-btn" data-id=${item.id}>edit</button>
            </div>
            </li>
            `;

    listItem.insertAdjacentHTML('afterbegin', printLi);
  });
}

listItem.addEventListener('click', (e) => {
  const target = e.target;
  const id = Number(target.dataset.id);

  if (!id) return;

  if (target.classList.contains('delete-btn')) {
    deleteTodo(id);
  } else if (target.classList.contains('edit-btn')) {
    editTodo(id);
  }
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const text = inputText.value.trim();

  if (!text) {
    alert('Please enter the todo');
    return;
  }

  data.push({
    id: Date.now(),
    title: text,
  });

  inputText.value = '';
  saveLocalStorage(data);
  renderTodo();
});

function deleteTodo(id) {
  const newData = data.filter((item) => item.id !== id);

  if (newData.length < data.length) {
    data = newData;
    saveLocalStorage(data);
    renderTodo();
  }
}

function editTodo(id) {
  const editedValue = data.find((item) => item.id === id);

  if (!editedValue) {
    alert('Item not found');
    return;
  }

  editedId = id;
  submitBtn.style.display = 'none';
  saveBtn.style.display = 'inline';
  inputText.value = editedValue.title;
}

saveBtn.addEventListener('click', () => {
  const text = inputText.value.trim();

  if (!text) {
    alert('Please edit the item before saving.');
    return;
  }

  data = data.map((item) =>
    item.id === editedId ? { ...item, title: text } : item
  );

  renderTodo();
  saveLocalStorage(data);

  inputText.value = '';
  submitBtn.style.display = 'inline';
  saveBtn.style.display = 'none';
});

renderTodo();
