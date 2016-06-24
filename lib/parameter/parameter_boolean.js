'use strict';

const Types = require('./types.js');
const ParameterBase = require('./parameter_base.js');

/**
 * Represents a serializable boolean object.
 */
class ParameterBoolean extends ParameterBase {
    constructor(name) {
        super(name, Types.BOOLEAN);

        this.value = false;
    }

    set(value) {
        this.value = value;
    }
}

module.exports = ParameterBoolean;
