document.addEventListener("DOMContentLoaded", function () {
    const anthem = document.getElementById("anthem");
    const toggle = document.getElementById("anthemToggle");

    let anthemStarted = false;

    /* =========================
       Start anthem only once
    ========================= */

    function startAnthem() {
        if (!anthem) return;

        anthem.volume = 0.6;

        anthem.play()
            .then(() => {
                anthemStarted = true;

                /* VERY IMPORTANT:
                   auto-switch toggle ON */
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
       First click anywhere
       should start anthem
       and move toggle ON
    ========================= */

    function firstInteractionStart() {
        if (!anthemStarted) {
            startAnthem();
        }

        document.removeEventListener("click", firstInteractionStart);
        document.removeEventListener("keydown", firstInteractionStart);
    }

    document.addEventListener("click", firstInteractionStart);
    document.addEventListener("keydown", firstInteractionStart);

    /* =========================
       Manual toggle ON / OFF
    ========================= */

    if (toggle) {
        toggle.addEventListener("change", function () {
            if (this.checked) {
                startAnthem();
            } else {
                if (anthem) {
                    anthem.pause();
                }
            }
        });
    }
});