'use strict';

const Network = require('./index.js');
const EntityWriter = require('../serialization/entity_writer.js');


/**
 * Class used to write scene data to a buffer for transmission across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible,
 */
class JsonkWriter {

    /**
     * Prepares the NetworkWriter for use by the title.
     * @param {number} protocolVersion - Version of the data being written.
     */
    constructor(protocolVersion) {
        this.rpc = {
            message: 'RPC',
            version: protocolVersion,
            type: '',
            args: {}
        };

        this.buffer = {
            message: 'STATE_DATA',
            version: protocolVersion,
            entities: []
        };

        this.jsonData = '';
        this.entityWriter = new EntityWriter();
    }

    /**
     * Called when serialisation is about to begin, flushes all previous data.
     */
    begin(buffer, message) {
        this.buffer.message = message;
        return this;
    }

    /**
     * Called when serialisation is finished and the buffer is about to be transmitted.
     * @returns {boolean} True if the buffer contained data to be transmitted otherwise false.
     */
    end() {
        if (this.buffer.entities.length > 0) {
            this.jsonData = JSON.stringify(this.buffer);

            this.buffer.entities = [];

            return true;
        }

        return false;
    }

    /**
     * Converts a remote procedure call into data that may be sent across the network to a client.
     * A remote procedure call is a method that will be invoked on the client, parameters are currently not supported
     * but will be added in the future.
     * @param {String} name - Name of the RPC method to be invoked on the remote machine.
     * @param {Object} args - Parameters to be sent along with the request.
     */
    serializeRpc(name, args) {
        this.rpc.type = name;
        this.rpc.args = args;

        return JSON.stringify(this.rpc);
    }

    /**
     * Given an entity instance, perform the necessary network serialisation.
     * @param {Entity} entity - The entity to be serialized.
     */
    serializeEntity(entity) {
        // TODO: Move this logic into the EntityWriter class?
        if (entity) {
            switch (entity.networkRole) {
                case Network.Role.None:
                    // Entities with a role of 'None' are not serialized over the network.
                    break;

                case Network.Role.Local:
                    {
                        // TODO: Here is where we will determine the relevancy of the entity for the intended client
                        // TODO: Have to do it here, as we know which network role the entity is using

                        // We are authoritative for this entity, send state to interested parties
                        const data = this.entityWriter.processEntity(entity);
                        if (data) {
                            this.buffer.entities.push(data);
                        }
                    }
                    break;

                case Network.Role.Remote:
                    // We are not authoritative for this entity, but we may make RPC requests for it
                    break;

                default:
                    throw new Error('Unknown network role found in entity.');
            }
        }
    }
}

module.exports = JsonkWriter;
