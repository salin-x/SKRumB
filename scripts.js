// scripts.js

// Function to handle button clicks
function handleButtonClick(mood) {
    // Depending on the mood, perform different actions
    switch (mood) {
        case 'Happy':
            // Redirect to Happy.html
            window.location.href = 'Happy.html';
            break;
        case 'Sad':
            // Redirect to Sad.html
            window.location.href = 'Sad.html';
            break;
        case 'Angry':
            // Redirect to Angry.html
            window.location.href = 'Angry.html';
            break;
        case 'Surprised':
            // Redirect to Surprising.html
            window.location.href = 'Surprising.html';
            break;
        default:
            // Default action if mood is not recognized
            console.log('Unknown mood');
    }
}

// Add event listeners to the buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.a-c-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const mood = this.querySelector('span').textContent;
            handleButtonClick(mood);
        });
    });
});
