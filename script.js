document.addEventListener('DOMContentLoaded', function() {
    class Drop {
        static color = '#fcb653';
        static minSize = 15;
        static maxSize = 170;
        static minAngle = 44.95;
        static maxAngle = 45.05;
        static speed = 1.0;
        static totalCount = 512;
        
        constructor(xpos = 0, ypos = 0, color = Drop.color) {
            this.pos = [xpos, ypos];
            let sizeRange = Drop.maxSize - Drop.minSize;
            let sizeRandMin = Drop.minSize;
            let sizeRandMax = Drop.maxSize;
            
            let rand = Math.random();
            if (rand < 0.7) {
                sizeRandMin = Drop.minSize;
                sizeRandMax = Drop.minSize + sizeRange / 3;
            } else if (rand < 0.90) {
                sizeRandMin = Drop.minSize + sizeRange / 3;
                sizeRandMax = Drop.maxSize - sizeRange / 3;
            } else {
                sizeRandMin = Drop.maxSize - sizeRange / 3;
                sizeRandMax = Drop.maxSize;
            }
                
            this.size = Math.random() * (sizeRandMax - sizeRandMin) + sizeRandMin;
            this.angle = Math.random() * (Drop.maxAngle - Drop.minAngle) + Drop.minAngle;
            this.color = color;
        }
        
        update() {
            this.pos[0] += 5 * this.size / 75 * Drop.speed;
            this.pos[1] += 20 * this.size / 75 * Drop.speed;
            this.size -= 0.01;
        }
        
        draw(ctx) {
            let startPos = this.pos;
            let endPos = [
                this.pos[0] + this.size / 2 * Math.cos(this.angle),
                this.pos[1] + this.size
            ];
            
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size / 77;
            ctx.beginPath();
            ctx.moveTo(startPos[0], startPos[1]);
            ctx.lineTo(endPos[0], endPos[1]);
            ctx.stroke();
        }
    }

    function newDrop(x, y) {
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        
        let minX = -winWidth;
        let maxX = winWidth;
        let minY = -winHeight;
        let maxY = 0;
        
        let randX = Math.random() * (maxX - minX) + minX;
        let randY = Math.random() * (maxY - minY) + minY;
        
        let xPos = x === undefined ? randX - Drop.maxSize : x;
        let yPos = y === undefined ? randY - Drop.maxSize : y;
        
        return new Drop(xPos, yPos);
    }

    const canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        console.log("Canvas not supported.");
        return;
    }
    const ctx = canvas.getContext('2d');

    let drops = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    setInterval(() => {
        if (drops.length < Drop.totalCount) {
            drops.push(newDrop());
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            let drop = drops[i];
            drop.draw(ctx);
            drop.update();
        }
        
        drops = drops.filter(drop => drop.pos[1] <= canvas.height);
    }, 20);

    // Image slider setup
    const images = ['nail1.jpg', 'nail2.jpg', 'nail3.jpg', 'nail4.jpg', 'nail5.jpg', 'nail6.jpg', 'nail7.jpg'];
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');

document.addEventListener('DOMContentLoaded', function() {
    const images = ['nail1.jpg', 'nail2.jpg', 'nail3.jpg', 'nail4.jpg', 'nail5.jpg', 'nail6.jpg', 'nail7.jpg'];
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');

   document.addEventListener('DOMContentLoaded', function() {
    const images = ['nail1.jpg', 'nail2.jpg', 'nail3.jpg', 'nail4.jpg', 'nail5.jpg', 'nail6.jpg', 'nail7.jpg'];
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');

    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        const newImage = new Image();
        newImage.src = images[currentIndex];
        newImage.onload = function() {
            carousel.src = newImage.src;
            carousel.style.opacity = '1';
        };
        carousel.style.opacity = '0';
    }

    setInterval(changeImage, 3000); // Смена изображения каждые 3 секунды
});


    setInterval(changeImage, 3000); // Смена изображения каждые 3 секунды
});


    function changeImage() {
        carousel.style.opacity = '0';  // Hide the image before changing it
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            carousel.src = images[currentIndex];
            carousel.style.opacity = '1';  // Show the new image
        }, 500);  // Delay to match the transition duration (0.5 seconds)
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds

    // Hide loading screen after content is loaded
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.transition = 'opacity 0.5s ease';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Time to match the transition duration
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commentForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        console.log(`Имя: ${name}`);
        console.log(`Электронная почта: ${email}`);
        console.log(`Комментарий: ${comment}`);

        alert('Спасибо за ваш комментарий!');

        form.reset();
    });
});

