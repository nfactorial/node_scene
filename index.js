/**
 * This library provides management of a game scene intended to be run on the server.
 *
 * Performance is not optimized, data size will be high and verbose. Once everything
 * is working this will be looked at.
 *
 * To use the library, install it as a dependency in your node module using:
 *
 * npm install --save @nfactorial/node_scene
 *
 * Once installed, require the module in your own library and instantiate an instance of
 * the GameServer object:
 *
 * var NodeScene = require('@nfactorial/node_scene');
 *
 * See readme.md for further details on using this module.
 */

module.exports.Vec3 = require('./lib/vec3');
module.exports.Scene = require('./lib/scene');
module.exports.Entity = require('./lib/entity');
module.exports.Network = require('./lib/network');
module.exports.Parameter = require('./lib/parameter');
module.exports.Serializable = require('./lib/serializable');
module.exports.Serialization = require('./lib/serialization');
module.exports.PrefabRegistry = require('./lib/prefab_registry');

module.exports.Script = require('./lib/script');
module.exports.ScriptRegistry = require('./lib/script/registry.js');
