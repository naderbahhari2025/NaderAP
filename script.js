document.addEventListener("DOMContentLoaded", function () {
    const anthem = document.getElementById("anthem");
    const toggle = document.getElementById("anthemToggle");
    const iframe = document.querySelector("#diagramArea iframe");
    const cvLink = document.getElementById("cvLink");
    const milestoneText = document.getElementById("milestoneText");

    let anthemStarted = false;

    /* =========================
       Start anthem + auto toggle ON
    ========================= */

    function startAnthem() {
        if (!anthem || anthemStarted) return;

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
       First interaction anywhere
    ========================= */

    function firstInteractionStart() {
        startAnthem();

        document.removeEventListener("click", firstInteractionStart);
        document.removeEventListener("keydown", firstInteractionStart);
    }

    document.addEventListener("click", firstInteractionStart);
    document.addEventListener("keydown", firstInteractionStart);

    /* clicks inside iframe */
    if (iframe) {
        iframe.addEventListener("load", function () {
            try {
                iframe.contentWindow.document.addEventListener(
                    "click",
                    firstInteractionStart
                );
            } catch (e) {
                console.log("Could not attach iframe click listener:", e);
            }
        });
    }

    /* =========================
       Manual toggle ON / OFF
    ========================= */

    if (toggle) {
        toggle.addEventListener("change", function () {
            if (this.checked) {
                if (!anthemStarted) {
                    startAnthem();
                } else if (anthem) {
                    anthem.play();
                }
            } else {
                if (anthem) {
                    anthem.pause();
                }
            }
        });
    }

    /* =========================
       CV popup (optional)
    ========================= */

    function openCV() {
        window.open(
            "https://drive.google.com/file/d/1evf7U3bdiGCczezQ_vQX2L4z0IMPEHKD/view",
            "cvWindow",
            "width=900,height=700,left=200,top=100,resizable=yes,scrollbars=yes"
        );
    }

    if (cvLink) {
        cvLink.addEventListener("click", function (e) {
            e.preventDefault();
            openCV();
        });
    }

    /* =========================
       Milestone Details
    ========================= */

    const milestoneDetails = {
        milestone1: "Text of milestone-1\n\nExample: First research phase and literature review.",
        milestone2: "Text of milestone-2\n\nExample: Data collection and methodology.",
        milestone3: "Text of milestone-3\n\nExample: Analysis and interpretation of results.",
        milestone4: "Text of milestone-4\n\nExample: Writing final report and revisions.",
        milestone5: "Text of milestone-5\n\nExample: Final defense and submission."
    };

    function showMilestoneDetails() {
        const hash = window.location.hash.replace("#", "");

        if (milestoneText && milestoneDetails[hash]) {
            milestoneText.textContent = milestoneDetails[hash];
        }
    }

    window.addEventListener("hashchange", function () {
        showMilestoneDetails();
    });

    showMilestoneDetails();
});