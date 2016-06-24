'use strict';

const Vec3 = require('../vec3');
const Types = require('./types.js');
const ParameterBase = require('./parameter_base.js');

/**
 * Represents a serializable three component vector object.
 */
class ParameterVec3 extends ParameterBase {
    constructor(name) {
        super(name, Types.VECTOR3);

        this.value = new Vec3();
    }

    set(x, y, z) {
        this.value.set(x, y, z);
    }

    get x() {
        return this.value.x;
    }

    get y() {
        return this.value.y;
    }

    get z() {
        return this.value.z;
    }

    set x(value) {
        this.value.x = value;
    }

    set y(value) {
        this.value.y = value;
    }

    set z(value) {
        this.value.z = value;
    }
}

module.exports = ParameterVec3;
