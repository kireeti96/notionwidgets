let countdownInterval;

function setCountdown(endDate = null) {
    clearInterval(countdownInterval);
    if (!endDate) {
        endDate = new Date(document.getElementById('endDate').value).getTime();
    }
    
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = 
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Check for URL parameters
const urlParams = new URLSearchParams(window.location.search);
const targetDate = urlParams.get('target');
const timerTitle = urlParams.get('title');

if (timerTitle) {
    document.getElementById('timerTitle').textContent = decodeURIComponent(timerTitle);
}

if (targetDate) {
    setCountdown(new Date(targetDate).getTime());
    document.getElementById('endDate').value = targetDate.split('T')[0];
    document.getElementById('endDate').style.display = 'none';
    document.getElementById('setCountdownBtn').style.display = 'none';
} else {
    document.getElementById('endDate').style.display = 'inline-block';
    document.getElementById('setCountdownBtn').style.display = 'inline-block';
}
