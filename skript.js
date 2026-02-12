const arrowPivot = document.getElementById('arrow-pivot');
const topIndicator = document.getElementById('top-indicator');
const btnStart = document.getElementById('btn-start');
const modeToggle = document.getElementById('mode-toggle');
const video = document.getElementById('video-background');
const jaySound = document.getElementById('jay-sound');

let cameraActive = false;
let stream = null;
let jayAlerted = false; // Aby sojka nepištěla v kuse, ale jen při "vstupu" do chyby

function handleMotion(event) {
    let heading = event.webkitCompassHeading || (360 - event.alpha);
    if (heading !== undefined) {
        arrowPivot.style.transform = `rotate(${-heading}deg)`;
        let offset = ((heading % 360) - 180) * 1.5;
        topIndicator.style.transform = `translateX(${-offset}px)`;

        // --- EASTER EGG: Sojka varuje ---
        // Pokud je uživatel skoro úplně mimo (odchylka 160 až 200 stupňů od severu)
        const deviation = Math.abs((heading % 360) - 180);
        if (deviation < 20) { // To odpovídá jihu (zády k severu)
            if (!jayAlerted) {
                jaySound.play().catch(e => console.log("Zvuk blokován"));
                jayAlerted = true;
                // Vizuální varování - jemné zčervenání špičky
                document.querySelector('.arrow-head').style.borderBottomColor = "#ff4444";
            }
        } else {
            if (jayAlerted) {
                jayAlerted = false;
                document.querySelector('.arrow-head').style.borderBottomColor = "#04DC2B";
            }
        }
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
            console.error("Kamera nedostupná");
        }
    } else {
        if (stream) stream.getTracks().forEach(t => t.stop());
        video.style.display = "none";
        cameraActive = false;
        document.body.classList.remove('camera-on');
    }
}

async function startApp() {
    // Odblokování audia pro mobilní prohlížeče (vyžaduje interakci uživatele)
    jaySound.play().then(() => {
        jaySound.pause();
        jaySound.currentTime = 0;
    }).catch(() => {});

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
            window.addEventListener('deviceorientation', handleMotion, true);
            btnStart.style.visibility = 'hidden';
        }
    } else {
        window.addEventListener('deviceorientation', handleMotion, true);
        btnStart.style.visibility = 'hidden';
    }
}

btnStart.addEventListener('click', startApp);
modeToggle.addEventListener('click', toggleCamera);
