'use strict';

const Types = require('./types.js');
const ParameterBase = require('./parameter_base.js');

/**
 * Represents a serializable string object.
 */
class ParameterString extends ParameterBase {
    constructor(name) {
        super(name, Types.STRING);

        this.value = '';
    }

    set(value) {
        this.value = value;
    }
}

module.exports = ParameterString;
