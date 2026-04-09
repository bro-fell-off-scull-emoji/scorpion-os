const desktopApps = [
  { name: "notes", label: "Notes", icon: "assets/icons/notes.png" },
  { name: "browser", label: "Browser", icon: "assets/icons/browser.png" }
];

function loadDesktop() {
  const desktop = document.getElementById("desktop");

  desktopApps.forEach((app, i) => {
    let icon = document.createElement("div");
    icon.className = "icon";

    // position in grid
    icon.style.left = (20 + (i % 5) * 90) + "px";
    icon.style.top = (20 + Math.floor(i / 5) * 100) + "px";

    icon.innerHTML = `
      <img src="${app.icon}">
      <span>${app.label}</span>
    `;

    // DOUBLE CLICK to open
    icon.ondblclick = () => openApp(app.name);

    desktop.appendChild(icon);
  });
}

// run on load
window.onload = loadDesktop;
