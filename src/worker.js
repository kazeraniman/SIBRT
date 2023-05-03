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
const WHITE = new Colour(1, 1, 1);

onmessage = event => {
    const imageWidth = event.data.imageWidth;
    const imageHeight = event.data.imageHeight;
    const samplesPerPixel = event.data.samplesPerPixel;
    const camera = event.data.camera;
    const world = event.data.world;

    for (let h = imageHeight; h >= 0; h--) {
        for (let w = 0; w < imageWidth; w++) {
            let pixelColour = new Colour();
            for (let s = 0; s < samplesPerPixel; s++) {
                const u = (w + Utility.randomDouble()) / (imageWidth - 1);
                const v = (h + Utility.randomDouble()) / (imageHeight - 1);
                const ray = Camera.getRay(camera, u, v);
                pixelColour = Vec3.add(pixelColour, rayColour(ray, world))
            }

            postMessage({
                pixelColour: pixelColour,
                w: w,
                h: h
            });
        }
    }
};

function rayColour(ray, world) {
    const hitRecord = new HitRecord();
    if (Hittable.hit(world, ray, 0, Infinity, hitRecord)) {
        return Colour.multiply(Vec3.add(hitRecord.normal, WHITE), 0.5);
    }

    const unitDirection = Vec3.unitVector(ray.direction);
    const t = 0.5 * (unitDirection.y + 1);
    return Vec3.add(Vec3.multiply(BG_TOP_GRADIENT_COLOUR, (1 - t)), Vec3.multiply(BG_BOT_GRADIENT_COLOUR, t));
}
