'use strict';

const crc = require('./crc32.js');

const Network = require('./index.js');
const BufferWriter = require('./buffer_writer.js');
const EntityWriter = require('../serialization/entity_writer.js');


/**
 * Class used to write scene data to a buffer for transmission across the network.
 */
class BinaryWriter {

    /**
     * Prepares the NetworkWriter for use by the title.
     * @param {number} protocolVersion - Version of the data being written.
     */
    constructor(protocolVersion) {
        this.protocolVersion = protocolVersion;

        // TODO: Should buffer be supplied by the client object?
        this.bufferWriter = new BufferWriter();
        this.entityWriter = new EntityWriter();
    }

    /**
     * Called when serialisation is about to begin, flushes all previous data.
     * @param {Buffer} buffer - The memory buffer used as a target for the serialized data.
     * @param {String} message - The message we will building the packet for.
     * @returns {BufferWriter} Object to be used to write the packet data.
     */
    begin(buffer, message) {
        if (!buffer) {
            throw new Error('BinaryWriter.begin - No buffer was specified for serialization.');
        }

        this.bufferWriter.initialize(buffer, 0, buffer.length);
        // How about crc16 for checksum, uint16 for protocol version?
        this.bufferWriter.uint32(0);    // Reserve space for checksum
        this.bufferWriter.uint32(this.protocolVersion); // Can it be a smaller data type?
        this.bufferWriter.uint32(crc(message));

        return this.bufferWriter;
    }

    /**
     * Called when serialisation is finished and the buffer is about to be transmitted.
     * @returns {boolean} True if the buffer contains data to be transmitted otherwise false.
     */
    end() {
        if (this.bufferWriter.dataLength > 4) {
            // Compute checksum for data being sent
            return this.bufferWriter.checksum();
        }

        return false;
    }

    /**
     * Converts a remote procedure call into data that may be sent across the network to a client.
     * @param {String} name - Name of the RPC method to be invoked on the remote machine.
     * @param {Object} args - Parameters to be sent along with the request.
     * @returns {boolean} True if the buffer contains data to be transmitted otherwise false.
     */
    serializeRpc(name, args) {
        const writer = this.begin(RPC_MESSAGE);
        if (writer) {
            this.bufferWriter.uint32(crc(name));
        }

        // TODO: Write parameter data

        // Compute checksum for packet
        return this.end();
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

module.exports = BinaryWriter;
