'use strict';

const GameSystem = require('@nfactorial/game_state_js').GameSystem;

const Client = require('./client.js');

const DEFAULT_CLIENT_ID = 1000;

/**
 * The NetworkService class manages all network communication for a running instance of the game.
 * There may be multiple NetworkService objects if there are multiple sessions running.
 */
class NetworkService extends GameSystem {
    constructor() {
        super();
        
        this.nextClientId = DEFAULT_CLIENT_ID;
        this.clientList = [];
    }

    /**
     * Called by the framework when it is ready for the game system to prepare for
     * processing.
     *
     * @param {InitArgs} initArgs
     */
    onInitialize(initArgs) {
        super.onInitialize(initArgs);
    }

    /**
     * Creates a new client object within the network layer.
     * @param {Connection} connection - The connection used to communicate with the client.
     * @returns {Client} The client object associated with the connection.
     */
    createClient(connection) {
        const newClient = new Client(connection, this.nextClientId++);

        this.clientList.push(newClient);

        return newClient;
    }

    /**
     * Removes a specified client from the network layer.
     * @param {Number} clientId - Identifier associated with the client being removed.
     */
    deleteClient(clientId) {
        for (let loop = 0; loop < this.clientList.length; ++loop) {
            if (this.clientList[loop].id === clientId) {
                this.clientList.splice(loop, 1);
            }
        }

        if (!this.clientList.length) {
            this.nextClientId = DEFAULT_CLIENT_ID;
        }
    }

    /**
     * Calls a remote procedure call on all connected clients.
     * @param {String} name - Name of the remote procedure call to be invoked.
     * @param {Object} args - Arguments associated with the remote procedure call.
     */
    callMulticastRpc(name, args) {
        for (const client of this.clientList) {
            client.callRpc(name, args);
        }
    }
}

module.exports = NetworkService;
