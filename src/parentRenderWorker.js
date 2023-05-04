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

// Workers
const WORKER_COUNT = 1;
const idWorkerMapping = {};
const workerIdMapping = {};
const availableWorkers = [];
for (let i = 0; i < WORKER_COUNT; i++) {
    const worker = new Worker('childRenderWorker.js');
    worker.onmessage = reportResult;
    idWorkerMapping[i] = worker;
    workerIdMapping[worker] = i;
    availableWorkers.push(worker);
}

onmessage = event => {
    render(event);
};

async function render(event) {
    const imageWidth = event.data.imageWidth;
    const imageHeight = event.data.imageHeight;
    const samplesPerPixel = event.data.samplesPerPixel;
    const camera = event.data.camera;
    const world = event.data.world;

    for (let h = imageHeight; h >= 0; h--) {
        for (let w = 0; w < imageWidth; w++) {
            await Utility.waitUntil(() => availableWorkers.length !== 0);
            const worker = availableWorkers.pop();
            worker.postMessage({
                workerId: workerIdMapping[worker],
                imageWidth: imageWidth,
                imageHeight: imageHeight,
                samplesPerPixel: samplesPerPixel,
                camera: camera,
                world: world,
                w: w,
                h: h
            });
        }
    }

    await Utility.waitUntil(() => availableWorkers.length === WORKER_COUNT);

    postMessage({
        type: 'complete'
    });
}

function reportResult(event) {
    postMessage({
        type: 'pixel',
        pixelColour: event.data.pixelColour,
        w: event.data.w,
        h: event.data.h
    });

    availableWorkers.push(idWorkerMapping[event.data.workerId]);
}
