export default class GradientAnimation {
    constructor() {
        this.cnv = document.querySelector(`canvas`);
        this.ctx = this.cnv.getContext(`2d`);

        this.circlesNum = 15;
        this.minRadius = 400;
        this.maxRadius = 400;
        this.speed = .005;

        (window.onresize = () => {
            this.setCanvasSize();
            this.createCircles();
        })();
        this.drawAnimation();

    }

    setCanvasSize() {
        this.w = this.cnv.width = innerWidth * devicePixelRatio;
        this.h = this.cnv.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
            this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
        }
    }

    drawCircles() {
        this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
    }
}

class Circle {
    constructor(w, h, minR, maxR) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * (maxR - minR) + minR;

        const random1 = Math.random() * 70 + Math.random() * 60 + Math.random() * 60 + 260;
        const random2 = Math.random() * 70 + Math.random() * 60 + Math.random() * 60 + 260;

        this.firstColor = `hsla(${random1}, 100%, 70%, 1)`;
        this.secondColor = `hsla(${random2}, 100%, 50%, 0)`;

        console.log(this.firstColor, this.secondColor)
    }

    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `overlay`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}