importScripts(
    'utility.js',
    'vec3.js',
    'colour.js',
    'ray.js',
    'hittable.js',
    'hitRecord.js',
    'hittableList.js',
    'sphere.js',
    'camera.js'
);

// Background
const BG_TOP_GRADIENT_COLOUR = new Colour(1, 1, 1);
const BG_BOT_GRADIENT_COLOUR = new Colour(0.5, 0.7, 1.0);

// Colour
const BLACK = new Colour(0, 0, 0);

// Render
const MAX_RAY_BOUNCES = 50;

onmessage = event => {
    const imageWidth = event.data.imageWidth;
    const imageHeight = event.data.imageHeight;
    const samplesPerPixel = event.data.samplesPerPixel;
    const camera = event.data.camera;
    const world = event.data.world;
    const startH = event.data.startH;
    const endH = event.data.endH;

    for (let h = startH - 1; h >= endH && h >= 0; h--) {
        for (let w = 0; w < imageWidth; w++) {
            let pixelColour = new Colour();
            for (let s = 0; s < samplesPerPixel; s++) {
                const u = (w + Utility.randomDouble()) / (imageWidth - 1);
                const v = (h + Utility.randomDouble()) / (imageHeight - 1);
                const ray = Camera.getRay(camera, u, v);
                pixelColour = Vec3.add(pixelColour, rayColour(ray, world, MAX_RAY_BOUNCES))
            }

            postMessage({
                type: "pixel",
                pixelColour: pixelColour,
                w: w,
                h: h
            });
        }
    }

    postMessage({
        type: "complete"
    });
};

function rayColour(ray, world, depth) {
    if (depth <= 0) {
        return BLACK;
    }

    const hitRecord = new HitRecord();
    if (Hittable.hit(world, ray, 0.001, Infinity, hitRecord)) {
        const bounceDirectionEndPoint = Vec3.add(Vec3.add(hitRecord.p, hitRecord.normal), Vec3.randomInUnitSphere());
        return Colour.multiply(rayColour(new Ray(hitRecord.p, Vec3.subtract(bounceDirectionEndPoint, hitRecord.p)), world, depth - 1), 0.5);
    }

    const unitDirection = Vec3.unitVector(ray.direction);
    const t = 0.5 * (unitDirection.y + 1);
    return Vec3.add(Vec3.multiply(BG_TOP_GRADIENT_COLOUR, (1 - t)), Vec3.multiply(BG_BOT_GRADIENT_COLOUR, t));
}