'use strict';

const Parameter = require('../../parameter');

/**
 * Reads the value of the parameter from the specified data source.
 * @param {Object} obj - The object whose property value is to be read.
 * @param {String} name - Name of the object property the parameter value is to be assigned to.
 * @param {Object} parameter - The incoming parameter data being read.
 * @param {String} parameter.type - The type of parameter data represented.
 */
var readParam = function (obj, name, parameter) {
    switch (parameter.type) {
        case Parameter.Types.VECTOR3:
            obj[name].x = parameter.x;
            obj[name].y = parameter.y;
            obj[name].z = parameter.z;
            break;

        case Parameter.Types.SCALAR:
            obj[name] = parameter.value;
            break;

        case Parameter.Types.BOOLEAN:
            obj[name] = parameter.value;
            break;

        case Parameter.Types.STRING:
            obj[name] = parameter.value;
            break;

        case Parameter.Types.QUATERNION:
            obj[name].x = parameter.x;
            obj[name].y = parameter.y;
            obj[name].z = parameter.z;
            obj[name].w = parameter.w;
            break;

        default:
            throw new Error('readParam - Unknown type encountered during serialization.');
    }
};

/**
 * Implements a reader for parameter data from a JSON data source.
 */
class JsonReader {
    constructor() {
        this.obj = null;
        this.count = 0;
        this.parameters = null;
    }

    /**
     * Prepares the JsonReader object for use by the framework.
     * @param {Serializable} obj - The object whose parameter data is being read.
     * @param {Array} parameters - Array of parameter data available for reading.
     */
    initialize(obj, parameters) {
        this.obj = obj;
        this.count = parameters ? parameters.length : 0;
        this.parameters = parameters;
    }

    /**
     * Removes all data currently contained within the serializer, this is useful to ensure the object is not
     * referencing external objects once serialization has completed. Allowing the garbage collector to discard
     * them when necessary.
     */
    clear() {
        this.obj = null;
        this.count = 0;
        this.parameters = null;
    }

    /**
     * Reads the value of a single parameter from the data source.
     * @param {Object} parameterInfo - The parameter whose value is to be read.
     * @param {String} parameterInfo.type - The type of data expected by the parameter.
     * @param {String} parameterInfo.name - The name of the parameter being read.
     */
    param(parameterInfo) {
        for (var loop = 0; loop < this.count; ++loop) {
            if (this.parameters[loop].name === parameterInfo.name) {
                if (this.parameters[loop].type === parameterInfo.type) {
                    readParam(this.obj, parameterInfo.name, this.parameters[loop]);
                } else {
                    throw new Error('Data type mismatch in parameter data, expected ' + parameterInfo.type +
                        'but network data was of type ' + this.parameters[loop].type + '.');
                }
            }
        }
    }
}

module.exports = JsonReader;
