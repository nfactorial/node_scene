'use strict';

const JsonReader = require('./json/json_reader.js');

/**
 * Class used to read entity data from a buffer transmitted across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible.
 *
 * Note: During development, I managed to reduce the amount of member variables within the class.
 * So much so, that it seems a bit overkill to have the class at all now. Maybe look to swapping to
 * a functional serialization rather than an object based serialization as we have here.
 */
class EntityReader {
    constructor() {
        this.jsonReader = new JsonReader();
    }

    /**
     * Serializes an incoming array of entity data.
     * @param {Scene} scene - Scene which contains the entities.
     * @param {Object[]} data - Array of entity data received from the network.
     */
    readArray(scene, data) {
        for (const entityData of data) {
            const entity = scene.findById(entityData.id);
            if (entity) {
                this.readEntity(entity, entityData);
            }
        }
    }

    /**
     * Serializes the state of a specified entity.
     * @param {Entity} entity - The entity to be serialized.
     * @param {Object} data - Data to be read into the entity instance.
     */
    readEntity(entity, data) {
        if (!entity) {
            throw new Error('EntityReader.readEntity - No entity reference was supplied.');
        }

        if (!data) {
            throw new Error('EntityReader.readEntity - No entity specified for serialization.');
        }

        if (entity.rigidBody) {
            // TODO: Serialise rigid body
        }

        if (data.param) {
            this.jsonReader.initialize(entity, data.param);
            entity.serialize(this.jsonReader);
        }

        this.readScripts(entity, data);
    }

    /**
     * Serializes the script data associated with the incoming entity.
     * @param {Entity} entity - The entity whose scripts are to be serialized.
     * @param {Object} data - Incoming data object being serialized.
     */
    readScripts(entity, data) {
        if (data.scripts) {
            for (const scriptData of data.scripts) {
                const script = entity.getScript(scriptData.name);
                if (script) {
                    this.jsonReader.initialize(script, scriptData.param);
                    script.serialize(this.jsonReader);
                }
            }

            this.jsonReader.clear();
        }
    }
}

module.exports = EntityReader;
