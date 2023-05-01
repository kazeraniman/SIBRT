class Hittable {
    constructor() {
        if (new.target === Hittable) {
            throw new TypeError("Cannot construct Hittable instances directly");
        }
    }

    hit(ray, tMin, tMax, hitRecord) {
        throw new TypeError("Method hit must be implemented");
    }
}
