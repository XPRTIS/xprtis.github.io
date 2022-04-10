// Class for rendering views of the game.

// This is the main view. Only put rendering/updating code in here that will
// persist throughout the entire experience.
class View {
    constructor() {
        this.name = "View";
    }

    renderAll(context) {}
}

class StartScreenView extends View { // subclass of View
    constructor() {
        super();
        this.name = "StartScreenView";
    }

    renderAll(context) {
        // super(context);
        // Write render code here.
        this.renderBackground(context);
        this.renderTitle(context);
        this.renderInstructions(context);
    }

    renderInstructions(context) {
        let text = "↓ Press Space to play! ↓";
        var textWidth = context.measureText(text).width;
        context.font = "30px Helvetica";
        context.fillStyle = 'rgba(255, 255, 255)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2 , 
                         document.documentElement.clientHeight*0.6);
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/mainBG.jpg';
        let bgWidth = document.documentElement.clientWidth
        let bgHeight = document.documentElement.clientHeight
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight)

    }

    renderTitle(context) {
        var titleImage = new Image();
        titleImage.src = 'assets/title.webp';
        let titleWidth = document.documentElement.clientWidth / 4
        let titleHeight = document.documentElement.clientHeight / 4 
        let x0 = document.documentElement.clientWidth / 2 - titleWidth / 2
        let y0 = document.documentElement.clientHeight * 0.3
        context.drawImage(titleImage, x0, y0, titleWidth, titleHeight)
    }
}

class LevelView extends View{
    constructor() {
        super();
        this.name = "levelView";
    }

    renderAll(context) {
        this.renderLv1(context);
        this.renderLv2(context);
        this.renderLv3(context);
        this.renderLv4(context);
        this.renderLv5(context);
        this.renderLv6(context);
    }

    renderLv1(context) {
        var lv1 = new Image();
        lv1.src = 'assets/1.png';
        let imgWidth = document.documentElement.clientWidth / 6
        let imgHeight = document.documentElement.clientHeight / 6 
        let x0 = document.documentElement.clientWidth *2 / 7 - titleWidth*2 / 7
        let y0 = document.documentElement.clientHeight * 0.1
        context.drawImage(titleImage, x0, y0, imgWidth, imgHeight)
    }
}

class GameView extends View{
    constructor() {
        super();
        this.name = "GameView";
    }

    renderAll(context) {
        // super(context);
        // Call all render functions. Remember that every call will overlap on
        // top of each other, so order matters. Adjust order as needed.
        this.renderBackground(context);
        this.renderBulletSource(context);
        this.renderCharacter(context);
        this.renderBullets(context);
        this.renderHazards(context);
        this.renderScore(context);
        this.renderSources(context);
        this.renderScript(context);
    }

    renderBackground(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }
    
    renderBulletSource(context) {
        context.save();
        context.translate(bulletSource.x, bulletSource.y + bulletSource.h / 2);
        context.rotate(bulletSource.angle);
        context.fillStyle = 'rgba(100, 80, 12, 1.0)';
        context.fillRect(0, -bulletSource.h / 2, 
                         bulletSource.w, bulletSource.h);
        context.restore();
    }
    
    renderCharacter(context) {
        mainCharacter.draw(context);
    }
    
    renderBullets(context) {
        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            context.fillStyle = 'rgba(0, 0, 255, 1)';
            context.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
        }
    }
    
    renderHazards(context) {
        for (let i = 0; i < hazards.length; i++) {
            let hazard = hazards[i];
            var hazardImage = new Image();
            hazardImage.src = hazard.imgUrl;
            let x0 = hazard.x;
            let y0 = hazard.y;
    
            context.drawImage(hazardImage, x0, y0, 300, 300);
        }
    }
    
    renderScore(context) {
    
    }
    
    renderSources(context) {
    
    }
    
    renderScript(context) {
    
    }
}