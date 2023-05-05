// Image
const ASPECT_RATIO = 16/9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES_PER_PIXEL = 100;
const NUM_PIXELS = IMAGE_WIDTH * IMAGE_HEIGHT;

// Workers
const NUM_WORKERS = 1;
let numWorkersInProgress = 0;
const workers = [];
for (let i = 0; i < NUM_WORKERS; i++) {
    const worker = new Worker('src/worker.js');
    worker.onmessage = handleWorker;
    workers.push(worker);
}

// Hook up the main button
const renderButton = document.getElementById("render-button");
renderButton.addEventListener("click", () => {
    raytrace();
});

// Set up the canvas and related parts
const canvas = document.getElementById('main-canvas');
const renderTime = document.getElementById('render-time');
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
HittableList.add(world, new Sphere(new Point3(0, -100.5, -1), 100, new Lambertian(new Colour(0.8, 0.8, 0))));
HittableList.add(world, new Sphere(new Point3(0, 0, -1), 0.5, new Lambertian(new Colour(0.7, 0.3, 0.3))));
HittableList.add(world, new Sphere(new Point3(-1, 0, -1), 0.5, new Metal(new Colour(0.8, 0.8, 0.8))));
HittableList.add(world, new Sphere(new Point3(1, 0, -1), 0.5, new Metal(new Colour(0.8, 0.6, 0.2))));

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
        workers[worker].postMessage({
            imageWidth: IMAGE_WIDTH,
            imageHeight: IMAGE_HEIGHT,
            samplesPerPixel: SAMPLES_PER_PIXEL,
            camera: camera,
            world: world,
            startOffset: worker,
            interval: NUM_WORKERS
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
                renderTime.innerText = `Render Time: ${(endTime - startTime).toFixed(2)} milliseconds with ${NUM_WORKERS} worker(s).`;
            }

            break;
    }
}
