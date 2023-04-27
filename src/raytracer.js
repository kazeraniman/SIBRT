const COLOUR_SCALING_FACTOR = 255.999;

raytrace();

function raytrace() {
    let canvas = document.getElementById('main-canvas');
    canvas.width = 480;
    canvas.height = 480;

    let progressBar = document.getElementById('render-progress-bar');

    let ctx = canvas.getContext('2d')

    for (let h = canvas.height - 1; h >= 0; h--) {
        for (let w = 0; w < canvas.width; w++) {
            let pixelColour = new Colour(w / (canvas.width - 1), h / (canvas.height - 1), 0.25)
            writeColourToPixel(ctx, pixelColour, w, (canvas.height - h))
        }

        progressBar.style.width = ((canvas.height - h) / canvas.height) * 100 + "%";
    }
}

function writeColourToPixel(ctx, colour, x, y) {
    ctx.fillStyle = `rgb(${colour.x() * COLOUR_SCALING_FACTOR}, ${colour.y() * COLOUR_SCALING_FACTOR}, ${colour.z() * COLOUR_SCALING_FACTOR})`;
    ctx.fillRect(x, y, 1, 1);
}
