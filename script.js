/* =========================
   ZISHAN PORTFOLIO
   Interaction + motion layer
========================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* =========================
   CURSOR SPOTLIGHT
========================= */

if (!isTouchDevice() && !reduceMotion) {
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.appendChild(spotlight);

    const interactiveEls = 'a, button, .project-card, .skill-card, .social-card, .pillar';
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotX = mouseX;
    let spotY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        spotlight.classList.add('visible');

        const target = e.target.closest(interactiveEls);
        spotlight.classList.toggle('hovering', !!target);
    }, { passive: true });

    document.addEventListener('mouseleave', () => spotlight.classList.remove('visible'));

    const animateSpotlight = () => {
        spotX += (mouseX - spotX) * 0.12;
        spotY += (mouseY - spotY) * 0.12;
        spotlight.style.left = `${spotX}px`;
        spotlight.style.top = `${spotY}px`;
        requestAnimationFrame(animateSpotlight);
    };

    animateSpotlight();
}

/* =========================
   POINTER GLOW ON CARDS
========================= */

if (!isTouchDevice() && !reduceMotion) {
    const glowTargets = document.querySelectorAll(
        '.project-card, .skill-card, .about-card, .social-card, .pillar'
    );

    glowTargets.forEach((el) => {
        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            el.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });
}

/* =========================
   NAVBAR + SCROLL PROGRESS
========================= */

const navbar = document.querySelector('.navbar');
const progress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');

const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    navbar?.classList.toggle('scrolled', scrollTop > 40);
    progress?.style.setProperty('width', `${percentage}%`);
    backToTop?.classList.toggle('visible', scrollTop > 700);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* =========================
   MOBILE NAV
========================= */

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

const closeMobileNav = () => {
    mobileNav?.classList.remove('open');
    navToggle?.classList.remove('open');
    document.body.style.overflow = '';
    navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.setAttribute('aria-expanded', 'false');

navToggle?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
});

/* =========================
   ACTIVE NAV SECTION
========================= */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    }, {
        threshold: 0.35,
        rootMargin: '-10% 0px -45% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const delay = Math.max(0, Number.parseInt(entry.target.dataset.delay || '0', 10));
            window.setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* =========================
   HERO PARALLAX
========================= */

const dotGrid = document.querySelector('.hero-dot-grid');

if (dotGrid && !isTouchDevice() && !reduceMotion) {
    let parallaxFrame = null;

    document.addEventListener('mousemove', (e) => {
        if (parallaxFrame) return;

        parallaxFrame = requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth - 0.5) * 16;
            const y = (e.clientY / window.innerHeight - 0.5) * 16;
            dotGrid.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            parallaxFrame = null;
        });
    }, { passive: true });
}

/* =========================
   PROJECT CARD 3D TILT
========================= */

if (!isTouchDevice() && !reduceMotion) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateX = (0.5 - y) * 5;
            const rotateY = (x - 0.5) * 5;

            card.style.transform =
                `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });
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

const modal = document.getElementById('project-modal');
let lastFocusedElement = null;

function openProject(name) {
    const project = projects[name];
    if (!project || !modal) return;

    lastFocusedElement = document.activeElement;

    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-details').innerHTML = project.details;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.querySelector('.modal-close')?.focus();
    });
}

function closeProject() {
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
}

modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProject();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeProject();
    }
});

/* =========================
   MAGNETIC BUTTONS
========================= */

if (!isTouchDevice() && !reduceMotion) {
    document.querySelectorAll('.btn, .project-btn').forEach(button => {
        button.addEventListener('pointermove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });

        button.addEventListener('pointerleave', () => {
            button.style.transform = '';
        });
    });
}

/* =========================
   TAG MICRO-INTERACTIONS
========================= */

if (!reduceMotion) {
    document.querySelectorAll('.tags').forEach(tags => {
        [...tags.children].forEach((tag, index) => {
            tag.style.transitionDelay = '0ms';

            tag.addEventListener('mouseenter', () => {
                tag.style.transitionDelay = `${index * 12}ms`;
            });
        });
    });
}

/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = 'Send Message →';
    btn.disabled = true;
    btn.textContent = 'Sending...';
    formStatus.textContent = '';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent! I'll get back to you soon. ✨";
            contactForm.reset();
            btn.textContent = 'Message Sent ✓';

            window.setTimeout(() => {
                btn.disabled = false;
                btn.textContent = originalText;
            }, 3500);
        } else {
            throw new Error('Form submission failed');
        }
    } catch {
        formStatus.textContent = 'Something went wrong. Please try again.';
        btn.disabled = false;
        btn.textContent = originalText;
    }
});

/* =========================
   LOAD STATE
========================= */

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});


/* V2: scroll-driven atmospheric depth; compositor-only motion */
if (!reduceMotion && !isTouchDevice()) {
  const orbits = [...document.querySelectorAll('.hero-orbit')];
  let ticking = false;
  const updateAtmosphere = () => {
    const scroll = Math.min(window.scrollY, window.innerHeight);
    orbits.forEach((el,i) => {
      el.style.translate = `0 ${scroll * (i ? .08 : .14)}px`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateAtmosphere); }
  }, {passive:true});
}
