import { months, priorityBasedColouring } from "./constants.js";
("use strict");

// Initialize notes from localStorage first
let notes = JSON.parse(localStorage.getItem("notes")) || [];
const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn")) || null;
const sortDropdownmenu = document.querySelector(".sort");
const loggedInUserBox = document.querySelector('.user-name');
const headerNavs = document.querySelector(".header-navs");
const signedInHeaderBox = document.querySelector(".signed-in-header-box");
sortDropdownmenu.value = localStorage.getItem("sorted") || "default";
const signInContainer = document.querySelector('.sign-in-container');
const logoutBtn = document.querySelector('.logout-btn');
const logoutBox = document.querySelector('.logout-box');

console.log(signedInHeaderBox);

signedInHeaderBox.addEventListener('click',() => logoutBox.classList.toggle('hidden'));

logoutBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  localStorage.removeItem('userLoggedIn');
  window.location.reload();
})

console.log(userLoggedIn);

window.addEventListener('load',() => {  
  if (userLoggedIn) {
    headerNavs.classList.add("hidden");
    signedInHeaderBox.classList.remove("hidden");
    loggedInUserBox.textContent = userLoggedIn.name;

    signInContainer.classList.add('hidden');
  }
});

// Define functions to manage the DOM
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
    user_id: userLoggedIn.id,
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
  const closestNote = e.target.closest(".note");
  const closestNoteId = closestNote.getAttribute("note_id");

  notes.find((note) => note.note_id == closestNoteId).priority =
    selectedPriority.toString();

  closestNote.style.backgroundColor =
    priorityBasedColouring[Number(selectedPriority)];

  localStorage.setItem("notes", JSON.stringify(notes));
  sortNotes();
}

function renderNote(note) {
  const html = `
      <div class="note" note_id="${note.note_id}" user_id="${note.user_id}">
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

  notesSection.insertAdjacentHTML("beforeend", html);

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

  notes.find((note) => note.note_id == closestNoteId).status =
    selectedStatus.toString();
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.reload();
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
  sortNotes();
}

function prioritySort(a, b) {
  return b.priority - a.priority;
}

function defaultSort(a, b) {
  return a.note_id - b.note_id;
}

function sortNotes() {
  if (sortDropdownmenu.value === "priority") {
    notes.sort(prioritySort);
  } else {
    notes.sort(defaultSort);
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("sorted", sortDropdownmenu.value);
  window.location.reload();
}

// Get references to DOM elements after the document is fully loaded
let viewNoteId;
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

// Render notes once the page is loaded
notes?.filter(note => note.user_id == userLoggedIn?.id).forEach(renderNote);

// Add event listeners
viewSectionCloseBtn.addEventListener("click", closeViewSection);
openCreateSectionBtn.addEventListener("click", openCreateSection);
createSectionCloseBtn.addEventListener("click", closeCreateSection);
createNoteBtn.addEventListener("click", createNote);
sortDropdownmenu.addEventListener("change", sortNotes);
viewSectionSaveBtn.addEventListener("click", saveNote);
viewSectionEditBtn.addEventListener("click", editNote);
