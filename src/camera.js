class Camera {
    origin;
    lowerLeftCorner;
    horizontal;
    vertical;

    constructor() {
        const ASPECT_RATIO = 16/9;
        const VIEWPORT_HEIGHT = 2;
        const VIEWPORT_WIDTH = ASPECT_RATIO * VIEWPORT_HEIGHT;
        const FOCAL_LENGTH = 1;

        this.origin = new Point3(0, 0, 0);
        this.horizontal = new Vec3(VIEWPORT_WIDTH, 0, 0);
        this.vertical = new Vec3(0, VIEWPORT_HEIGHT, 0);
        this.lowerLeftCorner = Vec3.subtract(Vec3.subtract(Vec3.subtract(this.origin, Vec3.divide(this.horizontal, 2)), Vec3.divide(this.vertical, 2)), new Point3(0, 0, FOCAL_LENGTH));
    }

    static getRay(camera, u, v) {
        const horizontalComponent = Vec3.multiply(camera.horizontal, u);
        const verticalComponent = Vec3.multiply(camera.vertical, v);
        return new Ray(camera.origin, Vec3.subtract(Vec3.add(Vec3.add( camera.lowerLeftCorner, horizontalComponent), verticalComponent), camera.origin))
    }
}
