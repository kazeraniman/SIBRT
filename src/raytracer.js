// Image
const ASPECT_RATIO = 16/9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES_PER_PIXEL = 100;

// Background
const BG_TOP_GRADIENT_COLOUR = new Colour(1, 1, 1);
const BG_BOT_GRADIENT_COLOUR = new Colour(0.5, 0.7, 1.0);

// Colour
const WHITE = new Colour(1, 1, 1);

// Hook up the main button
const renderButton = document.getElementById("render-button");
renderButton.addEventListener("click", (event) => {
    raytrace();
});

// Set up the canvas and related parts
const canvas = document.getElementById('main-canvas');
canvas.width = IMAGE_WIDTH;
canvas.height = IMAGE_HEIGHT;
const progressBar = document.getElementById('render-progress-bar-contents');
const ctx = canvas.getContext('2d')

function rayColour(ray, world) {
    const hitRecord = new HitRecord();
    if (world.hit(ray, 0, Infinity, hitRecord)) {
        return Colour.multiply(Vec3.add(hitRecord.normal, WHITE), 0.5);
    }

    const unitDirection = Vec3.unitVector(ray.getDirection());
    const t = 0.5 * (unitDirection.y() + 1);
    return Vec3.add(Vec3.multiply(BG_TOP_GRADIENT_COLOUR, (1 - t)), Vec3.multiply(BG_BOT_GRADIENT_COLOUR, t));
}

function raytrace() {
    const camera = new Camera();

    const world = new HittableList();
    world.add(new Sphere(new Point3(0, 0, -1), 0.5));
    world.add(new Sphere(new Point3(0, -100.5, -1), 100));

    for (let h = IMAGE_HEIGHT; h >= 0; h--) {
        for (let w = 0; w < IMAGE_WIDTH; w++) {
            const pixelColour = new Colour();
            for (let s = 0; s < SAMPLES_PER_PIXEL; s++) {
                const u = (w + Utility.randomDouble()) / (IMAGE_WIDTH - 1);
                const v = (h + Utility.randomDouble()) / (IMAGE_HEIGHT - 1);
                const ray = camera.getRay(u, v);
                pixelColour.addWith(rayColour(ray, world))
            }

            pixelColour.writeColourToPixel(ctx, w, (IMAGE_HEIGHT - h), SAMPLES_PER_PIXEL)
        }

        progressBar.style.width = ((IMAGE_HEIGHT - h) / IMAGE_HEIGHT) * 100 + "%";
    }
}
