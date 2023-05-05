class HitRecord {
    p;
    normal;
    t;
    frontFace;
    material;

    static setFaceNormal(hitRecord, ray, outwardNormal) {
        hitRecord.frontFace = Vec3.dotProduct(ray.direction, outwardNormal) < 0;
        hitRecord.normal = hitRecord.frontFace ? outwardNormal : Vec3.negate(outwardNormal);
    }

    static clone(targetHitRecord, sourceHitRecord) {
        targetHitRecord.p = sourceHitRecord.p;
        targetHitRecord.normal = sourceHitRecord.normal;
        targetHitRecord.t = sourceHitRecord.t;
        targetHitRecord.frontFace = sourceHitRecord.frontFace;
        targetHitRecord.material = sourceHitRecord.material;
    }
}
