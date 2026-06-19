// =========================================
// > core logic for character sprite generation and state management
// =========================================

// GLOBAL VARIABLES
var defaultAppearance = {
  skin: "#eec3a3",
  eye: "#3377aa",
  hairColor: "#2b2d3e",
  hairStyle: 1,
  clothesColor: "#39707e",
  clothesStyle: 1,
  shoeColor: "#333333",
  shoeStyle: 1,
  faceColor: "#8b2f2f",
  faceStyle: 1,
  headColor: "#6699cc",
  headStyle: 1,
};

var appState = {
  appearance: Object.assign({}, defaultAppearance),
  characters: [],
};

var currentView = "create";
var isAnimating = false;

// =========================================
// > sprite rendering
// =========================================

// SVG GENERATION
function generateSpriteSVG(app, isPortrait) {
  var size = "100%";
  var vBox = "0 0 32 32";

  if (isPortrait) {
    vBox = "6 2 20 20";
  }

  var svg =
    '<svg viewBox="' +
    vBox +
    '" width="' +
    size +
    '" height="' +
    size +
    '" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">';

  svg += '<rect x="12" y="15" width="8" height="9" fill="' + app.skin + '" />';
  svg += '<rect x="12" y="5" width="8" height="8" fill="' + app.skin + '" />';
  svg += '<rect x="13" y="9" width="1" height="2" fill="' + app.eye + '" />';
  svg += '<rect x="18" y="9" width="1" height="2" fill="' + app.eye + '" />';

  // Hair styles
  if (app.hairStyle === 1) {
    svg +=
      '<rect x="11" y="4" width="10" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="10" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
  } else if (app.hairStyle === 2) {
    svg +=
      '<rect x="10" y="3" width="12" height="4" fill="' +
      app.hairColor +
      '" />';
  } else if (app.hairStyle === 3) {
    svg +=
      '<rect x="9" y="3" width="14" height="5" fill="' + app.hairColor + '" />';
  } else if (app.hairStyle === 4) {
    svg +=
      '<rect x="10" y="2" width="12" height="6" fill="' +
      app.hairColor +
      '" />';
  } else if (app.hairStyle === 5) {
    svg +=
      '<rect x="11" y="3" width="10" height="3" fill="' +
      app.hairColor +
      '" />';
  } else {
    svg +=
      '<rect x="10" y="3" width="12" height="4" fill="' +
      app.hairColor +
      '" />';
  }

  // Clothes
  if (app.clothesStyle === 1) {
    svg += '<rect x="12" y="19" width="8" height="5" fill="#ffffff" />';
    svg +=
      '<rect x="10" y="15" width="4" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="18" y="15" width="4" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg += '<rect x="13" y="15" width="6" height="4" fill="#6699cc" />';
  } else if (app.clothesStyle === 2) {
    svg +=
      '<rect x="11" y="15" width="10" height="9" fill="' +
      app.clothesColor +
      '" />';
  } else if (app.clothesStyle === 3) {
    svg +=
      '<rect x="12" y="15" width="8" height="9" fill="' +
      app.clothesColor +
      '" />';
  } else {
    svg +=
      '<rect x="11" y="15" width="10" height="9" fill="' +
      app.clothesColor +
      '" />';
  }

  svg += "</svg>";
  return svg;
}

function updatePreview() {
  var previewElement = document.getElementById("live-sprite");
  if (previewElement) {
    previewElement.innerHTML = generateSpriteSVG(appState.appearance);
  }
}
// =========================================
// > interactivity functions
// =========================================

function cycleStyle(styleType) {
  if (styleType === "hair") {
    appState.appearance.hairStyle = appState.appearance.hairStyle >= 2 ? 1 : 2;
  }

  if (styleType === "clothes") {
    appState.appearance.clothesStyle =
      appState.appearance.clothesStyle >= 2 ? 1 : 2;
  }

  updatePreview();
}

function resetAppearance() {
  appState.appearance = Object.assign({}, defaultAppearance);

  var ids = ["skin", "eye", "hair", "clothes"];

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var stateKey = id;

    if (id === "hair") stateKey = "hairColor";
    if (id === "clothes") stateKey = "clothesColor";

    var input = document.getElementById("c-" + id);
    if (input) {
      input.value = appState.appearance[stateKey];
    }
  }

  updatePreview();
}

function randomizeAppearance() {
  function getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  appState.appearance.skin = getRandomColor();
  appState.appearance.eye = getRandomColor();
  appState.appearance.hairColor = getRandomColor();
  appState.appearance.clothesColor = getRandomColor();

  appState.appearance.hairStyle = Math.floor(Math.random() * 2) + 1;
  appState.appearance.clothesStyle = Math.floor(Math.random() * 2) + 1;

  var ids = ["skin", "eye", "hair", "clothes"];

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var stateKey = id;

    if (id === "hair") stateKey = "hairColor";
    if (id === "clothes") stateKey = "clothesColor";

    var input = document.getElementById("c-" + id);
    if (input) {
      input.value = appState.appearance[stateKey];
    }
  }

  updatePreview();
}

// =========================================
// > event listeners for color inputs
// =========================================

var inputIds = ["skin", "eye", "hair", "clothes"];

for (var i = 0; i < inputIds.length; i++) {
  (function (id) {
    var input = document.getElementById("c-" + id);

    if (input) {
      input.addEventListener("input", function (event) {
        var stateKey = id;

        if (id === "hair") stateKey = "hairColor";
        if (id === "clothes") stateKey = "clothesColor";

        appState.appearance[stateKey] = event.target.value;
        updatePreview();
      });
    }
  })(inputIds[i]);
}
// =========================================
// > save / roster functions
// =========================================

function saveCharacter() {
  var nameInput = document.getElementById("f-name");
  var birthdayInput = document.getElementById("f-bday");
  var lovedInput = document.getElementById("f-loved");

  var newCharacter = {
    name: nameInput
      ? nameInput.value || "Unnamed Character"
      : "Unnamed Character",
    birthday: birthdayInput ? birthdayInput.value || "Unknown" : "Unknown",
    lovedGifts: lovedInput ? lovedInput.value || "" : "",
    appearance: Object.assign({}, appState.appearance),
  };

  appState.characters.push(newCharacter);
  renderRoster();
}

function renderRoster() {
  var roster = document.getElementById("roster-list");
  if (!roster) return;

  roster.innerHTML = "";

  if (appState.characters.length === 0) {
    roster.innerHTML = "<p>No saved characters yet.</p>";
    return;
  }

  for (var i = 0; i < appState.characters.length; i++) {
    var character = appState.characters[i];

    var card = document.createElement("div");
    card.className = "roster-card";

    card.innerHTML =
      "<strong>" + character.name + "</strong><br>" + character.birthday;

    roster.appendChild(card);
  }
}

function handleSaveButton() {
  saveCharacter();
}

// =========================================
// > tabs
// =========================================

function switchTab(tabName) {
  var createView = document.getElementById("create-view");
  var rosterView = document.getElementById("roster-view");

  if (!createView || !rosterView) return;

  if (tabName === "create") {
    createView.style.display = "block";
    rosterView.style.display = "none";
  } else {
    createView.style.display = "none";
    rosterView.style.display = "block";
    renderRoster();
  }
}
// =========================================
// > modal / initialization
// =========================================

function openModal(characterIndex) {
  var character = appState.characters[characterIndex];
  if (!character) return;

  var modal = document.getElementById("profile-modal");
  if (!modal) return;

  var nameEl = document.getElementById("m-name");
  var bdayEl = document.getElementById("m-bday");
  var lovedEl = document.getElementById("m-loved");

  if (nameEl) nameEl.textContent = character.name;
  if (bdayEl) bdayEl.textContent = character.birthday;
  if (lovedEl) lovedEl.textContent = character.lovedGifts;

  modal.style.display = "flex";
}

function closeModal() {
  var modal = document.getElementById("profile-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Close modal if background clicked
document.addEventListener("click", function (event) {
  var modal = document.getElementById("profile-modal");

  if (modal && event.target === modal) {
    closeModal();
  }
});

// =========================================
// > initialize preview on load
// =========================================

window.onload = function () {
  resetAppearance();
  updatePreview();

  switchTab("create");
};
