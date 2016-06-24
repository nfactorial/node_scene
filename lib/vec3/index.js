'use strict';

class Vec3 {
    constructor() {
        this.data = new Float32Array(3);

        if (arguments.length === 3) {
            this.data.set(arguments);
        } else {
            this.data[0] = 0;
            this.data[1] = 0;
            this.data[2] = 0;
        }
    }

    add(rhs) {
        this.data[0] += rhs.data[0];
        this.data[1] += rhs.data[1];
        this.data[2] += rhs.data[2];

        return this;
    }

    add2(lhs, rhs) {
        this.data[0] = lhs.data[0] + rhs.data[0];
        this.data[1] = lhs.data[1] + rhs.data[1];
        this.data[2] = lhs.data[2] + rhs.data[2];
    }

    sub(rhs) {
        this.data[0] -= rhs.data[0];
        this.data[1] -= rhs.data[1];
        this.data[2] -= rhs.data[2];

        return this;
    }

    sub2(lhs, rhs) {
        this.data[0] = lhs.data[0] - rhs.data[0];
        this.data[1] = lhs.data[1] - rhs.data[1];
        this.data[2] = lhs.data[2] - rhs.data[2];

        return this;
    }

    set(x, y, z) {
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = z;
    }

    /**
     * Copies the contents of one Vec3 object.
     * @param {Vec3} rhs - The Vec3 whose values are to be copied.
     * @returns {Vec3}
     */
    copy(rhs) {
        this.data[0] = rhs.data[0];
        this.data[1] = rhs.data[1];
        this.data[2] = rhs.data[2];

        return this;
    }

    /**
     * Creates a new instance of the Vec3 object with the same values.
     * @returns {Vec3} The newly created Vec3.
     */
    clone() {
        return new Vec3().copy(this);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {Vec3} rhs -
     * @returns {number} The dot product of the two vectors.
     */
    dot(rhs) {
        return this.data[0] * rhs.data[0] + this.data[1] * rhs.data[1] + this.data[2] * rhs.data[2];
    }

    /**
     * Computes the cross product of two vector.
     * @param {Vec3} lhs
     * @param {Vec3} rhs
     * @returns {Vec3}
     */
    cross(lhs, rhs) {
        var a = lhs.data;
        var b = rhs.data;
        var r = this.data;

        var ax = a[0];
        var ay = a[1];
        var az = a[2];
        var bx = b[0];
        var by = b[1];
        var bz = b[2];

        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;

        return this;
    }

    /**
     * Computes the squared length of the vector.
     * @returns {number} The squared length of the vector.
     */
    lengthSq() {
        return this.dot(this);
    }

    /**
     * Computes the length of the vector.
     * @returns {number} The length of the vector.
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * Scales the Vec3 components by the specified scalar value
     * @param {Number} scalar - Amount to scale each component with.
     * @returns {Vec3}
     */
    scale(scalar) {
        this.data[0] *= scalar;
        this.data[1] *= scalar;
        this.data[2] *= scalar;

        return this;
    }

    /**
     * Makes the Vec3 objects length equal to 1.
     */
    normalize() {
        this.scale(1 / this.length());
    }

    /**
     * Converts the Vec3 object into a readable string representation.
     * @returns {string} The Vec3 contents as a string.
     */
    toString() {
        return '[' + this.data[0] + ', ' + this.data[1] + ', ' + this.data[2] + ']';
    }

    /**
     * Property definition for the x coordinate.
     * @returns {Number}
     */
    get x() {
        return this.data[0];
    }

    /**
     * Property definition for the y coordinate.
     * @returns {Number}
     */
    get y() {
        return this.data[1];
    }

    /**
     * Property definition for the z coordinate.
     * @returns {Number}
     */
    get z() {
        return this.data[2];
    }

    /**
     *
     * @param {Number} value
     */
    set x(value) {
        this.data[0] = value;
    }

    /**
     *
     * @param {Number} value
     */
    set y(value) {
        this.data[1] = value;
    }

    /**
     *
     * @param {Number} value
     */
    set z(value) {
        this.data[2] = value;
    }
}

module.exports = Vec3;
