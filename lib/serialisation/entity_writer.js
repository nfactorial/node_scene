'use strict';

const ScriptWriter = require('./script_writer.js');
const EntitySerialiser = require('./entity_serialiser.js');
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
        this.scriptWriter = new ScriptWriter();
    }

    /**
     * Serialises the state of a specified entity.
     * @param {Entity} entity - The entity to be serialised.
     */
    processEntity(entity) {
        if (!entity) {
            throw new Error('EntityWriter.processEntity - No entity reference was supplied.');
        }

        this.buffer = {
            id: entity.id,
            scripts: [],
            data: [],
            rpc: []
        };

        entity.serialise(this);

        // Serialise scripts within the entity
        for (const scriptName of entity.scripts.keys()) {
            if (this.scriptWriter.processScript(scriptName, entity.scripts.get(scriptName))) {
                this.buffer.scripts.push(this.scriptWriter.buffer);
            }
        }
    }

    /**
     * Serialises the specified parameter into the entity representation.
     * @param {ParameterBase} parameter - The parameter to be serialised.
     */
    param(parameter) {
        this.buffer.data.push(writeParam(parameter));
    }

    /**
     * Serialises the specified script within the current entity.
     * @param {String} name - Name associated with the script object.
     * @param {Script} script - The script to be serialised.
     */
    script(name, script) {
        if (this.scriptWriter.processScript(name, script)) {
            this.scripts.push(this.scriptWriter.buffer);
        }
    }
}

module.exports = EntityWriter;
