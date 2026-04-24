// ===============================
// Play anthem only once
// ===============================

document.addEventListener("click", function playAnthemOnce() {
    const anthem = document.getElementById("anthem");

    if (anthem) {
        anthem.play().catch(function () {
            console.log("Browser blocked autoplay until user interaction.");
        });
    }

    document.removeEventListener("click", playAnthemOnce);
});


// ===============================
// Update side panel when a shape is clicked
// (works using #links from draw.io)
// Example links in draw.io:
// #cv
// #milestone1
// #phase1
// ===============================

function updatePanel() {
    const hash = window.location.hash;
    const box = document.getElementById("contentBox");

    if (!box) return;

    if (hash === "#cv") {
        box.innerHTML = `
            <h3>My CV</h3>
            <p>Click below to open my CV:</p>
            <p>
                <a href="https://drive.google.com/file/d/1evf7U3bdiGCczezQ_vQX2L4z0IMPEHKD/view" target="_blank">
                    Open CV
                </a>
            </p>
        `;
    }

    else if (hash === "#milestone1") {
        box.innerHTML = `
            <h3>Milestone 1</h3>
            <p>
                This milestone represents the first major achievement
                in the project timeline.
            </p>
        `;
    }

    else if (hash === "#phase1") {
        box.innerHTML = `
            <h3>Phase 1</h3>
            <p>
                Initial planning, research, and preparation stage.
            </p>
        `;
    }

    else {
        box.innerHTML = `
            <p>Click a milestone or shape in the diagram to see details here.</p>
        `;
    }
}


// Detect clicks from draw.io links
window.addEventListener("hashchange", updatePanel);
window.addEventListener("load", updatePanel);