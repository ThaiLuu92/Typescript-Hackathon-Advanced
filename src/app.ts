interface Note {
  title: string;
  content: string;
}

let notes: Note[] = [];

//  Khởi tạo dữ liệu ban đầu nếu Local Storage trống
if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify([]));
}

//  Lấy danh sách các ghi chú từ Local Storage
function getNotes(): Note[] {
  const notesString = localStorage.getItem("notes") || "[]";
  return JSON.parse(notesString) as Note[];
}

//  Lưu danh sách các ghi chú vào Local Storage
function saveNotes(notes: Note[]): void {
  localStorage.setItem("notes", JSON.stringify(notes));
}

//  Hiển thị danh sách các ghi chú lên giao diện
const renderNotes = (): void => {
  const notes = getNotes();
  const tasksArea = document.querySelector(".tasks-area");

  if (tasksArea) {
    // Tạo chuỗi HTML để chứa các ghi chú
    let notesHTML = "";

    // Duyệt qua danh sách ghi chú và thêm chúng vào chuỗi HTML
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

    // Đặt sự kiện cho nút "Xóa" ở mỗi ghi chú
    notes.forEach((note, index) => {
      const deleteButton = document.getElementById(
        `delete-note-${index}`
      ) as HTMLElement;
      deleteButton.addEventListener("click", () => {
        deleteNote(index);
      });
    });
  }
};

//  Sự kiện khi nút "Add" được nhấn
const addButton = document.getElementById("add-note");
addButton?.addEventListener("click", () => {
  const noteInput = document.getElementById("note-input") as HTMLInputElement;
  const noteInputTitle = document.getElementById(
    "note-title"
  ) as HTMLInputElement;

  const noteText = noteInput.value.trim();
  const noteTextTitle = noteInputTitle.value.trim();

  if (noteText === "" || noteTextTitle === "") {
    // Nếu ô input trống, hiển thị thông báo lỗi
    const errorMessage = document.getElementById(
      "error-message"
    ) as HTMLParagraphElement;
    errorMessage.textContent = "Vui lòng nhập cả tiêu đề và nội dung.";
    return;
  }

  const errorMessage = document.getElementById(
    "error-message"
  ) as HTMLParagraphElement;
  errorMessage.textContent = "";

  // Tạo một đối tượng Note với tiêu đề và nội dung
  const newNote: Note = {
    title: noteTextTitle,
    content: noteText,
  };

  addNote(newNote);
  renderNotes();

  // Xóa nội dung trong các ô nhập
  noteInput.value = "";
  noteInputTitle.value = "";
});

//  Gọi hàm để hiển thị danh sách ghi chú ban đầu
renderNotes();

//  Thêm ghi chú mới
const addNote = (newNote: Note): void => {
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
};

// Xóa ghi chú
const deleteNote = (noteIndex: number): void => {
  const notes = getNotes();
  if (noteIndex >= 0 && noteIndex < notes.length) {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    renderNotes();
  }
};
