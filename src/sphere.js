class Sphere extends Hittable {
    constructor(centre = new Point3(), radius = 0) {
        super();

        this.centre = centre;
        this.radius = radius;
    }

    hit(ray, tMin, tMax, hitRecord) {
        const oc = Vec3.subtract(ray.getOrigin(), this.centre);
        const a = ray.getDirection().lengthSquared();
        const halfB = Vec3.dotProduct(oc, ray.getDirection());
        const c = oc.lengthSquared() - this.radius * this.radius;

        const discriminant = halfB * halfB - a * c;
        if (discriminant < 0) {
            return false;
        }

        const sqrtDiscriminant = Math.sqrt(discriminant);
        let root = (-halfB - sqrtDiscriminant) / a;
        if (root < tMin || root > tMax) {
            root = (-halfB + sqrtDiscriminant) / a;
            if (root < tMin || root > tMax) {
                return false;
            }
        }

        hitRecord.t = root;
        hitRecord.p = ray.at(hitRecord.t);
        hitRecord.normal = Vec3.divide(Vec3.subtract(hitRecord.p, this.centre), this.radius);
        return true;
    }
}