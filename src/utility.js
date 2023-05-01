class Utility {
    static degreesTorRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static randomDouble(inclusiveMin = 0, exclusiveMax = 1) {
        return inclusiveMin + (exclusiveMax - inclusiveMin) * Math.random();
    }

    static clamp(val, min, max) {
        if (val < min) {
            return min;
        }

        return val > max ? max : val;
    }
}