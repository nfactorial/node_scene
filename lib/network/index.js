'use strict';

/*
 * The 'Role' variable defines the network role of an entity.
 *
 * None - Means there is no role and the entity makes no contribution to the network layer.
 * Local - Means the local machine is considered authority over the entities state.
 * Remote - Means the object is simulated locally, but another machine is considered the authority.
 */
module.exports.Role = {
    None: 'NONE',
    Local: 'LOCAL',
    Remote: 'REMOTE'
};

/**
 * The 'RpcType' variable describes how an RPC call is processed.
 *
 * Client - Means the RPC call is called on the server but executed on the client.
 * Server - Means the RPC call is called on the client but executed on the server.
 * Multicast - Means the RPC call on the server but then executed on the server as well as all clients.
 */
module.exports.RpcType = {
    Client: 'CLIENT',
    Server: 'SERVER',
    Multicast: 'MULTICAST'
};


module.exports.Client = require('./client.js');
module.exports.Service = require('./service.js');
