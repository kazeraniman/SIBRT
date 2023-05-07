class Vec3 {
    x;
    y;
    z;

    static EPSILON = 1e-8;

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
        if (multiplier instanceof Vec3) {
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

    static random(inclusiveMin = 0, exclusiveMax = 1) {
        return new Vec3(Utility.randomDouble(inclusiveMin, exclusiveMax), Utility.randomDouble(inclusiveMin, exclusiveMax), Utility.randomDouble(inclusiveMin, exclusiveMax));
    }

    static randomInUnitSphere() {
        while(true) {
            const p = Vec3.random(-1, 1);
            if (Vec3.lengthSquared(p) >= 1) {
                continue;
            }

            return p;
        }
    }

    static randomUnitVector() {
        return Vec3.unitVector(this.randomInUnitSphere());
    }

    static randomInHemisphere(normal) {
        let inUnitSphere = Vec3.randomInUnitSphere();
        if (Vec3.dotProduct(inUnitSphere, normal) > 0) {
            return inUnitSphere;
        }

        return Vec3.negate(inUnitSphere);
    }

    static isNearZero(vec) {
        return Math.abs(vec.x) < Vec3.EPSILON && Math.abs(vec.y) < Vec3.EPSILON && Math.abs(vec.z) < Vec3.EPSILON;
    }

    static reflect(vec, normal) {
        return Vec3.subtract(vec, Vec3.multiply(normal, 2 * Vec3.dotProduct(vec, normal)));
    }

    static refract(uv, normal, etaiOverEtat) {
        const cosTheta = Math.min(Vec3.dotProduct(Vec3.negate(uv), normal), 1);
        const rayOutPerp = Vec3.multiply(Vec3.add(Vec3.multiply(normal, cosTheta), uv), etaiOverEtat);
        const rayOutParallel = Vec3.multiply(normal, -Math.sqrt(Math.abs(1 - Vec3.lengthSquared(rayOutPerp))));
        return Vec3.add(rayOutPerp, rayOutParallel);
    }
}

const Point3 = Vec3;
