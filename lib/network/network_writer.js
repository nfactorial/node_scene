'use strict';

const Network = require('./index.js');
const EntityWriter = require('./entity_writer');

const DATA_VERSION = 0;


/**
 * Class used to write scene data to a buffer for transmission across the network.
 *
 * This is currently NON performant, and intended to just get things up and running.
 * Major rework is necessary to improve performance of the serialisation, however
 * the intent is to solidify the interface such that future rework will have as
 * small an impact on the rest of the codebase as possible,
 */
class NetworkWriter {
    constructor() {
        this.buffer = {
            message: 'STATE_DATA',
            version: DATA_VERSION,
            rpc: [],
            entities: []
        };

        this.jsonData = '';
        this.entitySerialiser = new EntityWriter();
    }

    /**
     * Called when serialisation is about to begin, flushes all previous data.
     */
    begin() {
    }

    /**
     * Called when serialisation is finished and the buffer is about to be transmitted.
     * @returns {boolean} True if the buffer contained data to be transmitted otherwise false.
     */
    end() {
        if (this.buffer.rpc.length > 0 || this.buffer.entities.length > 0) {
            this.jsonData = JSON.stringify(this.buffer);

            this.buffer.rpc = [];
            this.buffer.entities = [];

            return true;
        }

        return false;
    }

    /**
     * Adds a remote procedure call (RPC) to the network.
     * A remote procedure call is a method that will be invoked on the client, parameters are currently not supported
     * but will be added in the future.
     * @param {String} name - Name of the RPC to be invoked.
     * @param {Object} args - Arguments for the remote procedure call.
     */
    addRpc(name, args) {
        this.buffer.rpc.push({
            name: name,
            args: args
        });
    }

    /**
     * Given an entity instance, perform the necessary network serialisation.
     * @param {Entity} entity - The entity to be serialised.
     */
    serialiseEntity(entity) {
        if (entity) {
            switch (entity.networkRole) {
                case Network.Role.None:
                    // Entities with a role of 'None' do nothing
                    break;

                case Network.Role.Local:
                    // TODO: Here is where we will determine the relevancy of the entity for the intended client
                    // TODO: Have to do it here, as we know which network role the entity is using

                    // We are authoritative for this entity, send state to interested parties
                    this.entitySerialiser.buffer = {
                        id: entity.id,
                        data: [],
                        rpc: []
                    };

                    entity.serialise(this.entitySerialiser);

                    this.entities.push(this.entitySerialiser.buffer);
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

module.exports = NetworkWriter;
