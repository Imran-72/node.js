const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, getNotes, removeNote } = require('./notes.controller');

const PORT = 3000;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'pages');
app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  const title = req.body.title;
  await addNote(title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server has been started on port ${PORT}...`));
});
