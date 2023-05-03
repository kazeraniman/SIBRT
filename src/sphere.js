class Sphere extends Hittable {
    constructor(centre = new Point3(), radius = 0) {
        super();

        this.type = Hittable.SPHERE_TYPE;
        this.centre = centre;
        this.radius = radius;
    }

    static hit(sphere, ray, tMin, tMax, hitRecord) {
        const oc = Vec3.subtract(ray.origin, sphere.centre);
        const a = Vec3.lengthSquared(ray.direction);
        const halfB = Vec3.dotProduct(oc, ray.direction);
        const c = Vec3.lengthSquared(oc) - sphere.radius * sphere.radius;

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
        hitRecord.p = Ray.at(ray, hitRecord.t);
        const outwardNormal = Vec3.divide(Vec3.subtract(hitRecord.p, sphere.centre), sphere.radius);
        HitRecord.setFaceNormal(hitRecord, ray, outwardNormal);
        return true;
    }
}