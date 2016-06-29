'use strict';

const ScriptWriter = require('./script_writer.js');
const EntitySerializer = require('./entity_serializer.js');
const writeParam = require('./param_writer.js');

/**
 * Class used to write entity data to a buffer for transmission across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible,
 */
class EntityWriter extends EntitySerializer {
    constructor() {
        super();

        this.entity = null;
        this.buffer = null;
        this.scriptWriter = new ScriptWriter();
    }

    /**
     * Serializes the state of a specified entity.
     * @param {Entity} entity - The entity to be serialized.
     */
    processEntity(entity) {
        if (!entity) {
            throw new Error('EntityWriter.processEntity - No entity reference was supplied.');
        }

        this.buffer = {
            id: entity.id,
            scripts: [],
            param: []
        };

        this.entity = entity;
        entity.serialize(this);
        this.entity = null;

        // Serialize scripts within the entity
        for (const scriptName of entity.scripts.keys()) {
            if (this.scriptWriter.processScript(scriptName, entity.scripts.get(scriptName))) {
                this.buffer.scripts.push(this.scriptWriter.buffer);
            }
        }

        return this.buffer;
    }

    /**
     * Serializes the specified parameter into the entity representation.
     * @param {ParameterBase} parameter - The parameter to be serialized.
     */
    param(parameter) {
        this.buffer.param.push(writeParam(this.entity, parameter));
    }
}

module.exports = EntityWriter;
