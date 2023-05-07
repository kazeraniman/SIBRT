class Dielectric extends Material {
    ir;

    constructor(indexOfRefraction) {
        super();

        this.type = Material.DIELECTRIC_TYPE;
        this.ir = indexOfRefraction;
    }

    static scatter(material, rayIn, hitRecord, materialScatterRecord) {
        const refractionRatio = hitRecord.frontFace ? 1 / material.ir : material.ir;
        const unitDirection = Vec3.unitVector(rayIn.direction);
        const cosTheta = Math.min(Vec3.dotProduct(Vec3.negate(unitDirection), hitRecord.normal), 1);
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
        const cannotRefract = refractionRatio * sinTheta > 1;
        const direction = cannotRefract || Dielectric.reflectance(cosTheta, refractionRatio) > Utility.randomDouble() ? Vec3.reflect(unitDirection, hitRecord.normal) : Vec3.refract(unitDirection, hitRecord.normal, refractionRatio);

        materialScatterRecord.attenuation = Colour.WHITE;
        materialScatterRecord.rayScattered = new Ray(hitRecord.p, direction);
        return true;
    }

    static reflectance(cosine, refIdx) {
        // Use Schlick's approximation for reflectance.
        let r0 = (1 - refIdx) / (1 + refIdx);
        r0 *= r0;
        return r0 + (1 - r0) * Math.pow((1 - cosine), 5);
    }
}