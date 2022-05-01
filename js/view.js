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
        context.fillStyle = 'rgba(255, 255, 255, 0)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2, 
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
        this.name = "LevelView";
    }

    renderAll(context) {
        this.renderBackground(context);
        this.renderLv1(context);
        
    }

    renderBackground(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }

    renderLv1(context) {
        context.fillStyle = 'rgba(255, 255, 255, 1)'
        let imgWidth = document.documentElement.clientWidth / 10
        let imgHeight = document.documentElement.clientHeight / 6 
        let x0 = document.documentElement.clientWidth *1 / 7 - imgWidth*1 / 7
        let y0 = document.documentElement.clientHeight * 0.1
        context.fillRect(x0, y0, imgWidth, imgHeight)
        context.fillStyle = 'rgba(0, 0, 0, 1)'
        context.fillText('1', x0, y0)
    }
}

class GameView extends View {
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

    // renderInstructions(context) {
    //     let text = "↓ Press Space to play! ↓";
    //     // var textWidth = context.measureText(text).width;
    //     context.font = "30px Helvetica";
    //     context.fillStyle = 'rgba(255, 255, 255, 0)';
    //     context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2, 
    //                      document.documentElement.clientHeight*0.6);
    // }
    
    renderScore(context) {
        // Create background box:
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(0.8 * document.documentElement.clientWidth, 0,
                         0.2 * document.documentElement.clientWidth,  
                         0.05 * document.documentElement.clientHeight);
        
        // Draw score:
        // let text = mainCharacter.score.toString();
        let text = "Score: " + mainCharacter.score;
        context.font = "30px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.82 * document.documentElement.clientWidth, 35);
        
    }
    
    renderSources(context) {
    
    }
    
    renderScript(context) {
    
    }

}