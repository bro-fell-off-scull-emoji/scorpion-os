// Automatically load apps from a predefined list
// You just need to add new apps to the "apps" folder

const apps = [
  {
    name: "Calculator",
    path: "apps/calculator/index.html",
    icon: "apps/calculator/icon.png"
  },
  {
    name: "Notes",
    path: "apps/notes/index.html",
    icon: "apps/notes/icon.png"
  }
];

const appContainer = document.getElementById("app-container");

apps.forEach(app => {
  const appEl = document.createElement("div");
  appEl.className = "app";
  appEl.innerHTML = `
    <img src="${app.icon}" alt="${app.name}">
    <p>${app.name}</p>
  `;

  appEl.addEventListener("click", () => {
    openApp(app.path);
  });

  appContainer.appendChild(appEl);
});

function openApp(path) {
  const iframe = document.createElement("iframe");
  iframe.src = path;

  // Click outside iframe to close
  iframe.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  
  document.body.appendChild(iframe);
  document.body.addEventListener("click", () => {
    iframe.remove();
  }, { once: true });
}
