class Material {
    type;

    static LAMBERTIAN_TYPE = "lambertian";
    static METAL_TYPE = "metal";
    static DIELECTRIC_TYPE = "dielectric";

    constructor() {
        if (new.target === Material) {
            throw new TypeError("Cannot construct Hittable instances directly");
        }
    }

    static scatter(material, rayIn, hitRecord, materialScatterRecord) {
        switch (material.type) {
            case this.LAMBERTIAN_TYPE:
                return Lambertian.scatter(material, rayIn, hitRecord, materialScatterRecord);
            case this.METAL_TYPE:
                return Metal.scatter(material, rayIn, hitRecord, materialScatterRecord);
            case this.DIELECTRIC_TYPE:
                return Dielectric.scatter(material, rayIn, hitRecord, materialScatterRecord);
        }
    }
}
