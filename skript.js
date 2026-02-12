body {
    margin: 0;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #5eff5e;
    font-family: "bc-novatica", sans-serif;
    overflow: hidden;
    user-select: none;
    touch-action: none;
}

#video-background {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: -1;
    display: none;
}

#top-bar {
    position: absolute;
    top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 40px;
}

#top-indicator {
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.1s linear;
}

/* Kontejner pro kruh a tlačítko pod ním */
#main-ui-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-10px); /* Posun celého bloku o 10px nahoru */
}

#compass-circle {
    width: 200px;
    height: 200px;
    background-color: rgba(23, 34, 23, 0.8);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

#arrow-pivot {
    position: absolute;
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.arrow-head {
    width: 0; height: 0;
    border-left: 27.5px solid transparent; /* Celková šířka cca 55px */
    border-right: 27.5px solid transparent;
    border-bottom: 55px solid #5eff5e;
    transform: translateY(-40px);
}

#center-dot {
    width: 16px;
    height: 16px;
    background-color: #5eff5e;
    border-radius: 50%;
    z-index: 10;
}

/* Tlačítko pod kruhem */
#btn-start {
    margin-top: 10px;
    width: 120px;
    height: 15px;
    background: #5eff5e;
    color: #000;
    border: none;
    border-radius: 25px;
    font-family: "bc-novatica", sans-serif;
    font-size: 10pt;
    font-weight: 400; /* Regular */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
}

/* Toggle vpravo dole */
#mode-toggle {
    position: absolute;
    right: 35px;
    bottom: 35px;
    width: 120px;
    height: 15px;
    background: rgba(94, 255, 94, 0.2);
    border-radius: 25px;
    cursor: pointer;
    padding: 0 2px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

#toggle-ball {
    width: 11px;
    height: 11px;
    background-color: #5eff5e;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

body.camera-on #toggle-ball {
    transform: translateX(105px);
}
