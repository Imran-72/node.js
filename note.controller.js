const chalk = require('chalk')
const fs=require('fs/promises')
const path = require('path')

const notesPath=path.join(__dirname,"db.json")

async function addNote(title){
const notes = await getNotes()

const note={
    title,
    id: Date.now().toString()
}

notes.push(note)

await fs.writeFile(notesPath,JSON.stringify(notes))

}

async function printNodes(){
    const notes=await getNotes()
    console.log(chalk.bgBlueBright("This is the Notes list"))
    notes.forEach(note => {
        console.log(chalk.blue(note.id,note.title))
    });
}
async function getNotes(){
    const notes=await fs.readFile(notesPath,{encoding:"utf-8"})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}

async function removeNotes(id){
let notes=await getNotes()

notes= notes.filter((note)=>note.id!==id)

await fs.writeFile(notesPath,JSON.stringify(notes))
}

module.exports={
    addNote,printNodes,removeNotes
}