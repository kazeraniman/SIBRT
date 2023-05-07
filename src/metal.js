class Metal extends Material {
    albedo;
    fuzz;

    constructor(colour, fuzz) {
        super();

        this.type = Material.METAL_TYPE;
        this.albedo = colour;
        this.fuzz = fuzz < 1 ? fuzz : 1;
    }

    static scatter(material, rayIn, hitRecord, materialScatterRecord) {
        let reflected = Vec3.reflect(Vec3.unitVector(rayIn.direction), hitRecord.normal);
        materialScatterRecord.rayScattered = new Ray(hitRecord.p, Vec3.add(reflected, Vec3.multiply(Vec3.randomInUnitSphere(), material.fuzz)));
        materialScatterRecord.attenuation = material.albedo;
        return Vec3.dotProduct(materialScatterRecord.rayScattered.direction, hitRecord.normal) > 0;
    }
}