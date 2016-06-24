'use strict';

/**
 * Represents a serializable value.
 */
class ParameterBase {
    constructor(name, type) {
        if (!name) {
            throw new Error('Parameter.constructor - name was not specified.');
        }

        if (!type) {
            throw new Error('Parameter.constructor - type was not specified.');
        }

        this.name = name;
        this.parameterType = type;
    }
}

module.exports = ParameterBase;
