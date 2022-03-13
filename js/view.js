function renderBackground(context) {
    context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    context.fillRect(0, 0, document.documentElement.clientWidth, 
        document.documentElement.clientHeight);
}

function renderBulletSource(context) {
    context.fillStyle = 'rgba(100, 80, 12)';
    context.fillRect(bulletSource.x, bulletSource.y, 
                     bulletSource.w, bulletSource.h);
}

function renderCharacter(context) {
    var characterImage = new Image();
    characterImage.src = mainCharacter.imgUrl;
    let x0 = mainCharacter.x;
    let y0 = mainCharacter.y;
    context.drawImage(characterImage, x0, y0, 200, 200);
}

function renderBullets(context) {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
    }
}

function renderHazards(context) {
    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        var hazardImage = new Image();
        hazardImage.src = hazard.imgUrl;
        let x0 = hazard.x;
        let y0 = hazard.y;

        context.drawImage(hazardImage, x0, y0, 300, 300);
    }
}

function renderScore(context) {

}

function renderSources(context) {

}

function renderScript(context) {

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
    renderScript(context);
}