import { months, notes, priorityBasedColouring } from "./constants.js";
("use strict");
// Have random colors.....
// Use font as a handwriting like notes.......
// Priority based coloring......
// Create a note.....




// Show complete note on hover else show fixed length of the note
// Make it look like actual notes by adding a note at the center of it
// Mark them as Todo, Doing or Done (Make particular styling for the same)
// Update a note
// Delete a note
// Drag and drop a note
// Add light and Dark theme
// Add short cuts a edit a note
// Ctrl + N to create a new Note
// We can create collection of notes also
// Note size cannot exceed a certail level

// Sort by time created / priority basis

function closeCreateForm() {
  opaqueScreen.classList.add("hidden");
}

function giveColorBasedOnPriority(e) {
  const selectedPriority = e.target.value;
  
  // Get the closest note div
  const closestNote = e.target.closest(".note");

  // Reset note background color
  closestNote.style.backgroundColor = priorityBasedColouring[Number(selectedPriority)];


}





const createNoteBtn = document.querySelector(".create-btn");
const notesSection = document.querySelector(".notes-section");
const openCreateSection = document.querySelector(".open-create-form");
const createNoteTextarea = document.querySelector(".create-note-textarea");
const createSectionCloseBtn = document.querySelector(
  ".create-section-close-btn"
);
const opaqueScreen = document.querySelector(".opaque-screen");
const createSectionPriotity = document.querySelector(
  ".create-priority-btn .create-note-priority"
);
const priorityDropdowns = document.querySelectorAll(".create-note-priority");




















// Loop through all priority dropdowns and add event listeners
// priorityDropdowns.forEach((dropdown) => {
//   dropdown.addEventListener("change", ();
// });


openCreateSection.addEventListener("click", (e) => {
  e.preventDefault();

  opaqueScreen.classList.remove("hidden");
});

createSectionCloseBtn.addEventListener("click", () => {
  closeCreateForm();
});

createNoteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const time = new Date().toLocaleTimeString();

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
        <div class="buttons">
          <button class="btn delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn edit-btn">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>

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
  const newPriorityDropdown = notesSection.lastElementChild.querySelector(".create-note-priority");
  newPriorityDropdown.addEventListener("change", giveColorBasedOnPriority);

  notes.push({
    timestamp,
    content: createNoteTextarea.value,
    priority: "-1",
  });


  console.log(notes);
  closeCreateForm();
});
