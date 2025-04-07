let generatedCaptcha = "";

function generateCaptcha() {
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";

    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Reverse and scramble text
    captchaText = captchaText.split("").reverse().join("");

    // Store for validation
    generatedCaptcha = captchaText;

    // Create noise background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply random font styles and distortions
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    for (let i = 0; i < captchaText.length; i++) {
        ctx.fillText(captchaText[i], 15 + i * 20, 30 + Math.random() * 10);
    }

    // Draw noise
    for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random()})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
}

function validateCaptcha() {
    const userCaptcha = document.getElementById("captchaInput").value;
    const statusMessage = document.getElementById("status-message");

    if (userCaptcha === generatedCaptcha) {
        // alert("Registration Successful")
        statusMessage.textContent = "Registration successful!";
        statusMessage.style.color = "green";
    } else {
        statusMessage.textContent = "Incorrect CAPTCHA. Try again.";
        statusMessage.style.color = "red";
        generateCaptcha();
    }
}

// Initialize CAPTCHA on page load
window.onload = generateCaptcha;

