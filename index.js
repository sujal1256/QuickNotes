import { months, notes, priorityBasedColouring } from "./constants.js";
("use strict");
// Have random colors.....
// Use font as a handwriting like notes.......
// Priority based coloring......
// Create a note.....
// Delete a note.....

// Show complete note on hover else show fixed length of the note
// Make it look like actual notes by adding a note at the center of it
// Mark them as Todo, Doing or Done (Make particular styling for the same)
// Update a note
// Drag and drop a note
// Add light and Dark theme
// Add short cuts a edit a note
// Ctrl + N to create a new Note
// We can create collection of notes also
// Note size cannot exceed a certail level
// Priority based Sorting

// Sort by time created / priority basis



// FIXME:
// Opens view section after clicking on dropdown

function closeCreateSection() {
  createNoteSection.closest(".opaque-screen").classList.add("hidden");
}
function closeViewSection() {
  viewNoteSection.closest(".opaque-screen").classList.add("hidden");
}

function openCreateSection(e) {
  e.preventDefault();
  createNoteSection.closest(".opaque-screen").classList.remove("hidden");
}

function createNote(e) {
  console.log(createNoteTextarea);

  createNoteTextarea.focus();
  e.preventDefault();
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();

  const timestamp = `${date} ${months[month]}, ${year} ${time}`;

  console.log(month);

  if (createNoteTextarea?.value?.trim() === "") {
    // FIXME:
    alert("Textarea can not be empty");

    return;
  }

  const html = `
              <div class="note">
            <h3 class="note-title">
              ${createNoteTextarea.value}
            </h3>
    
            <!-- delete and edit buttons -->
            <button class="btn delete-btn">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <button class="btn edit-btn">
              <i class="fa-solid fa-pencil"></i>
            </button>
    
            <div class="priority-and-status-section">
              <select class="priority create-note-priority">
                <option value="-1" disabled selected>Select Priority</option>
                <option value="2">High</option>
                <option value="1">Medium</option>
                <option value="0">Low</option>
              </select>
              <p>Status</p>
            </div>
    
            <div class="timestamp-div">
              <p class="timestamp-status">Created on:</p>
            <p class="timestamp">${date} ${months[month]}, ${year} ${time}</p>
            </div>
          </div>
        `;

  notesSection.insertAdjacentHTML("beforeend", html);

  const newPriorityDropdown = notesSection.lastElementChild.querySelector(
    ".create-note-priority"
  );
  newPriorityDropdown.addEventListener("change", giveColorBasedOnPriority);
  const note_id = newDate.getTime();
  const newNote = notesSection.lastElementChild;
  newNote.setAttribute("note_id", note_id);
  newNote.addEventListener("click", () => {
    viewNote(note_id);
  });

  notes.push({
    note_id,
    timestamp : `Created on ${timestamp}`,
    content: createNoteTextarea.value,
    priority: "-1",
  });

  const deleteBtn = notesSection.lastElementChild.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteNote);

  console.log(notes);
  closeCreateSection();
  createNoteTextarea.value = "";
}

function giveColorBasedOnPriority(e) {
  const selectedPriority = e.target.value;

  // Get the closest note div
  const closestNote = e.target.closest(".note");
  const closestNoteId = closestNote.getAttribute("note_id");

  notes.find((note) => note.note_id == closestNoteId).priority =
    selectedPriority.toString();

  // Reset note background color
  closestNote.style.backgroundColor =
    priorityBasedColouring[Number(selectedPriority)];

  console.log(notes);
}

function deleteNote(e) {
  e.stopPropagation();

  const note = e?.target?.closest(".note");
  console.log(note);

  const incomingNote_id = note?.getAttribute("note_id");

  notes.splice(
    notes.findIndex((n) => n.note_id == incomingNote_id),
    1
  );
  note.remove();
  console.log(notes);
}

function openViewSection() {
  viewNoteSection.closest(".opaque-screen").classList.remove("hidden");
}

function viewNote(note_id) {
  openViewSection();
  viewNoteId = note_id;

  const note = notes.find((note) => note.note_id === note_id);
  viewSectionTextarea.value = note.content;
  viewNotePriority.value = note.priority;

}


function editNote() {
  console.log("editing");
  viewSectionTextarea.disabled = false;
  viewSectionSaveBtn.style.backgroundColor = "rgb(0, 170, 255)";
}

function saveNote() {
  const noteIndex = notes.findIndex(note => note.note_id === viewNoteId);
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();

  const timestamp = `${date} ${months[month]}, ${year} ${time}`;

  // Collect the new note data (content, priority, timestamp)
  const tempNote = {
    content: viewSectionTextarea.value,
    priority: viewNotePriority.value,
    timestamp: `Edited on ${timestamp}`
  };

  // Merge the existing note with the new tempNote (tempNote overwrites the existing note fields)
  const newNote = { ...notes[noteIndex], ...tempNote };

  // Replace the old note with the new merged note
  notes[noteIndex] = newNote;
  console.log('Note Edited Successfully');
  console.log(newNote);
  console.log(notes);
}










let viewNoteId = '';
const createNoteSection = document.querySelector(".create-note");
const createNoteBtn = document.querySelector(".create-btn");
const notesSection = document.querySelector(".notes-section");
const openCreateSectionBtn = document.querySelector(".open-create-form");
const createNoteTextarea = document.querySelector(".create-note-textarea");
const createSectionCloseBtn = document.querySelector(
  ".create-section-close-btn"
);
const viewNoteSection = document.querySelector(".view-note");
const viewSectionCloseBtn = document.querySelector(".view-note-close-btn");
const viewSectionEditBtn = document.querySelector(".view-note-edit-btn");
const viewSectionSaveBtn = document.querySelector(".view-note-save-btn");
const viewSectionTextarea = document.querySelector(".view-note-textarea");
const viewNotePriority = document.querySelector('.view-note-priority')

viewSectionCloseBtn.addEventListener("click", closeViewSection);

openCreateSectionBtn.addEventListener("click", openCreateSection);

createSectionCloseBtn.addEventListener("click", closeCreateSection);

createNoteBtn.addEventListener("click", createNote);

viewSectionEditBtn.addEventListener("click", editNote);
viewSectionSaveBtn.addEventListener("click", saveNote);
