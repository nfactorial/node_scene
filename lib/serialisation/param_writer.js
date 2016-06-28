'use strict';

const Parameter = require('../parameter');

/**
 * Serialises the specified parameter into the entity representation.
 * @param {Object} obj - The object the parameter belongs to.
 * @param {Object} parameter - The parameter to be serialised.
 * @param {String} parameter.name - Member variable name of the parameter data.
 * @param {String} parameter.type - Type of data represented by the parameter.
 */
var writeParam = function (obj, parameter) {
    if (!obj) {
        throw new Error('writeParam.obj - Invalid object was specified for writing.');
    }

    if (!parameter) {
        throw new Error('writeParam.param - Invalid parameter specified for writing.');
    }

    switch (parameter.type) {
        case Parameter.Types.VECTOR3:
            return {
                name: parameter.name,
                type: parameter.type,
                x: obj[parameter.name].x,
                y: obj[parameter.name].y,
                z: obj[parameter.name].z
            };

        case Parameter.Types.SCALAR:
            return {
                name: parameter.name,
                type: parameter.type,
                value: obj[parameter.name]
            };

        case Parameter.Types.BOOLEAN:
            return {
                name: parameter.name,
                type: parameter.type,
                value: obj[parameter.name]
            };

        case Parameter.Types.STRING:
            return {
                name: parameter.name,
                type: parameter.type,
                value: obj[parameter.name]
            };

        default:
            throw new Error('writeParam - Unknown type encountered during serialisation.');
    }
};

module.exports = writeParam;
