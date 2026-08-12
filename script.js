const projects = {
    website: {
        category: "WEBSITE",
        title: "Modern Business Website",
        description:
            "A responsive and modern website designed to give a business a professional online presence.",
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
        category: "CUSTOM BOT",
        title: "Auto Middleman Bot",
        description:
            "A custom automation bot designed to organize and simplify transaction workflows.",
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
        category: "APP",
        title: "Restaurant App",
        description:
            "A premium restaurant app concept focused on simple navigation and a smooth ordering experience.",
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


function openProject(projectName) {

    const project = projects[projectName];

    if (!project) return;

    document.getElementById("modal-category").textContent =
        project.category;

    document.getElementById("modal-title").textContent =
        project.title;

    document.getElementById("modal-description").textContent =
        project.description;

    document.getElementById("modal-details").innerHTML =
        project.details;

    document.getElementById("project-modal").classList.add("active");
}


function closeProject() {

    document.getElementById("project-modal").classList.remove("active");
}


/* Close when clicking outside the modal */

document.getElementById("project-modal").addEventListener("click", function (event) {

    if (event.target === this) {
        closeProject();
    }

});


/* Close with Escape */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProject();
    }

});
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector("button");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            formStatus.textContent =
                "Message sent successfully! I'll get back to you soon. ✨";

            contactForm.reset();

            submitButton.textContent = "Message Sent ✓";

        } else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            submitButton.disabled = false;
            submitButton.textContent = "Send Message →";
        }

    } catch (error) {

        formStatus.textContent =
            "Unable to send the message. Please try again.";

        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";
    }

});