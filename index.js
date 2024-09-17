"use strict";
// Have random colors
// Show complete note on hover else show fixed length of the note
// Make it look like actual notes by adding a note at the center of it
// Use font as a handwriting like notes
// Priority based coloring\
// Mark them as Todo, Doing or Done (Make particular styling for the same)
// Create a note
// Update a note
// Delete a note
// Drag and drop a note
// Add light and Dark theme
// Add short cuts a edit a note
// Ctrl + N to create a new Note
// We can create collection of notes also
// Note size cannot exceed a certail level

// Sort by time created / priority basis

function closeCreateForm(){
    opaqueScreen.classList.add('hidden');
}


const createNoteBtn = document.querySelector(".create-btn");
const notesSection = document.querySelector(".notes-section");
const openCreateSection = document.querySelector('.open-create-form');
const createNoteText = document.querySelector(".create-note-textarea");
const createSectionCloseBtn = document.querySelector(
  ".create-section-close-btn"
);
const opaqueScreen = document.querySelector(".opaque-screen");


console.log(createSectionCloseBtn);
console.log(opaqueScreen);

openCreateSection.addEventListener('click', (e)=>{
    e.preventDefault();

    opaqueScreen.classList.remove('hidden');
})

createSectionCloseBtn.addEventListener("click", () => {
    closeCreateForm();
});

createNoteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const html = `
          <div class="note">
        <h3 class="note-title">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde magni
          omnis odio ducimus dolorum officiis voluptatibus voluptatem eaque
          asperiores corporis repellat dignissimos, velit cumque sunt neque
          harum consequatur et esse autem illo!
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
          <select class="priority" name="priority">
            <option value="" disabled selected>Select Priority</option>
            <option value="high" priority_value="3">High</option>
            <option value="medium" priority_value="2">Medium</option>
            <option value="low" priority_value="1">Low</option>
          </select>
          <p>Status</p>
        </div>

        <div class="timestamp-div">
          <p class="timestamp-status">Created on:</p>
          <p class="timestamp">19th Sept, 2024 20:09:26</p>
        </div>
      </div>
    `;

  notesSection.insertAdjacentHTML("beforeend", html);
  closeCreateForm();
});
