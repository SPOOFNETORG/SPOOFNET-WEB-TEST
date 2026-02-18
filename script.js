let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextSlideBtn');

// SLIDE NAVIGATION
nextBtn.onclick = () => {
    if (currentSlide < slides.length - 1) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide++;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        if (currentSlide === slides.length - 1) nextBtn.innerText = "Finish";
    } else {
        document.getElementById('introSlides').classList.add('hidden');
        document.getElementById('mainDashboard').classList.remove('hidden');
    }
};

// CAMERA FLOW
const getStartedBtn = document.getElementById('getStartedBtn');
const modal = document.getElementById('verifyModal');
const video = document.getElementById('webcam');
const progressFill = document.getElementById('progressFill');
const stepTitle = document.getElementById('stepTitle');
const stepInstruction = document.getElementById('stepInstruction');

const tasks = ["Up", "Down", "Left", "Right"];
let taskIdx = 0;

getStartedBtn.onclick = async () => {
    modal.style.display = 'flex';
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        runVerification();
    } catch (e) {
        alert("Camera access denied.");
        modal.style.display = 'none';
    }
};

function runVerification() {
    if (taskIdx < tasks.length) {
        stepTitle.innerText = "Step 1: Rotation";
        stepInstruction.innerText = `Look ${tasks[taskIdx]}...`;
        setTimeout(() => {
            taskIdx++;
            progressFill.style.width = `${taskIdx * 20}%`;
            runVerification();
        }, 1500);
    } else {
        stepTitle.innerText = "Step 2: Steady Capture";
        stepInstruction.innerText = "Hold still for 2 seconds...";
        setTimeout(() => {
            progressFill.style.width = "100%";
            progressFill.style.background = "#10b981";
            showFinalSuccess();
        }, 2000);
    }
}

function showFinalSuccess() {
    stepTitle.classList.add('hidden');
    stepInstruction.classList.add('hidden');
    document.querySelector('.camera-wrapper').classList.add('hidden');
    document.getElementById('successContent').classList.remove('hidden');
    setTimeout(() => {
        modal.style.display = 'none';
        alert("Spoofnet Verified!");
    }, 2500);
}