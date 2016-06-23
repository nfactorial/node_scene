'use strict';

/**
 * Class used to write entity script data to a buffer for transmission across the network.
 */
class ScriptWriter {
    constructor() {
        this.buffer = null;
    }

    /**
     * Serialises the specified parameter into the entity representation.
     * @param {Parameter} parameter - The parameter to be serialised.
     */
    serialise(parameter) {
        if (parameter) {
            switch (parameter.type) {
                case 'vec3':
                    this.buffer.data.push({
                        name: parameter.name,
                        type: parameter.type,
                        x: parameter.x,
                        y: parameter.y,
                        z: parameter.z
                    });
                    break;

                case 'number':
                    this.buffer.data.push({
                        name: parameter.name,
                        type: parameter.type,
                        value: parameter.value
                    });
                    break;

                case 'boolean':
                    this.buffer.data.push({
                        name: parameter.name,
                        type: parameter.type,
                        value: parameter.value
                    });
                    break;

                case 'string':
                    this.buffer.data.push({
                        name: parameter.name,
                        type: parameter.type,
                        value: parameter.value
                    });
                    break;

                default:
                    throw new Error('Unknown type encountered during serialisation.');
            }
        }
    }
}

module.exports = ScriptWriter;
