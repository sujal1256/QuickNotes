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

function closeCreateForm() {
  opaqueScreen.classList.add("hidden");
}

function openCreateForm(e) {
  e.preventDefault();

  opaqueScreen.classList.remove("hidden");
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

  // Add changing colors based on priority
  const newPriorityDropdown = notesSection.lastElementChild.querySelector(
    ".create-note-priority"
  );
  newPriorityDropdown.addEventListener("change", giveColorBasedOnPriority);

  const newNote = notesSection.lastElementChild;
  newNote.setAttribute("note_id", newDate.getTime());

  notes.push({
    note_id: newDate.getTime(),
    timestamp,
    content: createNoteTextarea.value,
    priority: "-1",
  });

  const deleteBtn = notesSection.lastElementChild.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteNote);

  console.log(notes);
  closeCreateForm();
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

const createNoteBtn = document.querySelector(".create-btn");
const notesSection = document.querySelector(".notes-section");
const openCreateSectionBtn = document.querySelector(".open-create-form");
const createNoteTextarea = document.querySelector(".create-note-textarea");
const createSectionCloseBtn = document.querySelector(
  ".create-section-close-btn"
);
const opaqueScreen = document.querySelector(".opaque-screen");

openCreateSectionBtn.addEventListener("click", openCreateForm);

createSectionCloseBtn.addEventListener("click", closeCreateForm);

createNoteBtn.addEventListener("click", createNote);
