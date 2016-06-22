'use strict';

/**
 * Class used to write entity data to a buffer for transmission across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible,
 */
class EntityWriter {
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

module.exports = EntityWriter;
