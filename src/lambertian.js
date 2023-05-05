class Lambertian extends Material {
    albedo;

    constructor(colour) {
        super();

        this.type = Material.LAMBERTIAN_TYPE;
        this.albedo = colour;
    }

    static scatter(material, rayIn, hitRecord, materialScatterRecord) {
        let scatterDirection = Vec3.add(hitRecord.normal, Vec3.randomUnitVector());

        if (Vec3.isNearZero(scatterDirection)) {
            scatterDirection = hitRecord.normal;
        }

        materialScatterRecord.rayScattered = new Ray(hitRecord.p, scatterDirection);
        materialScatterRecord.attenuation = material.albedo;
        return true;
    }
}