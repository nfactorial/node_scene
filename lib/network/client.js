'use strict';

const NetworkWriter = require('./network_writer.js');

const DEFAULT_SNAPS = 40;   // Number of world states sent each frame


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
        this.networkWriter = new NetworkWriter(protocolVersion);

        this.snaps = DEFAULT_SNAPS;     // Configurable by client, min=1, max=60 (for now)
        this.snapDelta = Math.floor(1000 / this.snaps); // Milliseconds between snaps (computed locally)
        this.lastState = 0;             // Time the last snap was sent to this client
    }

    /**
     * Serialises the current game state and sends the status to the client.
     * @param {Scene} scene - The scene whose state is to be broadcast.
     */
    sendGameState(scene) {
        const delta = this.lastState !== 0 ? Date.now() - this.snapDelta : this.snapDelta;

        if (delta >= this.snapDelta) {
            this.networkWriter.begin();

            for (const entity of scene.nameMap.values()) {
                this.networkWriter.serialiseEntity(entity);
            }

            if (this.networkWriter.end()) {
                this.connection.send(this.networkWriter.jsonData);
                this.lastState = Date.now();
            }
        }
    }

    /**
     * Invokes a remote procedure call on the client machine.
     * @param {String} name - Name of the remote procedure call to be invoked.
     * @param {Object} args - Arguments for the remote procedure call.
     */
    callRpc(name, args) {
        this.connection.send(this.networkWriter.serialiseRpc(name, args));
    }
}

module.exports = Client;
