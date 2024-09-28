
# QuickNotes

QuickNotes is a web application that allows users to create, view, edit, delete, and organize notes into different sections such as **To do**, **Doing**, and **Done**. Notes are stored in localStorage to persist across sessions. The app includes a drag-and-drop feature for moving notes between sections and color-coding based on priority.

## Features

- **Create Notes**: Users can create new notes with content, priority, and timestamp.
- **Drag and Drop**: Notes can be dragged between **To do**, **Doing**, and **Done** sections.
- **Edit Notes**: Users can edit existing notes and save changes.
- **Delete Notes**: Notes can be deleted permanently.
- **Priority and Status**: Notes can be assigned a priority (High, Medium, Low) and a status (To do, Doing, Done).
- **Sort Notes**: Users can sort notes based on priority or default creation order.
- **Persistent Data**: Notes are stored in localStorage and persist even after page reloads.


## Screenshots


1. **Main Interface**

   ![Main Interface](./assets/screenschots/main_interface.png)

2. **Board Interface**

   ![Note Creation](./assets/screenschots/board_interface.png)

3. **Note Creation**

   ![Note Creation](./assets/screenschots/note_creation.png)

4. **Note Editing**

   ![Note Editing](./assets/screenschots/note_editing.png)




## File Structure

```bash
QuickNotes/
│
├── assets/
│   ├── CSS/
│   │   └── styles.css
│   └── Javascript/
│       ├── board.js
│       ├── constants.js
│       └── index.js
├── board.html
├── index.html
└── Readme.md
         
```


### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/sujal1256/QuickNotes
   ```

2. Navigate to the project directory:

   ```bash
   cd QuickNotes
   ```

3. Open the `index.html` file in your browser:

   ```bash
   open index.html
   ```
