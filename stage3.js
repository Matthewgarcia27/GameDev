const answerBtn = document.getElementById('answerBtn');
const answerInput = document.getElementById('answerInput');
const resultMessage = document.getElementById('resultMessage');
const retryBtn = document.getElementById('retryBtn');
const jumpscareOverlay = document.getElementById('jumpscareOverlay');
const jumpscareImage = document.getElementById('jumpscareImage');

if (jumpscareImage) {
    jumpscareImage.style.cursor = 'pointer';
    jumpscareImage.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'gorrilla.jpg';
        link.download = 'gorrilla.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

if (retryBtn) {
    retryBtn.addEventListener('click', () => {
        if (jumpscareOverlay) jumpscareOverlay.hidden = true;
        resultMessage.style.display = 'none';
        answerInput.value = '';
        answerInput.focus();
    });
}

answerBtn.addEventListener('click', () => {
    const answer = answerInput.value.trim().toLowerCase();
    if (answer === 'SHADOW') {
        resultMessage.textContent = 'Correct! The name is Totoy Bibo.';
        resultMessage.style.display = 'block';
        if (jumpscareOverlay) jumpscareOverlay.hidden = true;
        window.location.href = 'stage2.html';
    } else {
        resultMessage.textContent = 'Incorrect. Try again.';
        resultMessage.style.display = 'block';
        if (jumpscareImage) {
            jumpscareImage.src = 'gorrilla.jpg';
            jumpscareImage.alt = 'Incorrect answer jumpscare';
        }
        if (jumpscareOverlay) jumpscareOverlay.hidden = false;
    }
});

answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        answerBtn.click();
        
    }
});