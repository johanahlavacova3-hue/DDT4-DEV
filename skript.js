const arrowPivot = document.getElementById('arrow-pivot');
const topIndicator = document.getElementById('top-indicator');
const btnStart = document.getElementById('btn-start');
const camToggle = document.getElementById('cam-toggle');
const video = document.getElementById('video-background');

let cameraActive = false;
let stream = null;

function updateOrientation(event) {
    // Používá magnetometr (heading) nebo gyroskop (alpha)
    let heading = event.webkitCompassHeading || (360 - event.alpha);
    
    if (heading !== undefined) {
        // Rotace velké šipky
        arrowPivot.style.transform = `rotate(${-heading}deg)`;
        
        // Posun horní lišty (mapování 360 stupňů na pixely)
        let moveX = ((heading % 360) - 180) * 1.2;
        topIndicator.style.transform = `translateX(${moveX}px)`;
    }
}

async function toggleCamera() {
    if (!cameraActive) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" }, 
                audio: false 
            });
            video.srcObject = stream;
            video.style.display = 'block';
            cameraActive = true;
            camToggle.style.backgroundColor = "#5eff5e";
        } catch (err) {
            console.error("Kamera nefunguje:", err);
        }
    } else {
        if (stream) stream.getTracks().forEach(t => t.stop());
        video.style.display = 'none';
        cameraActive = false;
        camToggle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }
}

async function startSystem() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
            window.addEventListener('deviceorientation', updateOrientation);
            btnStart.style.display = 'none';
        }
    } else {
        window.addEventListener('deviceorientation', updateOrientation);
        btnStart.style.display = 'none';
    }
}

btnStart.addEventListener('click', startSystem);
camToggle.addEventListener('click', toggleCamera);
