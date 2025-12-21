// 1. Scroll Reveal Animation Logic
const revealElements = () => {
    const reveals = document.querySelectorAll('.section, .timeline-item, .edu-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 }); // Triggers when 15% of the element is visible

    reveals.forEach(el => {
        el.classList.add('reveal'); // Add base class
        observer.observe(el);
    });
};

// 2. Navbar Background Blur on Scroll
const handleNavScroll = () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(2, 6, 23, 0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
};

// 3. Simple Form Submission Feedback
const form = document.querySelector('.contact-form');
if(form) {
    form.addEventListener('submit', () => {
        const btn = form.querySelector('button');
        btn.innerText = "Sending...";
        btn.style.opacity = "0.7";
    });
}

// Initialize all functions
window.addEventListener('scroll', handleNavScroll);
window.addEventListener('DOMContentLoaded', () => {
    revealElements();
});

// Mobile Menu Logic (Same as before)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100; // Trigger when 100px of the element is seen

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Also run once on page load in case the user starts at the bottom
window.addEventListener('load', revealOnScroll);
const canvas = document.getElementById('technology-bg');
const ctx = canvas.getContext('2d');

let particles = [];
const properties = {
    bgColor: 'rgba(2, 6, 23, 1)',
    particleColor: 'rgba(0, 255, 136, 0.5)', // Neon Green from your theme
    lineColor: 'rgba(0, 255, 136, 0.1)',
    particleRadius: 2,
    particleCount: 80,
    particleMaxVelocity: 0.5,
    lineMaxDist: 150,
};

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
    }

    update() {
        if (this.x + this.velocityX > canvas.width || this.x + this.velocityX < 0) this.velocityX *= -1;
        if (this.y + this.velocityY > canvas.height || this.y + this.velocityY < 0) this.velocityY *= -1;
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
    }
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dist = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
            if (dist < properties.lineMaxDist) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = properties.lineColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(loop);
}

// Start the animation
(function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
    }
    loop();
})();
