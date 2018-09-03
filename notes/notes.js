const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (subject, body) => {
  var notes = fetchNotes();
  var note = {
    subject,
    body
  };
  var duplicateNotes = notes.filter((note) => note.subject === subject);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var readAll = () => {
  return fetchNotes();
};

var readNote = (subject) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.subject === subject);
  return filteredNotes[0];
};

var removeNote = (subject) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.subject !== subject);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('--');
  console.log(`subject: ${note.subject}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  readAll,
  readNote,
  removeNote,
  logNote
};
