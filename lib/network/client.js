'use strict';

const JsonWriter = require('./json_writer.js');

const DEFAULT_SNAPS = 60;   // Number of world states sent each frame

const MAX_BUFFER_SIZE = 1024 * 16;

/**
 * Manages the state of a single client within the game world.
 */
class Client {

    /**
     * Prepares the client object for use by the running title.
     * @param {Connection} connection - The connection used to communicate with the client.
     * @param {number} clientId - Identifier to be associated with the client.
     * @param {number} protocolVersion - Version number of the data being sent to the client.
     */
    constructor(connection, clientId, protocolVersion) {
        if (!connection) {
            throw new Error('Client - constructor invoked without a valid connection object.');
        }

        this.id = clientId;
        this.connection = connection;
        this.networkWriter = new JsonWriter(protocolVersion);
        this.packetBuffer = Buffer.allocUnsafeSlow(MAX_BUFFER_SIZE);

        this.snaps = DEFAULT_SNAPS;     // Configurable by client, min=1, max=60 (for now)
        this.snapDelta = Math.floor(1000 / this.snaps); // Milliseconds between snaps (computed locally)
        this.lastState = 0;             // Time the last snap was sent to this client
    }

    /**
     * Serializes the current game state and sends the status to the client.
     * @param {Scene} scene - The scene whose state is to be broadcast.
     */
    sendGameState(scene) {
        const delta = this.lastState !== 0 ? Date.now() - this.snapDelta : this.snapDelta;

        if (delta >= this.snapDelta) {
            const writer = this.networkWriter.begin(this.packetBuffer, Client.Messages.STATE_DATA);
            if (writer) {
                for (const entity of scene.nameMap.values()) {
                    writer.serializeEntity(entity);
                }

                if (this.networkWriter.end()) {
                    this.connection.send(this.networkWriter.jsonData);
                    this.lastState = Date.now();
                }
            }
        }
    }

    /**
     * Invokes a remote procedure call on the client machine.
     * @param {String} name - Name of the remote procedure call to be invoked.
     * @param {Object} args - Arguments for the remote procedure call.
     */
    callRpc(name, args) {
        this.connection.send(this.networkWriter.serializeRpc(name, args));
    }

    /**
     * Invokes a remote procedure call on the client machine.
     * @param {String} name - Name of the remote procedure call to be invoked.
     * @param {Object} args - Arguments for the remote procedure call.
     */
    callRpc_Binary(name, args) {
        const writer = this.networkWriter.begin(this.packetBuffer, Client.Messages.RPC);
        if (writer) {
            this.bufferWriter.uint32(crc(name));

            // TODO: Serialise RPC parameters

            if (this.networkWriter.end()) {
                this.connection.send(this.packetBuffer, dataLength);
            }
        }
    }
}

Client.Messages = {
    STATE_DATA: 'STATE_DATA',
    RPC: 'RPC'
};

module.exports = Client;
