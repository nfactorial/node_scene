'use strict';

const Types = require('./types.js');
const ParameterBase = require('./parameter_base.js');

/**
 * Represents a serializable scalar value.
 */
class ParameterScalar extends ParameterBase {
    constructor(name) {
        super(name, Types.SCALAR);

        this.value = 0;
    }

    set(value) {
        this.value = value;
    }
}

module.exports = ParameterScalar;
