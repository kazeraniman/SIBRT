class HitRecord {
    p;
    normal;
    t;
    frontFace;

    setFaceNormal(ray, outwardNormal) {
        this.frontFace = Vec3.dotProduct(ray.getDirection(), outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : outwardNormal.getNegation();
    }
}
