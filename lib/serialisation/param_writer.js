'use strict';

const Parameter = require('../parameter');

/**
 * Serialises the specified parameter into the entity representation.
 * @param {ParameterBase} parameter - The parameter to be serialised.
 */
var writeParam = function (parameter) {
    if (!parameter) {
        throw new Error('writeParam.param - Invalid parameter specified for writing.');
    }

    switch (parameter.parameterType) {
        case Parameter.Types.VECTOR3:
            return {
                name: parameter.name,
                type: parameter.parameterType,
                x: parameter.x,
                y: parameter.y,
                z: parameter.z
            };

        case Parameter.Types.SCALAR:
            return {
                name: parameter.name,
                type: parameter.parameterType,
                value: parameter.value
            };

        case Parameter.Types.BOOLEAN:
            return {
                name: parameter.name,
                type: parameter.parameterType,
                value: parameter.value
            };

        case Parameter.Types.STRING:
            return {
                name: parameter.name,
                type: parameter.parameterType,
                value: parameter.value
            };

        default:
            throw new Error('writeParam - Unknown type encountered during serialisation.');
    }
};

module.exports = writeParam;
