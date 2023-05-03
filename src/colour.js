class Colour extends Vec3 {
    static COLOUR_VALUES = 256;
    static COLOUR_MIN = 0;
    static COLOUR_MAX = 0.999;
    static PIXEL_WIDTH = 1;
    static PIXEL_HEIGHT = 1;

    constructor(x = 0, y = 0, z = 0) {
        super(x, y , z);
    }

    static writeColourToPixel(colour, ctx, x, y, samplesPerPixel) {
        const scale = 1 / samplesPerPixel;
        let r = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.x * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);
        let g = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.y * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);
        let b = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.z * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, Colour.PIXEL_WIDTH, Colour.PIXEL_HEIGHT);
    }
}