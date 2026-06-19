// =========================================
// > core logic for character sprite generation and state management
// =========================================

var defaultAppearance = {
    skin: '#eec3a3',
    eye: '#3377aa',
    hairColor: '#2b2d3e',
    hairStyle: 1,
    clothesColor: '#39707e',
    clothesStyle: 1,
    shoeColor: '#333333',
    shoeStyle: 1,
    faceColor: '#8b2f2f',
    faceStyle: 1,
    headColor: '#6699cc',
    headStyle: 1
};

var appState = {
    appearance: Object.assign({}, defaultAppearance),
    characters: []
};

// =========================================
// > sprite rendering
// =========================================

function generateSpriteSVG(app) {
    var svg =
        '<svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">';

    svg += '<rect x="12" y="15" width="8" height="9" fill="' + app.skin + '" />';
    svg += '<rect x="12" y="5" width="8" height="8" fill="' + app.skin + '" />';

    svg += '<rect x="13" y="9" width="1" height="2" fill="' + app.eye + '" />';
    svg += '<rect x="18" y="9" width="1" height="2" fill="' + app.eye + '" />';

    if (app.hairStyle === 1) {
        svg += '<rect x="11" y="4" width="10" height="4" fill="' + app.hairColor + '" />';
        svg += '<rect x="10" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
        svg += '<rect x="19" y="6" width="3" height="6" fill="' + app.hairColor + '" />';
    } else {
        svg += '<rect x="10" y="3" width="12" height="4" fill="' + app.hairColor + '" />';
    }

    if (app.clothesStyle === 1) {
        svg += '<rect x="12" y="19" width="8" height="5" fill="#ffffff" />';
        svg += '<rect x="10" y="15" width="4" height="6" fill="' + app.clothesColor + '" />';
        svg += '<rect x="18" y="15" width="4" height="6" fill="' + app.clothesColor + '" />';
        svg += '<rect x="13" y="15" width="6" height="4" fill="#6699cc" />';
    } else {
        svg += '<rect x="11" y="15" width="10" height="9" fill="' + app.clothesColor + '" />';
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