// Colour
const COLOUR_SCALING_FACTOR = 255.999;

// Image
const ASPECT_RATIO = 16/9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;

// Camera
const VIEWPORT_HEIGHT = 2;
const VIEWPORT_WIDTH = ASPECT_RATIO * VIEWPORT_HEIGHT;
const FOCAL_LENGTH = 1;
const FOCAL_LENGTH_VEC = new Vec3(0, 0, FOCAL_LENGTH);
const EYE_ORIGIN = new Point3();
const HORIZONTAL = new Vec3(VIEWPORT_WIDTH, 0, 0);
const VERTICAL = new Vec3(0, VIEWPORT_HEIGHT, 0);
const LOWER_LEFT_CORNER = Vec3.subtract(Vec3.subtract(EYE_ORIGIN, Vec3.divide(HORIZONTAL, 2)), Vec3.subtract(Vec3.divide(VERTICAL, 2), FOCAL_LENGTH_VEC));

// Background
const BG_TOP_GRADIENT_COLOUR = new Colour(1, 1, 1);
const BG_BOT_GRADIENT_COLOUR = new Colour(0.5, 0.7, 1.0);

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

function writeColourToPixel(ctx, colour, x, y) {
    ctx.fillStyle = `rgb(${colour.x() * COLOUR_SCALING_FACTOR}, ${colour.y() * COLOUR_SCALING_FACTOR}, ${colour.z() * COLOUR_SCALING_FACTOR})`;
    ctx.fillRect(x, y, 1, 1);
}

function rayColour(ray) {
    if (hitSphere(new Point3(0, 0, -1), 0.5, ray)) {
        return new Colour(1, 0, 0);
    }

    let unitDirection = Vec3.unitVector(ray.getDirection());
    let t = 0.5 * (unitDirection.y() + 1);
    return Vec3.add(Vec3.multiply(BG_TOP_GRADIENT_COLOUR, (1 - t)), Vec3.multiply(BG_BOT_GRADIENT_COLOUR, t));
}

function hitSphere(centre, radius, ray) {
    let oc = Vec3.subtract(ray.getOrigin(), centre);
    let a = Vec3.dotProduct(ray.getDirection(), ray.getDirection());
    let b = 2 * Vec3.dotProduct(oc, ray.getDirection());
    let c = Vec3.dotProduct(oc, oc) - radius * radius;
    let discriminant = b * b - 4 * a * c;
    return discriminant > 0;
}

function raytrace() {
    for (let h = IMAGE_HEIGHT; h >= 0; h--) {
        for (let w = 0; w < IMAGE_WIDTH; w++) {
            let u = w / (IMAGE_WIDTH - 1);
            let v = h / (IMAGE_HEIGHT - 1);
            let ray = new Ray(EYE_ORIGIN, Vec3.subtract(Vec3.add(Vec3.add(LOWER_LEFT_CORNER, Vec3.multiply(HORIZONTAL, u)), Vec3.multiply(VERTICAL, v)), EYE_ORIGIN));
            let pixelColour = rayColour(ray);
            writeColourToPixel(ctx, pixelColour, w, (IMAGE_HEIGHT - h))
        }

        progressBar.style.width = ((IMAGE_HEIGHT - h) / IMAGE_HEIGHT) * 100 + "%";
    }
}
