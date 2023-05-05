class Hittable {
    type;
    material;

    static LIST_TYPE = "list";
    static SPHERE_TYPE = "sphere";

    constructor() {
        if (new.target === Hittable) {
            throw new TypeError("Cannot construct Hittable instances directly");
        }
    }

    static hit(hittable, ray, tMin, tMax, hitRecord) {
        switch (hittable.type) {
            case this.LIST_TYPE:
                return HittableList.hit(hittable, ray, tMin, tMax, hitRecord);
            case this.SPHERE_TYPE:
                return Sphere.hit(hittable, ray, tMin, tMax, hitRecord);
        }
    }
}
