'use strict';

const Parameter = require('../parameter');

/**
 * This class provides support for an object to be serialized across the network.
 */
class Serializable {
    constructor() {
        this.serializeParameters = [];
    }

    /**
     * Adds a serialized string parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a string.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterString(name) {
        this.serializeParameters.push({
            name: name,
            type: Parameter.Types.STRING
        });
    }

    /**
     * Adds a serialized scalar parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a scalar.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterScalar(name) {
        this.serializeParameters.push({
            name: name,
            type: Parameter.Types.SCALAR
        });
    }

    /**
     * Adds a serialized boolean parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a boolean.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterBoolean(name) {
        this.serializeParameters.push({
            name: name,
            type: Parameter.Types.BOOLEAN
        });
    }

    /**
     * Adds a serialized Vector3 parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a Vec3.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterVec3(name) {
        this.serializeParameters.push({
            name: name,
            type: Parameter.Types.VECTOR3
        });
    }

    /**
     * Adds a serialized Quaternion parameter to the script object.
     * The name of the parameter *must* match the member variable name, and its type *must* be a Quaternion.
     * @param {String} name - Name of the member variable containing the parameters value.
     */
    addParameterQuaternion(name) {
        this.serializeParameters.push({
            name: name,
            type: Parameter.Types.QUATERNION
        });
    }
    
    /**
     * Serializes all parameters associated with the script.
     * @param {SerializerBase} serializer - The serializer for the parameters.
     */
    serialize(serializer) {
        for (const parameter of this.serializeParameters) {
            serializer.param(parameter);
        }
    }
}

module.exports = Serializable;
