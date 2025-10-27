document.addEventListener("DOMContentLoaded", function () {
    /* Typing effect */
    const roles = ["Frontend Developer", "UI/UX Designer", "Creative Coder"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpan = document.querySelector(".typing-text");

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typingSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }

    if (roles.length && typingSpan) setTimeout(type, 500);

    /* Smooth scroll */
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ✅ Mobile menu toggle fix */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    /* Skill bars animation */
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

    skillBars.forEach(bar => skillObserver.observe(bar));

    /* Animate elements */
    const animateElements = document.querySelectorAll('.glass-card, .project-card');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateObserver.observe(el);
    });

    /* Contact form handling */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const { name, email, subject, message } = Object.fromEntries(formData);

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            showNotification('Thank you! Your message has been sent.', 'success');
            this.reset();
        });
    }

    /* Utility Functions */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease-out',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        });

        switch (type) {
            case 'success': notification.style.background = '#16a34a'; break;
            case 'error': notification.style.background = '#dc2626'; break;
            default: notification.style.background = '#2563eb';
        }

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
});

/* Add CSS for mobile menu */
const style = document.createElement('style');
style.textContent = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: rgba(34, 42, 53, 0.95);
        backdrop-filter: blur(20px);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 2rem 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-menu.active {
        left: 0;
    }
    .nav-menu li {
        margin: 1rem 0;
    }
    .hamburger {
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    .hamburger span {
        width: 25px;
        height: 3px;
        background: white;
        margin: 4px 0;
        transition: all 0.3s ease;
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    .hamburger.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
}
`;
document.head.appendChild(style);
