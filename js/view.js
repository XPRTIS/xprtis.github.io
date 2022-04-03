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
        this.renderInstructions(context);
        this.renderBackground(context);
    }

    renderInstructions(context) {
        let text = "↓ Press Space to play! ↓";
        var textWidth = context.measureText(text).width;
        context.font = "30px Helvetica";
        context.fillStyle = 'rgba(0, 0, 0)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2 , 
                         document.documentElement.clientHeight*0.6);
    }

    renderBackground(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
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
        var characterImage = new Image();
        characterImage.src = mainCharacter.imgUrl;
        let x0 = mainCharacter.x;
        let y0 = mainCharacter.y;
        context.drawImage(characterImage, x0, y0, 200, 200);
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