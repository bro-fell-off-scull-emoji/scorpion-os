const apps = [
  { name: "Notes", icon: "apps/notes/icon.png", path: "apps/notes/content.html" },
  { name: "Calculator", icon: "📱", path: "apps/calculator/content.html" }
];

const appContainer = document.getElementById("app-container");
let highestZ = 100;

apps.forEach(app => {
  const icon = document.createElement("div");
  icon.className = "app-icon";
  icon.innerHTML = `<img src="${app.icon}" alt="${app.name}"><p>${app.name}</p>`;
  icon.addEventListener("click", () => openApp(app));
  appContainer.appendChild(icon);
});

function openApp(app) {
  // Create window frame
  const win = document.createElement("div");
  win.className = "window";
  win.style.zIndex = ++highestZ;

  win.innerHTML = `
    <div class="title-bar">
      ${app.name}
      <div class="buttons">
        <button class="min-btn">_</button>
        <button class="max-btn">⬜</button>
        <button class="close-btn">x</button>
      </div>
    </div>
    <div class="window-content">
      <iframe src="${app.path}" style="width:100%; height:100%; border:none;"></iframe>
    </div>
    <div class="resize-handle"></div>
  `;

  document.body.appendChild(win);

  const titleBar = win.querySelector(".title-bar");
  const closeBtn = win.querySelector(".close-btn");
  const minBtn = win.querySelector(".min-btn");
  const maxBtn = win.querySelector(".max-btn");
  const resizeHandle = win.querySelector(".resize-handle");
  const content = win.querySelector(".window-content");

  // --- Dragging ---
  let isDragging = false, offsetX, offsetY;
  titleBar.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = ++highestZ;
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      win.style.left = e.clientX - offsetX + "px";
      win.style.top = e.clientY - offsetY + "px";
    }
    if (isResizing) {
      win.style.width = (e.clientX - win.offsetLeft) + "px";
      win.style.height = (e.clientY - win.offsetTop) + "px";
    }
  });

  document.addEventListener("mouseup", () => { isDragging = false; isResizing = false; });

  // --- Resize ---
  let isResizing = false;
  resizeHandle.addEventListener("mousedown", e => {
    isResizing = true;
    e.stopPropagation();
  });

  // --- Buttons ---
  closeBtn.addEventListener("click", () => win.remove());

  let isMinimized = false;
  minBtn.addEventListener("click", () => {
    if (!isMinimized) { content.style.display="none"; resizeHandle.style.display="none"; win.style.height="30px"; }
    else { content.style.display="block"; resizeHandle.style.display="block"; win.style.height="300px"; }
    isMinimized = !isMinimized;
  });

  let isMaximized = false;
  let lastPos = {};
  maxBtn.addEventListener("click", () => {
    if (!isMaximized) {
      lastPos = { top: win.offsetTop, left: win.offsetLeft, width: win.offsetWidth, height: win.offsetHeight };
      win.style.top="0px"; win.style.left="0px"; win.style.width="100vw"; win.style.height="100vh";
    } else {
      win.style.top=lastPos.top+"px"; win.style.left=lastPos.left+"px";
      win.style.width=lastPos.width+"px"; win.style.height=lastPos.height+"px";
    }
    isMaximized = !isMaximized;
  });
}
