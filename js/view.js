function renderBackground(context) {

}

function renderBulletSource(context) {

}

function renderCharacter(context) {

}

function renderBullets(context) {

}

function renderHazards(context) {

}

function renderScore(context) {

}

function renderSources(context) {

}

function renderAll(context) {
    // Call all render functions. Remember that every call will overlap on top
    // of each other, so order matters. Adjust order as needed.
    renderBackground(context);
    renderBulletSource(context);
    renderCharacter(context);
    renderBullets(context);
    renderHazards(context);
    renderScore(context);
    renderSources(context);
}