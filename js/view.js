function renderBackground(context) {
    context.fillstyle( rgba(0, 0, 0, 0.4));
    context.fillrect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
}

function renderBulletSource(context) {
    context.fillstyle = 'rgba(100, 80, 12)'
    let xMid = document.documentElement.clientWidth / 2
    let y0 = document.documentElement.clientHeight - 75
    context.fillRect(xMid - 40, y0, 80 , 75);
}

function renderCharacter(context) {
    var charachterImage = new Image();
    charachterImage.addEventListener('load' , () => {
        let w = 536;
        let h = 739;
        let x0 = (9 * document.documentElement.clientWidth) / 10;
        let x1 = document.documentElement.clientHeight / 2;
        context.drawImage(charachterImage, )
    });

    charachterImage.src = '../assests/walking_girl.png';
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