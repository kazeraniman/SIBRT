class HitRecord {
    p;
    normal;
    t;
    frontFace;

    static setFaceNormal(hitRecord, ray, outwardNormal) {
        hitRecord.frontFace = Vec3.dotProduct(ray.direction, outwardNormal) < 0;
        hitRecord.normal = hitRecord.frontFace ? outwardNormal : outwardNormal.getNegation();
    }

    static clone(targetHitRecord, sourceHitRecord) {
        targetHitRecord.p = sourceHitRecord.p;
        targetHitRecord.normal = sourceHitRecord.normal;
        targetHitRecord.t = sourceHitRecord.t;
        targetHitRecord.frontFace = sourceHitRecord.frontFace;
    }
}
