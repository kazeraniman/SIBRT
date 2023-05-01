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
const HALF_HORIZONTAL = Vec3.divide(HORIZONTAL, 2);
const HALF_VERTICAL = Vec3.divide(VERTICAL, 2);
const LOWER_LEFT_CORNER = Vec3.subtract(Vec3.subtract(Vec3.subtract(EYE_ORIGIN, HALF_HORIZONTAL), HALF_VERTICAL), FOCAL_LENGTH_VEC);

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
    let t = hitSphere(new Point3(0, 0, -1), 0.5, ray);
    if (t > 0) {
        const n = Vec3.unitVector(Vec3.subtract(ray.at(t), new Vec3(0, 0, -1)));
        return Colour.multiply(new Colour(n.x() + 1, n.y() + 1, n.z() + 1), 0.5);
    }

    const unitDirection = Vec3.unitVector(ray.getDirection());
    t = 0.5 * (unitDirection.y() + 1);
    return Vec3.add(Vec3.multiply(BG_TOP_GRADIENT_COLOUR, (1 - t)), Vec3.multiply(BG_BOT_GRADIENT_COLOUR, t));
}

function hitSphere(centre, radius, ray) {
    const oc = Vec3.subtract(ray.getOrigin(), centre);
    const a = Vec3.dotProduct(ray.getDirection(), ray.getDirection());
    const b = 2 * Vec3.dotProduct(oc, ray.getDirection());
    const c = Vec3.dotProduct(oc, oc) - radius * radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return -1;
    } else {
        return (-b - Math.sqrt(discriminant)) / (2 * a);
    }
}

function raytrace() {
    for (let h = IMAGE_HEIGHT; h >= 0; h--) {
        for (let w = 0; w < IMAGE_WIDTH; w++) {
            const u = w / (IMAGE_WIDTH - 1);
            const v = h / (IMAGE_HEIGHT - 1);
            const horizontalComponent = Vec3.multiply(HORIZONTAL, u);
            const verticalComponent = Vec3.multiply(VERTICAL, v);
            const ray = new Ray(EYE_ORIGIN, Vec3.subtract(Vec3.add(Vec3.add(LOWER_LEFT_CORNER, horizontalComponent), verticalComponent), EYE_ORIGIN));
            const pixelColour = rayColour(ray);
            writeColourToPixel(ctx, pixelColour, w, (IMAGE_HEIGHT - h))
        }

        progressBar.style.width = ((IMAGE_HEIGHT - h) / IMAGE_HEIGHT) * 100 + "%";
    }
}
