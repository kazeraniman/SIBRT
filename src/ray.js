class Ray {
    origin;
    direction;

    constructor(origin = new Point3(), direction = new Vec3()) {
        this.origin = origin;
        this.direction = direction;
    }

    static at(ray, t) {
        return Vec3.add(ray.origin, Vec3.multiply(ray.direction, t));
    }
}
