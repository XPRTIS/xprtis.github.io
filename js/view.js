function renderBackground(context) {
    context.fillStyle = 'rgba(0, 0, 0, 0.4)');
    context.fillrect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
}

function renderBulletSource(context) {
    context.fillStyle = 'rgba(100, 80, 12)';
    let xMid = document.documentElement.clientWidth / 2
    let y0 = document.documentElement.clientHeight - 75
    context.fillRect(xMid - 40, y0, 80 , 75);
}

function renderCharacter(context) {
    var charachterImage = new Image();
    charachterImage.addEventListener('load' , () => {
        let w = 536;
        let h = 739;
        let x0 = mainCharacter.x
        let x1 = mainCharacter.y
        charachterImage.src = 'assests/walking_girl.png';
        context.drawImage(charachterImage, 0, 0)
    });

}

function renderBullets(context) {
    for (let i = 0; i <bullets.length; i++) {
        let bullet = bullet[i];
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillRect(bullet.x, bullet.y, w, h);
    }

    
}

function renderHazards(context) {
    for (let i = 0; i < hazards.length; i++) {
        let hazards = hazards[i];
        var hazardImage = new Image();
        hazardImage.src = hazard.imgUrl;
        let x0 = hazard.x;
        let y0 = hazard.y;

        context.drawImage(hazardimage)
    }
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