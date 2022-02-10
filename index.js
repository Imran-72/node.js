const yargs = require('yargs')
const pkg=require('./package.json')
const {addNote,printNodes,removeNotes}=require('./note.controller')
yargs.version(pkg.version)

yargs.command({
    command:"add",
    describe:"Add new note to list",
    builder:{
        title:{
            type:'string',
            describe:"Note title",
            demandOption:true
        }
    },
    handler({title}){
        addNote(title)
    }
})

yargs.command({
    command:"list",
    describe:"Print all notes",
  async  handler(){
        await printNodes()
    }
})

yargs.command({
    command:"remove",
    describe:"Remove note by id",
    builder:{
        id:{
            type:'string',
            describe:"Note id",
            demandOption:true
        }
    },
async handler({id}){
   await removeNotes(id)
    }
})

yargs.parse()