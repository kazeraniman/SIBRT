// Image
const ASPECT_RATIO = 16/9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES_PER_PIXEL = 100;
const NUM_PIXELS = IMAGE_WIDTH * IMAGE_HEIGHT;

// Workers
const NUM_WORKERS = 5;
const ROWS_PER_WORKER = IMAGE_HEIGHT / NUM_WORKERS;
let numWorkersInProgress = 0;
const workers = [];
for (let i = 0; i < NUM_WORKERS; i++) {
    const worker = new Worker('src/worker.js');
    worker.onmessage = handleWorker;
    workers.push(worker);
}

// Render took: 15443.600000023842 milliseconds with 1 worker(s).
// Render took: 17108 milliseconds with 2 worker(s).
// Hook up the main button
const renderButton = document.getElementById("render-button");
renderButton.addEventListener("click", () => {
    raytrace();
});

// Set up the canvas and related parts
const canvas = document.getElementById('main-canvas');
canvas.width = IMAGE_WIDTH;
canvas.height = IMAGE_HEIGHT;
const progressBar = new mdc.linearProgress.MDCLinearProgress(document.getElementById('render-progress-bar'));
progressBar.determinate = true;
progressBar.buffer = 1;
progressBar.progress = 0;
const ctx = canvas.getContext('2d')

// Set up the raytracer
let progress = 0;
const camera = new Camera();
const world = new HittableList();
HittableList.add(world, new Sphere(new Point3(0, 0, -1), 0.5));
HittableList.add(world, new Sphere(new Point3(0, -100.5, -1), 100));

// Performance metrics
let startTime;
let endTime;

function raytrace() {
    startTime = performance.now();
    renderButton.disabled = true;
    progress = 0;
    progressBar.progress = 0;
    numWorkersInProgress = NUM_WORKERS;
    ctx.fillStyle = `rgb(256, 256, 256)`;
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

    for (let worker = 0; worker < NUM_WORKERS; worker++) {
        const startH = IMAGE_HEIGHT - worker * Math.ceil(ROWS_PER_WORKER);
        const endH = startH - Math.ceil(ROWS_PER_WORKER);

        workers[worker].postMessage({
            imageWidth: IMAGE_WIDTH,
            imageHeight: IMAGE_HEIGHT,
            samplesPerPixel: SAMPLES_PER_PIXEL,
            camera: camera,
            world: world,
            startH: startH,
            endH: endH
        });
    }
}

function handleWorker(event) {
    switch (event.data.type) {
        case "pixel":
            Colour.writeColourToPixel(event.data.pixelColour, ctx, event.data.w, (IMAGE_HEIGHT - event.data.h), SAMPLES_PER_PIXEL);
            progressBar.progress = ++progress / NUM_PIXELS;
            break;
        case "complete":
            numWorkersInProgress--;
            if (numWorkersInProgress === 0) {
                progressBar.progress = 1;
                renderButton.disabled = false;
                endTime = performance.now();
                console.log(`Render took: ${endTime - startTime} milliseconds with ${NUM_WORKERS} worker(s).`);
            }

            break;
    }
}
