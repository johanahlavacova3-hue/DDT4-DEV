const arrowPivot = document.getElementById('arrow-pivot');
const topIndicator = document.getElementById('top-indicator');
const btnStart = document.getElementById('btn-start');
const camToggle = document.getElementById('cam-toggle');
const video = document.getElementById('video-background');
const statusMsg = document.getElementById('status-msg');

let cameraActive = false;
let stream = null;

// Funkce pro aktualizaci vizuálu
function handleMotion(event) {
    // Získání orientace (heading pro iOS, alpha pro zbytek)
    let heading = event.webkitCompassHeading;
    if (!heading) heading = 360 - event.alpha;

    if (heading) {
        // Rotace velké šipky
        arrowPivot.style.transform = `rotate(${-heading}deg)`;
        
        // Posun horní lišty
        let offset = ((heading % 360) - 180) * 1.5;
        topIndicator.style.transform = `translateX(${-offset}px)`;
    }
}

// Přepínání kamery
async function toggleCamera() {
    if (!cameraActive) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" } 
            });
            video.srcObject = stream;
            video.style.display = "block";
            cameraActive = true;
            camToggle.style.boxShadow = "0 0 15px #5eff5e";
        } catch (err) {
            statusMsg.innerText = "Chyba kamery: " + err.message;
        }
    } else {
        if (stream) stream.getTracks().forEach(track => track.stop());
        video.style.display = "none";
        cameraActive = false;
        camToggle.style.boxShadow = "none";
    }
}

// Hlavní spouštěcí funkce
async function startApp() {
    // Kontrola, zda jsme na HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        alert("Senzory vyžadují HTTPS připojení!");
        return;
    }

    // Žádost o povolení (iOS 13+)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === 'granted') {
                window.addEventListener('deviceorientation', handleMotion, true);
                btnStart.style.display = 'none';
            } else {
                statusMsg.innerText = "Přístup k senzorům zamítnut.";
            }
        } catch (err) {
            statusMsg.innerText = "Chyba: " + err.message;
        }
    } else {
        // Ostatní zařízení
        window.addEventListener('deviceorientation', handleMotion, true);
        btnStart.style.display = 'none';
    }
}

btnStart.addEventListener('click', startApp);
camToggle.addEventListener('click', toggleCamera);
