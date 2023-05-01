class Colour extends Vec3 {
    COLOUR_VALUES = 256;
    COLOUR_MIN = 0;
    COLOUR_MAX = 0.999;
    PIXEL_WIDTH = 1;
    PIXEL_HEIGHT = 1;

    constructor(x = 0, y = 0, z = 0) {
        super(x, y , z);
    }

    writeColourToPixel(ctx, x, y, samplesPerPixel) {
        const scale = 1 / samplesPerPixel;
        let r = this.COLOUR_VALUES * Utility.clamp(this.x() * scale, this.COLOUR_MIN, this.COLOUR_MAX);
        let g = this.COLOUR_VALUES * Utility.clamp(this.y() * scale, this.COLOUR_MIN, this.COLOUR_MAX);
        let b = this.COLOUR_VALUES * Utility.clamp(this.z() * scale, this.COLOUR_MIN, this.COLOUR_MAX);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);
    }
}