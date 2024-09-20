import { priorityBasedColouring, months } from "./constants.js";
("use strict");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");

  const sortDropdownmenu = document.querySelector(".sort");
  sortDropdownmenu.value = localStorage.getItem("sorted") || "default";
  let dragged = null;

  // Get notes from localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Define sections before using them
  const todoSection = document.querySelector(".todo-section");
  const doingSection = document.querySelector(".doing-section");
  const doneSection = document.querySelector(".done-section");

  todoSection.addEventListener("dragover", (e) => e.preventDefault());
  doingSection.addEventListener("dragover", (e) => e.preventDefault());
  doneSection.addEventListener("dragover", (e) => e.preventDefault());

  todoSection.addEventListener("drop", (e) => {
    e.preventDefault();
    dragged.remove();
    console.log(dragged);
    todoSection.appendChild(dragged);

    notes.find(
      (note) => note.note_id == dragged.getAttribute("note_id")
    ).status = "0";
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.reload();
  });

  doingSection.addEventListener("drop", (e) => {
    e.preventDefault();
    dragged.remove();
    doingSection.appendChild(dragged);
    notes.find(
      (note) => note.note_id == dragged.getAttribute("note_id")
    ).status = "1";
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.reload();
  });

  doneSection.addEventListener("drop", (e) => {
    e.preventDefault();
    dragged.remove();
    doneSection.appendChild(dragged);
    notes.find(
      (note) => note.note_id == dragged.getAttribute("note_id")
    ).status = "2";
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.reload();
  });

  const sections = [todoSection, doingSection, doneSection];
  let viewNoteId;

  // Render notes
  notes.forEach(renderNote);
  console.log(notes);

  const createNoteSection = document.querySelector(".create-note");
  const createNoteBtn = document.querySelector(".create-btn");
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

  // Add event listeners
  viewSectionCloseBtn.addEventListener("click", closeViewSection);
  openCreateSectionBtn.addEventListener("click", openCreateSection);
  createSectionCloseBtn.addEventListener("click", closeCreateSection);
  createNoteBtn.addEventListener("click", createNote);
  sortDropdownmenu.addEventListener("change", sortNotes);
  viewSectionSaveBtn.addEventListener("click", saveNote);
  viewSectionEditBtn.addEventListener("click", editNote);

  function renderNote(note) {
    const html = `
    <td class="note" note_id="${note.note_id}" draggable="true">
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
    </td>
  `;

    // Convert status to a number (0 for To do, 1 for Doing, 2 for Done)
    const noteStatus = Number(note.status);

    // Insert HTML into the appropriate section based on the note's status
    sections[noteStatus].insertAdjacentHTML("beforeend", html);

    const newPriorityDropdown = sections[
      noteStatus
    ].lastElementChild.querySelector(".create-note-priority");
    const newStatusDropdown = sections[
      noteStatus
    ].lastElementChild.querySelector(".create-note-status");

    newPriorityDropdown.addEventListener("click", (e) => e.stopPropagation());
    newPriorityDropdown.addEventListener("change", giveColorBasedOnPriority);

    newStatusDropdown.addEventListener("click", (e) => e.stopPropagation());
    newStatusDropdown.addEventListener("change", giveStatus);

    const deleteBtn =
      sections[noteStatus].lastElementChild.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteNote);

    const editBtn =
      sections[noteStatus].lastElementChild.querySelector(".edit-btn");
    editBtn.addEventListener("click", (e) => {
      editNote();
    });

    const noteElement = sections[noteStatus].lastElementChild;
    noteElement.addEventListener("click", () => {
      viewNote(note.note_id);
    });

    noteElement.addEventListener("dragstart", (e) => {
      dragged = e.target;
      e.dataTransfer.setData("text", e.target.id); // Store the id of the dragged note
      console.log(e.target);
    });

    if (note.priority != -1) {
      noteElement.style.backgroundColor = priorityBasedColouring[note.priority];
    }
  }

  function closeCreateSection() {
    createNoteSection.closest(".opaque-screen").classList.add("hidden");
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

  function closeEditMode() {
    viewSectionTextarea.disabled = true;
    viewSectionSaveBtn.style.backgroundColor = "rgb(0, 170, 255)";
    viewSectionTextarea.style.backgroundColor = "#eaeaea";
  }

  function prioritySort(a, b) {
    return b.priority - a.priority;
  }

  function defaultSort(a, b) {
    return a.note_id - b.note_id;
  }

  function openViewSection() {
    viewNoteSection.closest(".opaque-screen").classList.remove("hidden");
  }

  function closeViewSection() {
    viewNoteSection.closest(".opaque-screen").classList.add("hidden");
  }

  function openCreateSection(e) {
    e.preventDefault();
    createNoteSection.closest(".opaque-screen").classList.remove("hidden");
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
});
