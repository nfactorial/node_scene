'use strict';

const NetworkWriter = require('./network_writer.js');

/**
 * Manages the state of a single client within the game world.
 */
class Client {
    constructor(connection, clientId) {
        if (!connection) {
            throw new Error('Client - constructor invoked without a valid connection object.');
        }

        this.id = clientId;
        this.connection = connection;
        this.networkWriter = new NetworkWriter();
    }

    /**
     * Serialises the current game state and sends the status to the client.
     * @param {Scene} scene - The scene whose state is to be broadcast.
     */
    sendGameState(scene) {
        this.networkWriter.begin();

        for (const entity of scene.nameMap.values()) {
            this.networkWriter.serialiseEntity(entity);
        }

        this.networkWriter.end();

        this.connection.send(this.networkWriter.jsonData);
    }

    /**
     * Invokes a remote procedure call on the client machine.
     * @param {String} name - Name of the remote procedure call to be invoked.
     * @param {Object} args - Arguments for the remote procedure call.
     */
    callRpc(name, args) {
        this.networkWriter.addRpc(name, args);
    }
}

module.exports = Client;
