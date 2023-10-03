/**
 * @author Yasunobu Ikeda
 */

window.addEventListener('load',() => {
    new Light();
});

class Light{

    constructor(){

        // Stage
        this.stage = new createjs.Stage('canvasBg');

        // Object
        this.shape = new Shape();
        this.stage.addChild(this.shape);

        // Ticker
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', this.tickerHandle, this);

        // Resize
        this.resizeHandle();
        window.addEventListener('resize',() => {
            this.resizeHandle();
        });

    }

    // Ticker event
    tickerHandle(){
        this.shape.drawContents(innerWidth, innerHeight);
        this.stage.update();
    }

    // Resize event
    resizeHandle(){
        this.stage.canvas.width = innerWidth;
        this.stage.canvas.height = innerHeight;
    }

}

class Shape extends createjs.Shape {

    constructor(){ super(); }

    drawContents(w, h) {

        // graphics reset
        this.graphics
        .clear()
        .beginFill(createjs.Graphics.getHSL(255, 255, 255, 0))
        .drawRect(0, 0, w, h);

        // circle
        {
            const dx = w * 1 / 2 + w / 2 * Math.sin(Date.now() / 15000); // X
            const dy = h * 1 / 2 + h / 2 * Math.sin(Date.now() / 15000);; // Y
			const size = w / 3; // size

            // flower
            this.graphics.beginRadialGradientFill([createjs.Graphics.getHSL(160, 95.4, 34.1, 0.2),
            createjs.Graphics.getHSL(160, 95.4, 34.1, 0)], [0.0, 1.0], dx, dy, 0, dx, dy, size)
            .drawCircle(dx, dy, size)
            .endFill();
        }
    }
}
