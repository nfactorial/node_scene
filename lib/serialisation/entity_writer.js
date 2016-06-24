'use strict';

const EntitySerialiser = require('./entity_serialiser.js')
const writeParam = require('./param_writer.js');

/**
 * Class used to write entity data to a buffer for transmission across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible,
 */
class EntityWriter extends EntitySerialiser {
    constructor() {
        super();

        this.buffer = null;
    }

    /**
     * Serialises the state of a specified entity.
     * @param {Entity} entity - The entity to be serialised.
     */
    processEntity(entity) {
        if (!entity) {
            throw new Error('EntityWriter.processEntity - No entity reference was supplied.')
        }

        this.buffer = {
            id: entity.id,
            scripts: [],
            data: [],
            rpc: []
        };

        entity.serialise(this);

        // TODO: Serialise scripts within the entity
    }

    /**
     * Serialises the specified parameter into the entity representation.
     * @param {Parameter} parameter - The parameter to be serialised.
     */
    param(parameter) {
        this.buffer.data.push(writeParam(parameter));
    }
}

module.exports = EntityWriter;
