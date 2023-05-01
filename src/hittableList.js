class HittableList extends Hittable{
    #hittables;

    constructor(hittable = null) {
        super();

        this.#hittables = [];
        if (hittable != null) {
            this.add(hittable);
        }
    }

    add(hittable) {
        this.#hittables.push(hittable);
    }

    clear() {
        this.#hittables.clear();
    }

    hit(ray, tMin, tMax, hitRecord) {
        const currentHitRecord = new HitRecord();
        let hitAnything = false;
        let closestSoFar = tMax;

        this.#hittables.forEach(hittable => {
            if (!hittable.hit(ray, tMin, closestSoFar, currentHitRecord)) {
                return;
            }

            hitAnything = true;
            closestSoFar = currentHitRecord.t;
            hitRecord.clone(currentHitRecord);
        });

        return hitAnything;
    }
}
