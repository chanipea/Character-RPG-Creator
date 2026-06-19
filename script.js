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
    '"shape-rendering="crispEdges">';

  if (!isPortrait) {
    svg += '<rect x="11" y="29" width="10" height="2" fill="rgba(0,0,0,0.1)"/>';
    svg += '<rect x="10" y="30" width="12" height="1" fill="rgba(0,0,0,0.1)"/>';
  }

  // 0. HAIR BACK LAYER
  if (app.hairStyle === 1) {
    svg +=
      '<rect x="9" y="11" width="2" height="9" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="21" y="11" width="2" height="9" fill="' +
      app.hairColor +
      '" />';
  } else if (app.hairStyle === 2) {
    svg +=
      '<rect x="7" y="6" width="18" height="15" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="6" y="7" width="20" height="13" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="5" y="14" width="22" height="4" fill="' +
      app.hairColor +
      '" />';
  } else if (app.hairStyle === 3) {
    svg +=
      '<rect x="8" y="12" width="4" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="7" y="15" width="4" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="8" y="18" width="4" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="6" y="21" width="4" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="20" y="12" width="4" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="21" y="15" width="4" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="20" y="18" width="4" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="22" y="21" width="4" height="4" fill="' +
      app.hairColor +
      '" />';
  }

  // 1. BASE BODY, LEGS, ARMS & HEAD
  svg += '<rect x="13" y="24" width="2" height="4" fill="' + app.skin + '" />';
  svg += '<rect x="17" y="24" width="2" height="4" fill="' + app.skin + '" />';
  svg += '<rect x="14" y="13" width="4" height="2" fill="' + app.skin + '" />';
  svg += '<rect x="12" y="15" width="8" height="9" fill="' + app.skin + '" />';
  svg += '<rect x="10" y="15" width="2" height="7" fill="' + app.skin + '" />';
  svg += '<rect x="20" y="15" width="2" height="7" fill="' + app.skin + '" />';
  svg += '<rect x="12" y="5" width="8" height="8" fill="' + app.skin + '" />';
  svg += '<rect x="11" y="8" width="1" height="2" fill="' + app.skin + '" />';
  svg += '<rect x="20" y="8" width="1" height="2" fill="' + app.skin + '" />';
  svg += '<rect x="13" y="9" width="1" height="2" fill="' + app.eye + '" />';
  svg += '<rect x="18" y="9" width="1" height="2" fill="' + app.eye + '" />';
  svg +=
    '<rect x="12" y="11" width="2" height="1" fill="#cc6666" opacity="0.5"/>';
  svg +=
    '<rect x="18" y="11" width="2" height="1" fill="#cc6666" opacity="0.5"/>';

  // 2. SHOES
  if (app.shoeStyle === 1) {
    svg +=
      '<rect x="12" y="27" width="3" height="2" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="17" y="27" width="3" height="2" fill="' +
      app.shoeColor +
      '" />';
    svg += '<rect x="12" y="29" width="3" height="1" fill="#ffffff" />';
    svg += '<rect x="17" y="29" width="3" height="1" fill="#ffffff" />';
    svg += '<rect x="12" y="26" width="3" height="1" fill="#ffffff" />';
    svg += '<rect x="17" y="26" width="3" height="1" fill="#ffffff" />';
  } else if (app.shoeStyle === 2) {
    svg +=
      '<rect x="12" y="29" width="3" height="1" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="17" y="29" width="3" height="1" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="12" y="27" width="3" height="1" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="17" y="27" width="3" height="1" fill="' +
      app.shoeColor +
      '" />';
  } else if (app.shoeStyle === 3) {
    svg +=
      '<rect x="11" y="26" width="4" height="4" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="17" y="26" width="4" height="4" fill="' +
      app.shoeColor +
      '" />';
  } else if (app.shoeStyle === 4) {
    svg +=
      '<rect x="11" y="28" width="4" height="2" fill="' +
      app.shoeColor +
      '" />';
    svg +=
      '<rect x="17" y="28" width="4" height="2" fill="' +
      app.shoeColor +
      '" />';
  } else {
    svg +=
      '<rect x="12" y="28" width="3" height="2" fill="' + app.skin + '" />';
    svg +=
      '<rect x="17" y="28" width="3" height="2" fill="' + app.skin + '" />';
  }

  // 3. CLOTHES
  if (app.clothesStyle === 1) {
    svg += '<rect x="13" y="15" width="6" height="4" fill="#6699cc" />';
    svg += '<rect x="13" y="14" width="1" height="1" fill="#6699cc" />';
    svg += '<rect x="18" y="14" width="1" height="1" fill="#6699cc" />';
    svg += '<rect x="12" y="19" width="8" height="5" fill="#ffffff" />';
    svg +=
      '<rect x="10" y="15" width="4" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="18" y="15" width="4" height="6" fill="' +
      app.clothesColor +
      '" />';
  } else if (app.clothesStyle === 2) {
    svg += '<rect x="13" y="14" width="6" height="6" fill="#ffffff" />';
    svg += '<rect x="12" y="19" width="8" height="5" fill="#88aacc" />';
    svg +=
      '<rect x="15" y="21" width="2" height="3" fill="' + app.skin + '" />';
    svg +=
      '<rect x="12" y="15" width="3" height="5" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="17" y="15" width="3" height="5" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="10" y="15" width="2" height="3" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="20" y="15" width="2" height="3" fill="' +
      app.clothesColor +
      '" />';
  } else if (app.clothesStyle === 3) {
    svg +=
      '<rect x="11" y="15" width="10" height="9" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="10" y="15" width="2" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="20" y="15" width="2" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg += '<rect x="11" y="19" width="10" height="1" fill="#eebb44" />';
    svg += '<rect x="16" y="20" width="1" height="3" fill="#eebb44" />';
  } else if (app.clothesStyle === 4) {
    svg += '<rect x="12" y="21" width="8" height="4" fill="#667788" />';
    svg +=
      '<rect x="15" y="22" width="2" height="3" fill="' + app.skin + '" />';
    svg +=
      '<rect x="11" y="14" width="10" height="7" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="10" y="15" width="2" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="20" y="15" width="2" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="13" y="18" width="6" height="2" fill="#000000" opacity="0.2" />';
    svg +=
      '<rect x="14" y="17" width="4" height="1" fill="#000000" opacity="0.2" />';
  } else if (app.clothesStyle === 5) {
    svg += '<rect x="12" y="21" width="8" height="4" fill="#7799cc" />';
    svg +=
      '<rect x="15" y="22" width="2" height="3" fill="' + app.skin + '" />';
    svg += '<rect x="12" y="15" width="8" height="6" fill="#ffffff" />';
    svg += '<rect x="12" y="14" width="2" height="1" fill="#ffffff" />';
    svg += '<rect x="18" y="14" width="2" height="1" fill="#ffffff" />';
    svg +=
      '<rect x="14" y="17" width="4" height="3" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="15" y="20" width="2" height="1" fill="' +
      app.clothesColor +
      '" />';
  } else {
    svg += '<rect x="12" y="20" width="8" height="4" fill="#ddcc99" />';
    svg +=
      '<rect x="15" y="22" width="2" height="2" fill="' + app.skin + '" />';
    svg += '<rect x="13" y="15" width="6" height="5" fill="#ffffff" />';
    svg += '<rect x="13" y="16" width="6" height="1" fill="#eebb44" />';
    svg += '<rect x="13" y="18" width="6" height="1" fill="#eebb44" />';
    svg +=
      '<rect x="11" y="15" width="3" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="18" y="15" width="3" height="6" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="10" y="15" width="2" height="5" fill="' +
      app.clothesColor +
      '" />';
    svg +=
      '<rect x="20" y="15" width="2" height="5" fill="' +
      app.clothesColor +
      '" />';
  }

  // 4. FACE ACCESSORIES
  if (app.faceStyle === 2) {
    svg +=
      '<rect x="11" y="8" width="4" height="1" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="11" y="10" width="4" height="1" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="11" y="8" width="1" height="3" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="14" y="8" width="1" height="3" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="17" y="8" width="4" height="1" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="17" y="10" width="4" height="1" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="17" y="8" width="1" height="3" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="20" y="8" width="1" height="3" fill="' + app.faceColor + '"/>';
    svg +=
      '<rect x="15" y="9" width="2" height="1" fill="' + app.faceColor + '"/>';
  } else if (app.faceStyle === 3) {
    svg +=
      '<rect x="11" y="11" width="10" height="4" fill="' +
      app.faceColor +
      '" />';
    svg +=
      '<rect x="12" y="15" width="8" height="2" fill="' +
      app.faceColor +
      '" />';
    svg +=
      '<rect x="14" y="17" width="4" height="2" fill="' +
      app.faceColor +
      '" />';
  } else if (app.faceStyle === 4) {
    svg +=
      '<rect x="11" y="11" width="10" height="2" fill="' +
      app.hairColor +
      '"/>';
    svg +=
      '<rect x="12" y="13" width="8" height="2" fill="' + app.hairColor + '"/>';
    svg +=
      '<rect x="13" y="15" width="6" height="1" fill="' + app.hairColor + '"/>';
  } else if (app.faceStyle === 5) {
    svg +=
      '<rect x="10" y="8" width="5" height="3" fill="' + app.faceColor + '" />';
    svg +=
      '<rect x="17" y="8" width="5" height="3" fill="' + app.faceColor + '" />';
    svg +=
      '<rect x="15" y="9" width="2" height="1" fill="' + app.faceColor + '"/>';
  }

  // 5. HAIR FRONT
  if (app.hairStyle === 1) {
    svg +=
      '<rect x="8" y="1" width="4" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="7" y="2" width="6" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="20" y="1" width="4" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="2" width="6" height="4" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="8" y="5" width="4" height="2" fill="' + app.headColor + '" />';
    svg +=
      '<rect x="20" y="5" width="4" height="2" fill="' + app.headColor + '" />';
    svg +=
      '<rect x="11" y="4" width="10" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="10" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="13" y="5" width="1" height="2" fill="#000000" opacity="0.15" />';
    svg +=
      '<rect x="15" y="5" width="2" height="2" fill="#000000" opacity="0.15" />';
    svg +=
      '<rect x="18" y="5" width="1" height="2" fill="#000000" opacity="0.15" />';
  } else if (app.hairStyle === 2) {
    svg +=
      '<rect x="11" y="3" width="10" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="15" y="0" width="2" height="3" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="14" y="2" width="1" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="10" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="11" y="7" width="2" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="7" width="2" height="2" fill="' + app.hairColor + '" />';
  } else if (app.hairStyle === 3) {
    svg +=
      '<rect x="10" y="3" width="12" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="9" y="6" width="3" height="7" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="20" y="6" width="3" height="7" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="11" y="7" width="2" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="7" width="2" height="2" fill="' + app.hairColor + '" />';
  } else if (app.hairStyle === 4) {
    svg +=
      '<rect x="10" y="3" width="12" height="5" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="11" y="2" width="10" height="7" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="9" y="5" width="14" height="3" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="10" y="9" width="3" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="9" width="3" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="11" y="8" width="10" height="2" fill="' +
      app.hairColor +
      '" />';
  } else if (app.hairStyle === 5) {
    svg +=
      '<rect x="11" y="3" width="10" height="3" fill="' +
      app.hairColor +
      '" opacity="0.85" />';
    svg +=
      '<rect x="11" y="6" width="2" height="2" fill="' +
      app.hairColor +
      '" opacity="0.85" />';
    svg +=
      '<rect x="19" y="6" width="2" height="2" fill="' +
      app.hairColor +
      '" opacity="0.85" />';
  } else if (app.hairStyle === 6) {
    svg +=
      '<rect x="10" y="3" width="12" height="4" fill="' +
      app.hairColor +
      '" />';
    svg +=
      '<rect x="9" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="20" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="10" y="6" width="3" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="6" width="3" height="2" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="12" y="8" width="1" height="1" fill="' + app.hairColor + '" />';
    svg +=
      '<rect x="19" y="8" width="1" height="1" fill="' + app.hairColor + '" />';
  }

  // Subtle Hair Highlights
  if (app.hairStyle !== 3 && app.hairStyle !== 6) {
    svg +=
      '<rect x="12" y="4" width="3" height="1" fill="#ffffff" opacity="0.3" />';
    svg +=
      '<rect x="16" y="3" width="2" height="1" fill="#ffffff" opacity="0.3" />';
  } else if (app.hairStyle === 6) {
    svg +=
      '<rect x="11" y="3" width="3" height="1" fill="#ffffff" opacity="0.2" />';
    svg +=
      '<rect x="16" y="3" width="2" height="1" fill="#ffffff" opacity="0.2" />';
  }

  // 6. HEADWEAR
  if (app.headStyle === 2) {
    svg +=
      '<rect x="11" y="4" width="10" height="2" fill="' + app.headColor + '"/>';
  } else if (app.headStyle === 3) {
    svg += '<rect x="16" y="3" width="3" height="3" fill="#ffb6c1" />';
    svg += '<rect x="17" y="4" width="1" height="1" fill="#ffeeaa" />';
    svg += '<rect x="19" y="5" width="3" height="3" fill="#ffb6c1" />';
    svg += '<rect x="20" y="6" width="1" height="1" fill="#ffeeaa" />';
  } else if (app.headStyle === 4) {
    svg += '<rect x="10" y="3" width="12" height="1" fill="#eebb44" />';
    svg += '<rect x="12" y="1" width="4" height="3" fill="#eebb44" />';
    svg += '<rect x="16" y="1" width="4" height="3" fill="#eebb44" />';
    svg += '<rect x="13" y="2" width="2" height="1" fill="#6699cc" />';
    svg += '<rect x="17" y="2" width="2" height="1" fill="#6699cc" />';
  } else if (app.headStyle === 5) {
    svg +=
      '<rect x="12" y="0" width="8" height="3" fill="' + app.headColor + '"/>';
    svg +=
      '<rect x="11" y="1" width="10" height="2" fill="' + app.headColor + '"/>';
    svg +=
      '<rect x="9" y="3" width="14" height="2" fill="' + app.headColor + '"/>';
    svg +=
      '<rect x="11" y="2" width="10" height="1" fill="#000000" opacity="0.15"/>';
  }

  svg += "</svg>";
  return svg;
}

function updatePreview() {
  var previewElement = document.getElementById("live-sprite");
  previewElement.innerHTML = generateSpriteSVG(appState.appearance, false);
}

// =========================================
// > interactivity functions
// =========================================

// EVENT LISTENERS
var colorInputsList = [
  "skin",
  "eye",
  "hair",
  "clothes",
  "shoe",
  "face",
  "head",
];
for (var i = 0; i < colorInputsList.length; i++) {
  bindColorInput(colorInputsList[i]);
}

function bindColorInput(inputId) {
  var inputElement = document.getElementById("c-" + inputId);

  inputElement.addEventListener("input", function (event) {
    var appearanceKey = inputId;

    if (inputId === "hair") {
      appearanceKey = "hairColor";
    } else if (inputId === "clothes") {
      appearanceKey = "clothesColor";
    } else if (inputId === "shoe") {
      appearanceKey = "shoeColor";
    } else if (inputId === "face") {
      appearanceKey = "faceColor";
    } else if (inputId === "head") {
      appearanceKey = "headColor";
    }

    appState.appearance[appearanceKey] = event.target.value;
    updatePreview();
  });
}

// STYLE CYCLING
function cycleStyle(styleType) {
  if (styleType === "hair") {
    if (appState.appearance.hairStyle >= 6) {
      appState.appearance.hairStyle = 1;
    } else {
      appState.appearance.hairStyle++;
    }
  } else if (styleType === "clothes") {
    if (appState.appearance.clothesStyle >= 6) {
      appState.appearance.clothesStyle = 1;
    } else {
      appState.appearance.clothesStyle++;
    }
  } else if (styleType === "shoe") {
    if (appState.appearance.shoeStyle >= 5) {
      appState.appearance.shoeStyle = 1;
    } else {
      appState.appearance.shoeStyle++;
    }
  } else if (styleType === "face") {
    if (appState.appearance.faceStyle >= 5) {
      appState.appearance.faceStyle = 1;
    } else {
      appState.appearance.faceStyle++;
    }
  } else if (styleType === "head") {
    if (appState.appearance.headStyle >= 5) {
      appState.appearance.headStyle = 1;
    } else {
      appState.appearance.headStyle++;
    }
  }

  updatePreview();
}

// ---------------------------------------------------------
// > randomization and reset functions
// ---------------------------------------------------------

function resetAppearance() {
  appState.appearance = Object.assign({}, defaultAppearance);

  var ids = ["skin", "eye", "hair", "clothes", "shoe", "face", "head"];

  for (var i = 0; i < ids.length; i++) {
    var currentId = ids[i];
    var appearanceKey = currentId;

    if (currentId === "hair") appearanceKey = "hairColor";
    else if (currentId === "clothes") appearanceKey = "clothesColor";
    else if (currentId === "shoe") appearanceKey = "shoeColor";
    else if (currentId === "face") appearanceKey = "faceColor";
    else if (currentId === "head") appearanceKey = "headColor";

    var inputElement = document.getElementById("c-" + currentId);
    if (inputElement) {
      inputElement.value = appState.appearance[appearanceKey];
    }
  }

  updatePreview();
}

function randomizeAppearance() {
  function getRandomColor() {
    var hexCharacters = "0123456789ABCDEF";
    var randomColor = "#";
    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * 16);
      randomColor += hexCharacters[randomIndex];
    }
    return randomColor;
  }

  var skinTones = [
    "#ffdbac",
    "#f1c27d",
    "#e0ac69",
    "#8d5524",
    "#c68642",
    "#3d2210",
    "#ffc1cc",
    "#e5c298",
    "#ffb38a",
  ];
  var randomSkinIndex = Math.floor(Math.random() * skinTones.length);

  appState.appearance = {
    skin: skinTones[randomSkinIndex],
    eye: getRandomColor(),
    hairColor: getRandomColor(),
    hairStyle: Math.floor(Math.random() * 6) + 1,
    clothesColor: getRandomColor(),
    clothesStyle: Math.floor(Math.random() * 6) + 1,
    shoeColor: getRandomColor(),
    shoeStyle: Math.floor(Math.random() * 5) + 1,
    faceColor: getRandomColor(),
    faceStyle: Math.floor(Math.random() * 5) + 1,
    headColor: getRandomColor(),
    headStyle: Math.floor(Math.random() * 5) + 1,
  };

  var ids = ["skin", "eye", "hair", "clothes", "shoe", "face", "head"];

  for (var i = 0; i < ids.length; i++) {
    var currentId = ids[i];
    var appearanceKey = currentId;

    if (currentId === "hair") appearanceKey = "hairColor";
    else if (currentId === "clothes") appearanceKey = "clothesColor";
    else if (currentId === "shoe") appearanceKey = "shoeColor";
    else if (currentId === "face") appearanceKey = "faceColor";
    else if (currentId === "head") appearanceKey = "headColor";

    var inputElement = document.getElementById("c-" + currentId);
    if (inputElement) {
      inputElement.value = appState.appearance[appearanceKey];
    }
  }

  updatePreview();
}

function clearForm() {
  document.getElementById("f-name").value = "";
  document.getElementById("f-gender").value = "";
  document.getElementById("f-bday").value = "";
  document.getElementById("f-farm").value = "";
  document.getElementById("f-status").value = "";
  document.getElementById("f-loved").value = "";
  document.getElementById("f-liked").value = "";
  resetAppearance();
}

// ---------------------------------------------------------
// > UI and tab switching
// ---------------------------------------------------------

var currentView = "create";
var isAnimating = false;

function switchTab(view) {
  if (currentView === view || isAnimating === true) {
    return;
  }

  isAnimating = true;

  var oldLeft = document.getElementById("view-" + currentView + "-left");
  var oldRight = document.getElementById("view-" + currentView + "-right");
  var newLeft = document.getElementById("view-" + view + "-left");
  var newRight = document.getElementById("view-" + view + "-right");

  var isForward = false;
  if (view === "roster") {
    isForward = true;
  }

  var elements = [oldLeft, oldRight, newLeft, newRight];

  for (var i = 0; i < elements.length; i++) {
    if (elements[i]) {
      elements[i].classList.remove("hidden");
      elements[i].classList.remove("turn-forward-front");
      elements[i].classList.remove("turn-forward-back");
      elements[i].classList.remove("turn-backward-front");
      elements[i].classList.remove("turn-backward-back");
      elements[i].style.zIndex = "";
    }
  }

  if (isForward === true) {
    oldLeft.style.zIndex = "10";
    newRight.style.zIndex = "10";
    oldRight.style.zIndex = "20";
    newLeft.style.zIndex = "20";

    oldRight.classList.add("turn-forward-front");
    newLeft.classList.add("turn-forward-back");

    renderRoster();
  } else {
    oldRight.style.zIndex = "10";
    newLeft.style.zIndex = "10";
    oldLeft.style.zIndex = "20";
    newRight.style.zIndex = "20";

    oldLeft.classList.add("turn-backward-front");
    newRight.classList.add("turn-backward-back");
  }

  var allTabs = document.querySelectorAll(".book-tab");
  for (var t = 0; t < allTabs.length; t++) {
    allTabs[t].classList.remove("active-tab");
  }
  document.getElementById("tab-" + view).classList.add("active-tab");

  setTimeout(function () {
    oldLeft.classList.add("hidden");
    oldRight.classList.add("hidden");

    for (var j = 0; j < elements.length; j++) {
      if (elements[j]) {
        elements[j].classList.remove("turn-forward-front");
        elements[j].classList.remove("turn-forward-back");
        elements[j].classList.remove("turn-backward-front");
        elements[j].classList.remove("turn-backward-back");
        elements[j].style.zIndex = "";
      }
    }

    currentView = view;
    isAnimating = false;
  }, 600);
}

// ---------------------------------------------------------
// > saving and rendering data
// ---------------------------------------------------------
function handleSaveButton() {
  saveCharacter();
}

function parseGifts(inputString) {
  var rawItems = inputString.split(",");
  var validItems = [];

  for (var i = 0; i < rawItems.length; i++) {
    var trimmedItem = rawItems[i].trim();
    if (trimmedItem !== "") {
      validItems.push(trimmedItem);
    }
  }

  if (validItems.length === 0) {
    return '<div class="empty-state" style="margin-top:0">None specified</div>';
  }

  var htmlResult = "";
  for (var j = 0; j < validItems.length; j++) {
    var item = validItems[j];
    var displayText = item;

    var hasNonLatinCharacters = /[\u1000-\uFFFF]/.test(item);

    if (item.length > 20 && hasNonLatinCharacters === false) {
      displayText = item.substring(0, 3).toUpperCase();
    }

    htmlResult +=
      '<div class="item-slot" title="' + item + '">' + displayText + "</div>";
  }

  return htmlResult;
}

function renderRoster() {
  var grid = document.getElementById("roster-grid");
  var emptyState = document.getElementById("empty-state");

  if (appState.characters.length > 0) {
    if (emptyState !== null) {
      emptyState.style.display = "none";
    }
    var lastIndex = appState.characters.length - 1;
    var latestCharacter = appState.characters[lastIndex];

    document.getElementById("roster-preview-placeholder").style.display =
      "none";
    document.getElementById("roster-preview-sprite").innerHTML =
      generateSpriteSVG(latestCharacter.appearance, true);
  }

  grid.innerHTML = "";
  for (var i = 0; i < appState.characters.length; i++) {
    createCharacterCard(appState.characters[i], i, grid);
  }
}

function createCharacterCard(characterData, index, gridElement) {
  var card = document.createElement("div");
  card.className = "roster-card inset-shadow animate-pop";

  card.onclick = function () {
    openModal(index);
  };

  card.onmouseenter = function () {
    document.getElementById("roster-preview-sprite").innerHTML =
      generateSpriteSVG(characterData.appearance, true);
  };

  var miniSvg = generateSpriteSVG(characterData.appearance, false);

  card.innerHTML =
    '<div class="rc-sprite-container">' +
    miniSvg +
    "</div>" +
    '<p class="rc-name">' +
    characterData.name +
    "</p>" +
    '<p class="rc-status">' +
    characterData.status +
    "</p>";

  gridElement.appendChild(card);
}

function saveCharacter() {
  var nameVal = document.getElementById("f-name").value.trim();
  if (nameVal === "") nameVal = "Mysterious Farmer";

  var genderVal = document.getElementById("f-gender").value.trim();
  if (genderVal === "") genderVal = "Unknown";

  var bdayVal = document.getElementById("f-bday").value.trim();
  if (bdayVal === "") bdayVal = "Unknown";

  var farmVal = document.getElementById("f-farm").value.trim();
  if (farmVal === "") farmVal = "Unknown";

  var statusVal = document.getElementById("f-status").value.trim();
  if (statusVal === "") statusVal = "Unknown";

  var newCharacter = {
    name: nameVal,
    gender: genderVal,
    bday: bdayVal,
    farm: farmVal,
    status: statusVal,
    loved: document.getElementById("f-loved").value,
    liked: document.getElementById("f-liked").value,
    appearance: Object.assign({}, appState.appearance),
  };

  appState.characters.push(newCharacter);
  clearForm();
}

function openModal(index) {
  var character = appState.characters[index];
  if (character === undefined) return;

  document.getElementById("m-name").innerText = character.name;
  document.getElementById("m-gender").innerText = character.gender;
  document.getElementById("m-bday").innerText = character.bday;
  document.getElementById("m-farm").innerText = character.farm;
  document.getElementById("m-status").innerText = character.status;

  document.getElementById("m-portrait").innerHTML = generateSpriteSVG(
    character.appearance,
    true,
  );
  document.getElementById("m-loved-grid").innerHTML = parseGifts(
    character.loved,
  );
  document.getElementById("m-liked-grid").innerHTML = parseGifts(
    character.liked,
  );

  var modalElement = document.getElementById("profile-modal");
  modalElement.classList.add("flex");
}

function closeModal() {
  var modalElement = document.getElementById("profile-modal");
  modalElement.classList.remove("flex");
}

document
  .getElementById("profile-modal")
  .addEventListener("click", function (event) {
    if (event.target.id === "profile-modal") {
      closeModal();
    }
  });

window.onload = function () {
  resetAppearance();
};
