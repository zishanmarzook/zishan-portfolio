/* =========================
   HERO ENTRANCE SEQUENCE
========================= */

// Remove loading class to trigger animations
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});


/* =========================
   MOBILE NAV
========================= */

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
    });
});


/* =========================
   ACTIVE NAV SECTION
========================= */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* =========================
   DOT GRID PARALLAX
========================= */

const dotGrid = document.querySelector('.hero-dot-grid');

if (dotGrid) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        dotGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
}


/* =========================
   PROJECT MODAL
========================= */

const projects = {
    website: {
        category: 'WEBSITE',
        title: 'Modern Business Website',
        description: 'A responsive and modern website designed to give a business a professional online presence.',
        details: `
            <p><strong>Features</strong></p>
            <ul>
                <li>Responsive design for desktop and mobile</li>
                <li>Modern navigation and smooth scrolling</li>
                <li>Interactive buttons and sections</li>
                <li>Clean and accessible interface</li>
            </ul>
        `
    },
    bot: {
        category: 'CUSTOM BOT',
        title: 'Auto Middleman Bot',
        description: 'A custom automation bot designed to organize and simplify transaction workflows.',
        details: `
            <p><strong>Features</strong></p>
            <ul>
                <li>Automated transaction workflow</li>
                <li>Custom Discord commands</li>
                <li>Organized transaction tracking</li>
                <li>Automation designed to reduce manual work</li>
            </ul>
        `
    },
    app: {
        category: 'APP',
        title: 'Restaurant App',
        description: 'A premium restaurant app concept focused on simple navigation and a smooth ordering experience.',
        details: `
            <p><strong>Features</strong></p>
            <ul>
                <li>Restaurant menu browsing</li>
                <li>Food item details</li>
                <li>Shopping cart experience</li>
                <li>Mobile-first interface</li>
            </ul>
        `
    }
};

function openProject(name) {
    const project = projects[name];
    if (!project) return;

    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-details').innerHTML = project.details;
    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('project-modal').addEventListener('click', function (e) {
    if (e.target === this) closeProject();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProject();
});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent! I'll get back to you soon. ✨";
            contactForm.reset();
            btn.textContent = 'Message Sent ✓';
        } else {
            formStatus.textContent = 'Something went wrong. Please try again.';
            btn.disabled = false;
            btn.textContent = 'Send Message →';
        }
    } catch {
        formStatus.textContent = 'Unable to send. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Send Message →';
    }
});