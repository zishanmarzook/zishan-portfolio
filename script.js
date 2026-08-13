/* =========================
   MOBILE NAV
========================= */

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(el => revealObserver.observe(el));


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
            formStatus.textContent = 'Message sent! I\'ll get back to you soon. ✨';
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