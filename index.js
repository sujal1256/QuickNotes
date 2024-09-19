import { months, priorityBasedColouring } from "./constants.js";
("use strict");
// Have random colors.....
// Use font as a handwriting like notes.......
// Priority based coloring......
// Create a note.....
// Delete a note.....
// Update a note......

// Make it look like actual notes by adding a note at the center of it
// Mark them as Todo, Doing or Done (Make particular styling for the same)
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
  e.preventDefault();

  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();

  const timestamp = `${date} ${months[month]}, ${year} ${time}`;

  if (createNoteTextarea?.value?.trim() === "") {
    alert("Textarea can not be empty");
    return;
  }
  const note_id = newDate.getTime();

  notes.push({
    note_id,
    timestamp: `Created on ${timestamp}`,
    content: createNoteTextarea.value,
    priority: "-1",
    status: "0",
  });

  // Save notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Reload the page to reflect the changes
  window.location.reload();
}

function giveColorBasedOnPriority(e) {
  const selectedPriority = e.target.value;

  console.log(selectedPriority);

  // Get the closest note div
  const closestNote = e.target.closest(".note");
  const closestNoteId = closestNote.getAttribute("note_id");

  notes.find((note) => note.note_id == closestNoteId).priority =
    selectedPriority.toString();

  // Reset note background color
  closestNote.style.backgroundColor =
    priorityBasedColouring[Number(selectedPriority)];

  // Save updated notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNote(note) {
  const html = `
      <div class="note" note_id="${note.note_id}">
        <h3 class="note-title">
          ${note.content}
        </h3>

        <!-- delete and edit buttons -->
        <div class="note-actions">
        <button class="btn delete-btn">
            <i class="fa-solid fa-circle-xmark"></i>
        </button>
        <button class="btn edit-btn">
            <i class="fa-solid fa-pencil"></i>
        </button>
    </div>

        <div class="priority-and-status-section">
          <select class="priority create-note-priority">
            <option value="-1" disabled ${
              note.priority == "-1" ? "selected" : ""
            }>Select Priority</option>
            <option value="2" ${
              note.priority == "2" ? "selected" : ""
            }>High</option>
            <option value="1" ${
              note.priority == "1" ? "selected" : ""
            }>Medium</option>
            <option value="0" ${
              note.priority == "0" ? "selected" : ""
            }>Low</option>
          </select>

          <select class="priority create-note-status">
            <option value="0" ${
              note.status == "0" ? "selected" : ""
            }>To do</option>
            <option value="1" ${
              note.status == "1" ? "selected" : ""
            }>Doing</option>
            <option value="2" ${
              note.status == "2" ? "selected" : ""
            }>Done</option>
          </select>
        </div>

        <div class="timestamp-div">
          <p class="timestamp-status">${note.timestamp}</p>
        </div>
      </div>
    `;

  // Append the new note to the notes section
  notesSection.insertAdjacentHTML("beforeend", html);

  // Add event listeners for each note
  const newPriorityDropdown = notesSection.lastElementChild.querySelector(
    ".create-note-priority"
  );
  const newStatusDropdown = notesSection.lastElementChild.querySelector(
    ".create-note-status"
  );

  newPriorityDropdown.addEventListener("click", (e) => e.stopPropagation());
  newPriorityDropdown.addEventListener("change", giveColorBasedOnPriority);

  newStatusDropdown.addEventListener("click", (e) => e.stopPropagation());
  newStatusDropdown.addEventListener("change", giveStatus);

  const deleteBtn = notesSection.lastElementChild.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteNote);

  const editBtn = notesSection.lastElementChild.querySelector(".edit-btn");
  editBtn.addEventListener("click", (e) => {
    // e.stopPropagation();
    // openViewSection();
    editNote();
  });

  const noteElement = notesSection.lastElementChild;
  noteElement.addEventListener("click", () => {
    viewNote(note.note_id);
  });

  if (note.priority != -1) {
    noteElement.style.backgroundColor = priorityBasedColouring[note.priority];
  }
}

function giveStatus(e) {
  const selectedStatus = e.target.value;

  const closestNote = e.target.closest(".note");
  const closestNoteId = closestNote.getAttribute("note_id");
  console.log(closestNote);
  console.log(closestNoteId);

  notes.find((note) => {
    return note.note_id == closestNoteId;
  }).status = selectedStatus.toString();
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(notes);
}

function deleteNote(e) {
  e.stopPropagation();

  const note = e?.target?.closest(".note");
  const incomingNote_id = note?.getAttribute("note_id");

  notes.splice(
    notes.findIndex((n) => n.note_id == incomingNote_id),
    1
  );
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.reload();
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
  viewSectionTextarea.style.backgroundColor = "#fff";
}

function closeEditMode() {
  viewSectionTextarea.disabled = true;
  viewSectionSaveBtn.style.backgroundColor = "rgb(0, 170, 255)";
  viewSectionTextarea.style.backgroundColor = "#eaeaea";
}

function saveNote() {
  const noteIndex = notes.findIndex((note) => note.note_id === viewNoteId);
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();

  const timestamp = `${date} ${months[month]}, ${year} ${time}`;

  const tempNote = {
    content: viewSectionTextarea.value,
    priority: viewNotePriority.value,
    timestamp: `Edited on ${timestamp}`,
  };

  const newNote = { ...notes[noteIndex], ...tempNote };

  notes[noteIndex] = newNote;

  localStorage.setItem("notes", JSON.stringify(notes));
  closeEditMode();
  window.location.reload();
}

function prioritySort(a, b) {
  console.log("Priority");

  return b.priority - a.priority;
}
function defaultSort(a, b) {
  return a.note_id - b.note_id;
}
function sortNotes() {
  console.log("Sorting");

  if (sortDropdownmenu.value === "priority") {
    notes.sort(prioritySort);
  } else {
    notes.sort(defaultSort);
  }
  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("sorted", sortDropdownmenu.value);
  window.location.reload();
}

let viewNoteId = "";
let notes;
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
const viewNotePriority = document.querySelector(".view-note-priority");

const sortDropdownmenu = document.querySelector(".sort");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");
  notes = JSON.parse(localStorage.getItem("notes")) || [];
  sortDropdownmenu.value = localStorage.getItem("sorted") || "default";
  notes.forEach(renderNote);
  console.log(notes);
});

viewSectionCloseBtn.addEventListener("click", closeViewSection);

openCreateSectionBtn.addEventListener("click", openCreateSection);

createSectionCloseBtn.addEventListener("click", closeCreateSection);

document
  .querySelector(".create-note-priority")
  .addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the parent
  });

createNoteBtn.addEventListener("click", createNote);

viewSectionEditBtn.addEventListener("click", editNote);
viewSectionSaveBtn.addEventListener("click", saveNote);

sortDropdownmenu.addEventListener("change", sortNotes);
