// Image
const ASPECT_RATIO = 16/9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES_PER_PIXEL = 100;
const NUM_PIXELS = IMAGE_WIDTH * IMAGE_HEIGHT;

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
const worker = new Worker('src/worker.js');
worker.onmessage = handleWorker;
const camera = new Camera();
const world = new HittableList();
HittableList.add(world, new Sphere(new Point3(0, 0, -1), 0.5));
HittableList.add(world, new Sphere(new Point3(0, -100.5, -1), 100));

function raytrace() {
    renderButton.disabled = true;
    progress = 0;
    progressBar.progress = 0;
    ctx.fillStyle = `rgb(256, 256, 256)`;
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

    worker.postMessage({
        imageWidth: IMAGE_WIDTH,
        imageHeight: IMAGE_HEIGHT,
        samplesPerPixel: SAMPLES_PER_PIXEL,
        camera: camera,
        world: world
    });
}

function handleWorker(event) {
    switch (event.data.type) {
        case "pixel":
            Colour.writeColourToPixel(event.data.pixelColour, ctx, event.data.w, (IMAGE_HEIGHT - event.data.h), SAMPLES_PER_PIXEL);
            progressBar.progress = ++progress / NUM_PIXELS;
            break;
        case "complete":
            progressBar.progress = 1;
            renderButton.disabled = false;
            break;
    }
}
