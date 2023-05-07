class Colour extends Vec3 {
    static COLOUR_VALUES = 256;
    static COLOUR_MIN = 0;
    static COLOUR_MAX = 0.999;

    constructor(x = 0, y = 0, z = 0) {
        super(x, y , z);
    }

    static writeColourToPixel(colour, imageData, canvasWidth, x, y, samplesPerPixel) {
        const [redIndex, greenIndex, blueIndex, alphaIndex] = Colour.getColourIndicesForCoord(x, y, canvasWidth);
        const scale = 1 / samplesPerPixel;
        imageData.data[redIndex] = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.x * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);
        imageData.data[greenIndex] = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.y * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);
        imageData.data[blueIndex] = Colour.COLOUR_VALUES * Utility.clamp(Math.sqrt(colour.z * scale), Colour.COLOUR_MIN, Colour.COLOUR_MAX);
    }

    static getColourIndicesForCoord(x, y, width) {
        const red = y * (width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
    }
}