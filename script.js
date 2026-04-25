let anthemStarted = false;

const anthem = document.getElementById("anthem");
const toggle = document.getElementById("anthemToggle");

/* =========================
   Start anthem only once
========================= */

function startAnthem() {
    if (anthemStarted || !anthem) return;

    anthem.volume = 0.6;

    anthem.play()
        .then(() => {
            anthemStarted = true;

            if (toggle) {
                toggle.checked = true;
            }

            console.log("Anthem started");
        })
        .catch((err) => {
            console.log("Playback blocked:", err);
        });
}

/* =========================
   First interaction starts anthem
========================= */

function firstInteractionStart() {
    startAnthem();

    document.removeEventListener("click", firstInteractionStart);
    document.removeEventListener("keydown", firstInteractionStart);
}

document.addEventListener("click", firstInteractionStart);
document.addEventListener("keydown", firstInteractionStart);

/* =========================
   Toggle switch ON / OFF
========================= */

if (toggle) {
    toggle.addEventListener("change", function () {
        if (this.checked) {
            startAnthem();

            if (anthem) {
                anthem.play();
            }
        } else {
            if (anthem) {
                anthem.pause();
            }
        }
    });
}