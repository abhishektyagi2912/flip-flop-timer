const hoursTensEl = document.getElementById('hoursTens');
const hoursOnesEl = document.getElementById('hoursOnes');
const minutesTensEl = document.getElementById('minutesTens');
const minutesOnesEl = document.getElementById('minutesOnes');
const secondsTensEl = document.getElementById('secondsTens');
const secondsOnesEl = document.getElementById('secondsOnes');
const amPmEl = document.getElementById('amPm');
const month = document.getElementById('month');
const date = document.getElementById('date');
const year = document.getElementById('year');
const day = document.getElementById('day');
const formatSwitch = document.getElementById('formatSwitch');
let is24Hour = false;

formatSwitch.addEventListener('change', (e) => {
    is24Hour = e.target.checked;
    updateTime();
});

document.getElementById('fullScreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.getElementById('fullScreenBtn').textContent = 'Normal Screen';
        document.documentElement.requestFullscreen();
    } else {
        document.getElementById('fullScreenBtn').textContent = 'Full Screen';
        document.exitFullscreen();
    }
});

function updateTime() {
    const now = new Date();
    let dayOfWeek = now.getDay();
    let monthOfYear = now.getMonth();
    let dayOfMonth = now.getDate();
    let yearValue = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    let amPm = 'AM';
    
    if (!is24Hour) {
        amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }

    // Split into tens and ones digits
    const hoursTens = Math.floor(hours / 10);
    const hoursOnes = hours % 10;
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;

    updateFlipCard(hoursTensEl, hoursTens);
    updateFlipCard(hoursOnesEl, hoursOnes);
    updateFlipCard(minutesTensEl, minutesTens);
    updateFlipCard(minutesOnesEl, minutesOnes);
    updateFlipCard(secondsTensEl, secondsTens);
    updateFlipCard(secondsOnesEl, secondsOnes);

    amPmEl.textContent = amPm;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    document.getElementById('month').textContent = monthNames[monthOfYear];
    document.getElementById('date').textContent = dayOfMonth + ",";
    document.getElementById('year').textContent = yearValue;
    document.getElementById('day').textContent = dayNames[dayOfWeek];
}

function updateFlipCard(element, value) {
    const currentValue = element.textContent;
    if (currentValue !== value.toString()) {
        element.textContent = value;
        foldEffect(element);
    }
}

function foldEffect(element) {
    element.classList.remove('fold');
    void element.offsetWidth; // Trigger reflow to restart the animation
    element.classList.add('fold');
}

setInterval(updateTime, 1000);
updateTime();
