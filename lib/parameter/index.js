'use strict';

const ParameterVec3 = require('./parameter_vec3.js');
const ParameterScalar = require('./parameter_scalar.js');
const ParameterString = require('./parameter_string.js');
const ParameterBoolean = require('./parameter_boolean.js');

module.exports = {
    /**
     * Creates a new Parameter that represents a three component vector.
     * If default values are not specified the vector will be initialized to 0, 0, 0.
     * @param {String} name - Name to be associated with the parameter.
     * @param {number=} x - Value to initialize the x component with (optional).
     * @param {number=} y - Value to initialize the y component with (optional).
     * @param {number=} z - Value to initialize the z component with (optional).
     * @returns {ParameterBase} Instance of the three component parameter.
     */
    createVec3: function (name, x, y, z) {
        const param = new ParameterVec3(name);
        if (x !== undefined && y !== undefined && z !== undefined) {
            param.set(x, y, z);
        }

        return param;
    },

    /**
     * Creates a new Parameter that represents a single numeric value.
     * If a default value is not specified the scalar will be initialized to 0.
     * @param {String} name - Name to be associated with the parameter.
     * @param {number=} value - Value to initialize the parameter with (optional).
     * @returns {ParameterBase} Instance of the scalar parameter.
     */
    createScalar: function (name, value) {
        const param = new ParameterScalar(name);
        if (value !== undefined) {
            param.value = value;
        }

        return param;
    },

    /**
     * Creates a new Parameter that represents a string value.
     * If a default value is not specified the scalar will be initialized to ''.
     * @param {String} name - Name to be associated with the parameter.
     * @param {String} value - Value to initialize the parameter with (optional).
     * @returns {ParameterBase} Instance of the string parameter.
     */
    createString: function (name, value) {
        const param = new ParameterString(name);
        if (value !== undefined) {
            param.value = value;
        }

        return param;
    },

    /**
     * Creates a new Parameter that represents a boolean value.
     * If a default value is not specified the scalar will be initialized to false.
     * @param {String} name - Name to be associated with the parameter.
     * @param {boolean=} value - Value to initialize the parameter with (optional).
     * @returns {ParameterBase} Instance of the boolean parameter.
     */
    createBoolean: function (name, value) {
        const param = new ParameterBoolean(name);
        if (value !== undefined) {
            param.value = value;
        }

        return param;
    },

    /**
     * Contains the type string associated with each parameter type.
     */
    Types: require('./types.js')
};
