'use strict';

const ParameterVec3 = require('./parameter_vec3.js');
const ParameterScalar = require('./parameter_scalar.js');
const ParameterString = require('./parameter_string.js');
const ParameterBoolean = require('./parameter_boolean.js');

module.exports = {
    /**
     * Creates a new Parameter that represents a three component vector.
     * @param {String} name - Name to be associated with the parameter.
     * @returns {ParameterBase} Instance of the three component parameter.
     */
    createVec3: function (name) {
        return new ParameterVec3(name);
    },

    /**
     * Creates a new Parameter that represents a single numeric value.
     * @param {String} name - Name to be associated with the parameter.
     * @returns {ParameterBase} Instance of the scalar parameter.
     */
    createScalar: function (name) {
        return new ParameterScalar(name);
    },

    /**
     * Creates a new Parameter that represents a string value.
     * @param {String} name - Name to be associated with the parameter.
     * @returns {ParameterBase} Instance of the string parameter.
     */
    createString: function (name) {
        return new ParameterString(name);
    },

    /**
     * Creates a new Parameter that represents a boolean value.
     * @param {String} name - Name to be associated with the parameter.
     * @returns {ParameterBase} Instance of the boolean parameter.
     */
    createBoolean: function (name) {
        return new ParameterBoolean(name);
    },

    /**
     * Contains the type string associated with each parameter type.
     */
    Types: require('./types.js')
};
