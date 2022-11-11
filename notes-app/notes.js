const fs = require("fs");

const getNotes = function() {
    return 'Your notes';
};

const addNote = function(title, body) {
    let notes = loadNotes();

    const duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('Note saved.')
    } else {
        console.log('Note title taken.');
    }
}

const removeNote = function(title) {
    let notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);

    if (newNotes.length < notes.length) {
        saveNotes(newNotes);
        console.log('Note removed.');
    } else {
        console.log('Note not found.');
    }
}

const loadNotes = function(file='notes.json') {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

const saveNotes = function(notes, file='notes.json') {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(file, dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};