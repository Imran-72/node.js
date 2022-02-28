const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await saveNotes(notes);
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  let notes = await getNotes();
  notes = notes.filter((note) => note.id !== id);
  await saveNotes(notes);
  console.log(chalk.red(`Note with id: ${id} has been removed.`));
}

async function updateNote(newTitle) {
  const notes = await getNotes();
  const newNotes = [];
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === newTitle.id) {
      notes[i] = newTitle;
    }
    newNotes.push(notes[i]);
  }
  await saveNotes(newNotes);
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
