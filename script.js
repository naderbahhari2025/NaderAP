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
       CV popup
    ========================= */

    function openCV() {
        window.open(
            "https://drive.google.com/file/d/1evf7U3bdiGCczezQ_vQX2L4z0IMPEHKD/view",
            "cvWindow",
            "width=900,height=700,left=200,top=100,resizable=yes,scrollbars=yes"
        );
    }

    /* optional normal HTML link support */
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
        //M0: "<B><U> Milestone 0: </U></B> <br> <style='font-size: 14px; color: blue;'> This is when I arrived to Belgium to study at KU Leuven in October 29, 2022.</style>",
        M0: "<strong style='font-size:12px;'> <u> Start:</u> </strong> <br> <p style='font-size: 10px; color: #111111;'>This is when I arrived to Belgium to study at KU Leuven on October 29, 2022.</p>",
        M1: "<strong style='font-size:12px;'> <u> Milestone 1:</u> </strong> <br> <p style='font-size: 10px; color: #111111;'>Completed level 1.1 of Dutch language with CVO PRO on April 02, 2026.</p>",
        M2: "<strong style='font-size:12px;'> <u> Milestone 2:</u></strong><br><span style='font-size: 10px; color: #111111;'>Will finish level 1.2 of Dutch language with CVO PRO on June 22, 2026 .</span>",
        M3: "<strong style='font-size:12px;'> <u> Milestone 3:</u></strong><br><span style='font-size: 10px; color: #111111;'>Will start working as an engineer in Flanders on Juli 01, 2026.</span>",
        M4: "<strong style='font-size:12px;'> <u> Milestone 4:</u></strong><br><span style='font-size: 10px; color: #111111;'>Will complete my innoEnergy Master's Programme on September 30, 2029.</span>",
        M5: "<strong style='font-size:12px;'> <u> Milestone 5:</u></strong><br><span style='font-size: 10px; color: #111111;'> Will work as a graduate from the innoEnergy Master's Programme on November 01, 2029.</span>",       
    };

    /* =========================
       Handle draw.io hash links
       (#milestone1 - 5 & ... #CV)
    ========================= */

    function handleHashChange() {
        const hash = window.location.hash.replace("#", "");

        /* open CV popup */
        if (hash === "CV") {
            openCV();

            /* remove #CV from URL after popup opens */
            history.replaceState(
                null,
                null,
                window.location.pathname + window.location.search
            );

            return;
        }

        /* show milestone details */
        if (milestoneText && milestoneDetails[hash]) {
            milestoneText.innerHTML = milestoneDetails[hash]; // Changed from textContent to innerHTML
        }
    }

    window.addEventListener("hashchange", handleHashChange);

    /* also works if page loads with a hash already present */
    handleHashChange();
});

