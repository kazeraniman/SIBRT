class HittableList extends Hittable{
    hittables;

    constructor(hittable = null) {
        super();

        this.type = Hittable.LIST_TYPE;
        this.hittables = [];
        if (hittable != null) {
            HittableList.add(this, hittable);
        }
    }

    static add(hittableList, hittable) {
        hittableList.hittables.push(hittable);
    }

    static clear(hittableList) {
        hittableList.hittables.clear();
    }

    static hit(hittableList, ray, tMin, tMax, hitRecord) {
        const currentHitRecord = new HitRecord();
        let hitAnything = false;
        let closestSoFar = tMax;

        hittableList.hittables.forEach(hittable => {
            if (!Hittable.hit(hittable, ray, tMin, closestSoFar, currentHitRecord)) {
                return;
            }

            hitAnything = true;
            closestSoFar = currentHitRecord.t;
            HitRecord.clone(hitRecord, currentHitRecord);
        });

        return hitAnything;
    }
}
