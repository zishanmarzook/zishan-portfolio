/* =========================
   MOBILE NAVIGATION
========================= */

const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

navToggle?.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open")
        ? "hidden"
        : "";
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
    });
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const delay = entry.target.dataset.delay || 0;

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, Number(delay));

            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================
   NAVBAR ACTIVE SECTION
========================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );
            });
        });
    },
    {
        threshold: 0.35
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================
   HERO DOT GRID PARALLAX
========================= */

const dotGrid = document.querySelector(".hero-dot-grid");

if (dotGrid && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;

        dotGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
}


/* =========================
   PROJECT MODAL
========================= */

const projectData = {
    website: {
        category: "WEBSITE",
        title: "Modern Business Website",
        description:
            "A polished responsive website designed to give a business a strong and professional digital presence.",
        details: [
            "Built with HTML, CSS and JavaScript.",
            "Responsive layout for desktop and mobile.",
            "Focused on clean visual hierarchy and usability.",
            "Designed to provide a professional online presence."
        ]
    },

    bot: {
        category: "CUSTOM BOT",
        title: "Auto Middleman Bot",
        description:
            "A custom Discord bot designed to automate and organize middleman-style transaction workflows.",
        details: [
            "Built with Python and Discord.",
            "Designed around automated transaction workflows.",
            "Uses APIs and automation to reduce manual work.",
            "Focused on making the process organized and efficient."
        ]
    },

    app: {
        category: "APP",
        title: "Restaurant App",
        description:
            "A modern restaurant app concept with menu browsing, food details, cart management and a clean mobile-first UI.",
        details: [
            "Designed with a mobile-first approach.",
            "Focused on clean UI/UX and easy navigation.",
            "Includes menu browsing and food details.",
            "Designed around a simple restaurant ordering experience."
        ]
    }
};

function openProject(projectId) {
    const modal = document.getElementById("project-modal");
    const category = document.getElementById("modal-category");
    const title = document.getElementById("modal-title");
    const description = document.getElementById("modal-description");
    const details = document.getElementById("modal-details");

    const project = projectData[projectId];

    if (!project || !modal) return;

    category.textContent = project.category;
    title.textContent = project.title;
    description.textContent = project.description;

    details.innerHTML = `
        <p>Project details</p>
        <ul>
            ${project.details.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProject() {
    const modal = document.getElementById("project-modal");

    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
}


/* Close modal when clicking the backdrop */

document.getElementById("project-modal")?.addEventListener("click", (event) => {
    if (event.target.id === "project-modal") {
        closeProject();
    }
});


/* Close modal with Escape */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProject();
    }
});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    if (!submitButton) return;

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent successfully. ✓";
            contactForm.reset();
        } else {
            formStatus.textContent =
                "Something went wrong. Please try again.";
        }
    } catch (error) {
        formStatus.textContent =
            "Unable to send the message right now.";
    }

    submitButton.disabled = false;
    submitButton.textContent = originalText;
});


/* =========================
   SMOOTH ANCHOR NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});