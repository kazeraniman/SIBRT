class Ray {
    #origin;
    #direction;

    constructor(origin = new Point3(), direction = new Vec3()) {
        this.#origin = origin;
        this.#direction = direction;
    }

    getOrigin() {
        return this.#origin;
    }

    getDirection() {
        return this.#direction;
    }

    at(t) {
        return Vec3.add(this.getOrigin(), Vec3.multiply(this.getDirection(), t));
    }
}
