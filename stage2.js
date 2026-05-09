const answerBtn = document.getElementById('answerBtn');
const answerInput = document.getElementById('answerInput');
const resultMessage = document.getElementById('resultMessage');
const retryBtn = document.getElementById('retryBtn');
const clueImage = document.getElementById('clueImage');
const jumpscareOverlay = document.getElementById('jumpscareOverlay');
const jumpscareImage = document.getElementById('jumpscareImage');


const CORRECT_HASH_STAGE2 = '37911fd18cb4feda3d9ab7bf6c79e26538f8e2729ab8b8f42054023dbba3acb2';

async function hashAnswer(answer) {
    const encoder = new TextEncoder();
    const data = encoder.encode(answer);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

if (clueImage) {
    clueImage.style.cursor = 'pointer';
    clueImage.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'clue4.png';
        link.download = 'clue4.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

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

answerBtn.addEventListener('click', async () => {
    const answer = answerInput.value.trim();
    const answerHash = await hashAnswer(answer);
    
    // Always hide overlay initially
    if (jumpscareOverlay) jumpscareOverlay.hidden = true;
    
    if (answerHash === CORRECT_HASH_STAGE2) {
        resultMessage.textContent = 'Correct!';
        resultMessage.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'stage3.html';
        }, 2000);
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