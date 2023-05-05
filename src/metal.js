class Metal extends Material {
    albedo;

    constructor(colour) {
        super();

        this.type = Material.METAL_TYPE;
        this.albedo = colour;
    }

    static scatter(material, rayIn, hitRecord, materialScatterRecord) {
        let reflected = Vec3.reflect(Vec3.unitVector(rayIn.direction), hitRecord.normal);
        materialScatterRecord.rayScattered = new Ray(hitRecord.p, reflected);
        materialScatterRecord.attenuation = material.albedo;
        return Vec3.dotProduct(materialScatterRecord.rayScattered.direction, hitRecord.normal) > 0;
    }
}