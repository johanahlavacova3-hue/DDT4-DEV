const arrowPivot = document.getElementById('arrow-pivot');
const topIndicator = document.getElementById('top-indicator');
const btnStart = document.getElementById('btn-start');
const modeToggle = document.getElementById('mode-toggle');
const video = document.getElementById('video-background');

let cameraActive = false;
let stream = null;

function handleMotion(event) {
    let heading = event.webkitCompassHeading || (360 - event.alpha);
    if (heading) {
        arrowPivot.style.transform = `rotate(${-heading}deg)`;
        let offset = ((heading % 360) - 180) * 1.5;
        topIndicator.style.transform = `translateX(${-offset}px)`;
    }
}

async function toggleCamera() {
    if (!cameraActive) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" } 
            });
            video.srcObject = stream;
            video.style.display = "block";
            cameraActive = true;
            document.body.classList.add('camera-on');
        } catch (err) {
            console.error("Kamera nedostupná:", err);
        }
    } else {
        if (stream) stream.getTracks().forEach(t => t.stop());
        video.style.display = "none";
        cameraActive = false;
        document.body.classList.remove('camera-on');
    }
}

async function startApp() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
            window.addEventListener('deviceorientation', handleMotion, true);
            btnStart.style.display = 'none';
        }
    } else {
        window.addEventListener('deviceorientation', handleMotion, true);
        btnStart.style.display = 'none';
    }
}

btnStart.addEventListener('click', startApp);
modeToggle.addEventListener('click', toggleCamera);
