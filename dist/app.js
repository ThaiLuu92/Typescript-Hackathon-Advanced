"use strict";
let notes = [];
//  Khởi tạo dữ liệu ban đầu nếu Local Storage trống
if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify([]));
}
//  Lấy danh sách các ghi chú từ Local Storage
function getNotes() {
    const notesString = localStorage.getItem("notes") || "[]";
    return JSON.parse(notesString);
}
//  Lưu danh sách các ghi chú vào Local Storage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
//  Hiển thị danh sách các ghi chú
const renderNotes = () => {
    const notes = getNotes();
    const tasksArea = document.querySelector(".tasks-area");
    if (tasksArea) {
        let notesHTML = "";
        notes.forEach((note, index) => {
            notesHTML += `
        <div class="task-card">
          <p class="task-card-title">Tiêu đề:<span>${note.title}</span></p>
          <p>${note.content}</p>
          <div class="icon">
            <i class="fa-solid fa-trash" id="delete-note-${index}"><span class="tooltiptext">Xóa</span></i>
          </div>
        </div>
      `;
        });
        tasksArea.innerHTML = notesHTML;
        //  "Xóa" ở mỗi ghi chú
        notes.forEach((note, index) => {
            const deleteButton = document.getElementById(`delete-note-${index}`);
            deleteButton.addEventListener("click", () => {
                deleteNote(index);
            });
        });
    }
};
//  Sự kiện khi nút "Add" được nhấn
const addButton = document.getElementById("add-note");
addButton?.addEventListener("click", () => {
    const noteInput = document.getElementById("note-input");
    const noteInputTitle = document.getElementById("note-title");
    const noteText = noteInput.value.trim();
    const noteTextTitle = noteInputTitle.value.trim();
    if (noteText === "" || noteTextTitle === "") {
        // Nếu ô input trống, thông báo lỗi
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Vui lòng nhập cả tiêu đề và nội dung.";
        return;
    }
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
    // Tạo một obj
    const newNote = {
        title: noteTextTitle,
        content: noteText,
    };
    addNote(newNote);
    renderNotes();
    // Xóa nội dung trong các ô input
    noteInput.value = "";
    noteInputTitle.value = "";
});
//  Gọi hàm để hiển thị
renderNotes();
//  Thêm ghi chú mới
const addNote = (newNote) => {
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
};
// Xóa ghi chú
const deleteNote = (noteIndex) => {
    const notes = getNotes();
    if (noteIndex >= 0 && noteIndex < notes.length) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        renderNotes();
    }
};
