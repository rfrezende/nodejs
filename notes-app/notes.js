const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => 'Your notes';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('Note saved.'));
    } else {
        console.log(chalk.bgYellow('Note title taken.'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);

    if (newNotes.length < notes.length) {
        saveNotes(newNotes);
        console.log(chalk.bgGreen('Note removed.'));
    } else {
        console.log(chalk.bgRed('Note not found.'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes:'))
    notes.forEach(note => {
        console.log(' - ' + note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const nota = notes.find(nota => nota.title === title);
    if(nota) {
        console.log(chalk.inverse(nota.title))
        console.log(chalk.gray(nota.body));
    } else {
        console.log(chalk.bgRed('Note not found'));
    }
}

const loadNotes = (file='notes.json') => {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

const saveNotes = (notes, file='notes.json') => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(file, dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};