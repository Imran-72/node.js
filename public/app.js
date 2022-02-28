document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    console.log(id);
    const title = event.target.dataset.title;
    const newTitle = prompt('Введите новое название', title).trim();
    if (newTitle) {
      update({ title: newTitle, id }).then(() => {
        event.target.closest('li').firstChild.innerText = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function update(newTitle) {
  await fetch(`/${newTitle.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTitle),
  });
}
