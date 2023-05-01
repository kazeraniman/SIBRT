class Vec3 {
    #vec;

    constructor(x = 0, y = 0, z = 0) {
        this.#vec = [x, y, z];
    }

    x() {
        return this.#vec[0];
    }

    y() {
        return this.#vec[1];
    }

    z() {
        return this.#vec[2];
    }

    getNegation() {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    addWith(otherVec3) {
        this.#vec[0] += otherVec3.x();
        this.#vec[1] += otherVec3.y();
        this.#vec[2] += otherVec3.z();
        return this;
    }

    multiplyBy(val) {
        this.#vec[0] *= val;
        this.#vec[1] += val;
        this.#vec[2] += val;
        return this;
    }

    divideBy(val) {
        this.multiplyBy(1/val);
        return this;
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return this.x() * this.x() + this.y() * this.y() + this.z() * this.z()
    }

    toString() {
        return `(${this.x()}, ${this.y()}, ${this.z()})`;
    }

    static add(firstVec, secondVec) {
        return new Vec3(firstVec.x() + secondVec.x(), firstVec.y() + secondVec.y(), firstVec.z() + secondVec.z());
    }

    static subtract(firstVec, secondVec) {
        return new Vec3(firstVec.x() - secondVec.x(), firstVec.y() - secondVec.y(), firstVec.z() - secondVec.z());
    }

    static multiply(firstVec, multiplier) {
        if (typeof multiplier instanceof Vec3) {
            return new Vec3(firstVec.x() * multiplier.x(), firstVec.y() * multiplier.y(), firstVec.z() * multiplier.z());
        }

        return new Vec3(firstVec.x() * multiplier, firstVec.y() * multiplier, firstVec.z() * multiplier)
    }

    static divide(firstVec, divisor) {
        return this.multiply(firstVec, (1 / divisor));
    }

    static dotProduct(firstVec, secondVec) {
        return firstVec.x() * secondVec.x() + firstVec.y() * secondVec.y() + firstVec.z() * secondVec.z();
    }

    static crossProduct(firstVec, secondVec) {
        return new Vec3(
            firstVec.y() * secondVec.z() - firstVec.z() * secondVec.y(),
            firstVec.z() * secondVec.x() - firstVec.x() * secondVec.z(),
            firstVec.x() * secondVec.y() - firstVec.y() * secondVec.x()
        );
    }

    static unitVector(vec) {
        return this.divide(vec, vec.length());
    }
}

const Point3 = Vec3;
