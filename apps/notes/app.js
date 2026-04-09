const note = document.getElementById("note");

// Load saved notes from browser memory
note.value = localStorage.getItem("notes") || "";

// Save notes whenever user types
note.addEventListener("input", () => {
  localStorage.setItem("notes", note.value);
});
