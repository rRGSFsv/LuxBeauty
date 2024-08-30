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
            let sizeRandMin;
            let sizeRandMax;
            
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
    if (!canvas) {
        console.log("Canvas element not found.");
        return;
    }
    if (!canvas.getContext) {
        console.log("Canvas context not supported.");
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
        
        drops.forEach(drop => {
            drop.draw(ctx);
            drop.update();
        });
        
        drops = drops.filter(drop => drop.pos[1] <= canvas.height);
    }, 20);

    // Image slider setup
    const images = ['nail1.jpg', 'nail2.jpg', 'nail3.jpg', 'nail4.jpg', 'nail5.jpg', 'nail6.jpg', 'nail7.jpg'];
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');

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

    // Translation functionality
    const translations = {
        uk: {
            title: "LuxBeauty Studio",
            subtitle: "Персональний догляд для Вашої досконалості",
            description: "LuxBeauty Studio ми пропонуємо професійне італійське нарощування волосся, яке додасть об’єму та довжини вашим локонам. Ми використовуємо лише високоякісні матеріали, забезпечуючи чудовий результат. Також у нас ви можете придбати преміальне натуральне волосся.",
            servicesTitle: "Наші послуги:",
            service1: "Нарощування волосся - це послуга, яка дає змогу домогтися бажаної довжини, об'єму та густоти волосся. Ми пропонуємо якісні та безпечні методики, щоб підкреслити вашу індивідуальність і надати волоссю природного вигляду.",
            service2: "Манікюр - це мистецтво догляду за вашими руками та нігтями. Наші майстри запропонують вам широкий спектр послуг від класичного манікюру до складного дизайну нігтів. Ми використовуємо тільки якісні матеріали та новітні техніки, щоб ваші руки мали ідеальний вигляд.",
            service3: "LuxBeauty Studio ми пропонуємо професійне італійське нарощування волосся, яке додасть об’єму та довжини вашим локонам. Ми використовуємо лише високоякісні матеріали, забезпечуючи чудовий результат.",
            address: "Адреса: Париж, Франція",
            phone: "Телефон: +380980880717, +33766953323",
            hours: "Робочі години: Понеділок - П'ятниця: 9:00 - 18:00",
            contactTitle: "Контакти:"
        },
        fr: {
            title: "LuxBeauty Studio",
            subtitle: "Soins personnalisés pour votre perfection",
            description: "LuxBeauty Studio propose des extensions de cheveux italiennes professionnelles qui ajouteront du volume et de la longueur à vos mèches. Nous utilisons uniquement des matériaux de haute qualité, garantissant un excellent résultat. Vous pouvez également acheter des cheveux naturels de qualité supérieure chez nous.",
            servicesTitle: "Nos services :",
            service1: "Les extensions de cheveux sont un service qui permet d'obtenir la longueur, le volume et la densité de cheveux souhaités. Nous proposons des méthodes de haute qualité et sûres pour mettre en valeur votre individualité et donner un aspect naturel à vos cheveux.",
            service2: "La manucure est un art qui prend soin de vos mains et de vos ongles. Nos maîtres vous proposeront une large gamme de services allant de la manucure classique à la conception complexe des ongles. Nous utilisons uniquement des matériaux de haute qualité et des techniques modernes pour que vos mains aient une apparence parfaite.",
            service3: "LuxBeauty Studio propose des extensions de cheveux italiennes professionnelles qui ajouteront du volume et de la longueur à vos mèches. Nous utilisons uniquement des matériaux de haute qualité, garantissant un excellent résultat. Vous pouvez également acheter des cheveux naturels de qualité supérieure chez nous.",
            address: "Adresse : Paris, France",
            phone: "Téléphone : +380980880717, +33766953323",
            hours: "Heures d'ouverture : Lundi - Vendredi : 9h00 - 18h00",
            contactTitle: "Contacts :"
        },
        en: {
            title: "LuxBeauty Studio",
            subtitle: "Personal care for your perfection",
            description: "LuxBeauty Studio offers professional Italian hair extensions that will add volume and length to your locks. We use only high-quality materials, ensuring an excellent result. You can also purchase premium natural hair from us.",
            servicesTitle: "Our Services:",
            service1: "Hair extensions are a service that allows you to achieve the desired length, volume, and density of your hair. We offer high-quality and safe methods to highlight your individuality and give your hair a natural look.",
            service2: "Manicure is the art of caring for your hands and nails. Our experts will offer you a wide range of services from classic manicure to complex nail designs. We use only high-quality materials and the latest techniques to ensure your hands look perfect.",
            service3: "LuxBeauty Studio offers professional Italian hair extensions that will add volume and length to your locks. We use only high-quality materials, ensuring an excellent result. You can also purchase premium natural hair from us.",
            address: "Address: Paris, France",
            phone: "Phone: +380980880717, +33766953323",
            hours: "Working Hours: Monday - Friday: 9:00 AM - 6:00 PM",
            contactTitle: "Contacts:"
        },
    };

    function setLanguage(lang) {
        const elements = {
            'title': 'title',
            'subtitle': 'subtitle',
            'description': 'description',
            'services-title': 'servicesTitle',
            'service1-description': 'service1',
            'service2-description': 'service2',
            'service3-description': 'service3',
            'contact-title': 'contactTitle',
            'contact-address': 'address',
            'contact-phone': 'phone',
            'contact-hours': 'hours'
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = translations[lang][elements[id]];
            }
        });
    }

    document.querySelectorAll('.lang-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const lang = icon.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Default language setup
    setLanguage('uk'); // or 'fr', 'en' depending on the default language you prefer
});
