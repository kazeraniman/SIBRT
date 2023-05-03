class Vec3 {
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static negate(vec) {
        return new Vec3(-vec.x, -vec.y, -vec.z);
    }

    static length(vec) {
        return Math.sqrt(Vec3.lengthSquared(vec));
    }

    static lengthSquared(vec) {
        return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z
    }

    static toString(vec) {
        return `(${vec.x}, ${vec.y}, ${vec.z})`;
    }

    static add(firstVec, secondVec) {
        return new Vec3(firstVec.x + secondVec.x, firstVec.y + secondVec.y, firstVec.z + secondVec.z);
    }

    static subtract(firstVec, secondVec) {
        return new Vec3(firstVec.x - secondVec.x, firstVec.y - secondVec.y, firstVec.z - secondVec.z);
    }

    static multiply(firstVec, multiplier) {
        if (typeof multiplier instanceof Vec3) {
            return new Vec3(firstVec.x * multiplier.x, firstVec.y * multiplier.y, firstVec.z * multiplier.z);
        }

        return new Vec3(firstVec.x * multiplier, firstVec.y * multiplier, firstVec.z * multiplier)
    }

    static divide(firstVec, divisor) {
        return this.multiply(firstVec, (1 / divisor));
    }

    static dotProduct(firstVec, secondVec) {
        return firstVec.x * secondVec.x + firstVec.y * secondVec.y + firstVec.z * secondVec.z;
    }

    static crossProduct(firstVec, secondVec) {
        return new Vec3(
            firstVec.y * secondVec.z - firstVec.z * secondVec.y,
            firstVec.z * secondVec.x - firstVec.x * secondVec.z,
            firstVec.x * secondVec.y - firstVec.y * secondVec.x
        );
    }

    static unitVector(vec) {
        return this.divide(vec, Vec3.length(vec));
    }
}

const Point3 = Vec3;
