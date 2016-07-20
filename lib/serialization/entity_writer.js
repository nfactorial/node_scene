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

        if (entity.rigidBody) {
            this.buffer = {
                id: entity.id,
                rigidBody: {
                    type: entity.rigidBody.type,
                    mass: entity.rigidBody.mass,
                    restitution: entity.rigidBody.restitution,
                    friction: entity.rigidBody.friction,
                    linearDamping: entity.rigidBody.linearDamping,
                    angularDamping: entity.rigidBody.angularDamping,
                    displacement: {
                        x: entity.rigidBody._displacement.x,
                        y: entity.rigidBody._displacement.y,
                        z: entity.rigidBody._displacement.z
                    },
                    linearVelocity: {
                        x: entity.rigidBody._linearVelocity.x,
                        y: entity.rigidBody._linearVelocity.y,
                        z: entity.rigidBody._linearVelocity.z
                    },
                    angularVelocity: {
                        x: entity.rigidBody._angularVelocity.x,
                        y: entity.rigidBody._angularVelocity.y,
                        z: entity.rigidBody._angularVelocity.z
                    },
                    linearFactor: {
                        x: entity.rigidBody.linearFactor.x,
                        y: entity.rigidBody.linearFactor.y,
                        z: entity.rigidBody.linearFactor.z
                    },
                    angularFactor: {
                        x: entity.rigidBody.angularFactor.x,
                        y: entity.rigidBody.angularFactor.y,
                        z: entity.rigidBody.angularFactor.z
                    }
                },
                scripts: [],
                param: []
            };
        } else {
            this.buffer = {
                id: entity.id,
                scripts: [],
                param: []
            };
        }

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
