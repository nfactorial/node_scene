'use strict';

const Parameter = require('../parameter');

/**
 * This class provides support for an object to be serialised across the network.
 */
class Serialisable {
    constructor() {
        this.serialiseParameters = [];
    }

    /**
     * Adds a serialised string parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a string.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterString(name) {
        this.serialiseParameters.push({
            name: name,
            type: Parameter.Types.STRING
        });
    }

    /**
     * Adds a serialised scalar parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a scalar.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterScalar(name) {
        this.serialiseParameters.push({
            name: name,
            type: Parameter.Types.SCALAR
        });
    }

    /**
     * Adds a serialised boolean parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a boolean.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterBoolean(name) {
        this.serialiseParameters.push({
            name: name,
            type: Parameter.Types.BOOLEAN
        });
    }

    /**
     * Adds a serialised Vector3 parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a Vec3.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterVec3(name) {
        this.serialiseParameters.push({
            name: name,
            type: Parameter.Types.VECTOR3
        });
    }

    /**
     * Serialises all parameters associated with the script.
     * @param {SerialiserBase} serialiser - The serialiser for the parameters.
     */
    serialise(serialiser) {
        for (const parameter of this.serialiseParameters) {
            serialiser.param(parameter);
        }
    }
}

module.exports = Serialisable;
