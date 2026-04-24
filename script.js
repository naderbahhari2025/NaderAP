let anthemPlayed = false;

function playAnthem() {
    if (anthemPlayed) return;

    const anthem = document.getElementById("anthem");

    if (!anthem) return;

    anthem.volume = 0.6; // optional nice touch

    const playPromise = anthem.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                anthemPlayed = true;
                console.log("Anthem played");
            })
            .catch((err) => {
                console.log("Autoplay blocked:", err);
            });
    }
}

// multiple safe triggers
document.addEventListener("click", playAnthem);
document.addEventListener("keydown", playAnthem);