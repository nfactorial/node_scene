'use strict';

const Entity = require('../entity');
const Network = require('../network');
const GameSystem = require('@nfactorial/game_state_js').GameSystem;

const ROOT_NODE_NAME = 'root';
const ROOT_NODE_ID = 0;


/**
 * Represents the current game world.
 */
class Scene extends GameSystem {
    constructor() {
        super();

        this.root = new Entity(ROOT_NODE_ID, ROOT_NODE_NAME);
        this.entityId = ROOT_NODE_ID + 1;

        this.nameMap = new Map();
        this.idMap = new Map();

        this.nameMap.set(this.root.name, this.root);
        this.idMap.set(this.root.id, this.root);
    }

    /**
     * Called each frame, allows all enabled entities to perform any necessary per-frame calculations.
     * @param {UpdateArgs} updateArgs
     */
    onUpdate(updateArgs) {
        for (const entity of this.nameMap.values()) {
            if (entity.enabled) {
                entity.onUpdate(updateArgs);
            }
        }
    }

    /**
     * Retrives the entity associated with the specified name.
     * @param {String} name - Name of the entity to be retrieved.
     * @returns {Entity} The entity associated with the name or undefined if one could not be found.
     */
    findByName(name) {
        return this.nameMap.get(name);
    }

    /**
     * Retrives the entity associated with the specified id.
     * @param {Number} id - Identifier of the entity to be retrieved.
     * @returns {Entity} The entity associated with the id or undefined if one could not be found.
     */
    findById(id) {
        return this.idMap.get(id);
    }

    /**
     * Creates a new entity within the scene graph.
     * @param {String} name - Name to be associated with the entity (must be unique within the scene).
     * @param {Network.Role} networkRole - The entities responsibilities to the network.
     * @returns {Entity} The newly created entity, if it could not be created this method return undefined.
     */
    createEntity(name, networkRole) {
        if (name && !this.nameMap.has(name)) {
            const entity = new Entity(this.entityId, name, this);

            entity.networkRole = networkRole || Network.Role.None;

            this.entityId++;

            this.nameMap.set(entity.name, entity);
            this.idMap.set(entity.id, entity);

            return entity;
        }

        return undefined;
    }

    /**
     * Removes a specified entity from the scene.
     * @param {Entity} entity - The entity to be removed from the scene.
     */
    removeEntity(entity) {
        if (entity) {
            if (entity.scene !== this) {
                throw new Error('removeEntity - Entity does not belong to this scene.');
            }

            if (this.nameMap.has(entity.name)) {
                this.nameMap.delete(entity.name);
            }

            if (this.idMap.has(entity.id)) {
                this.idMap.delete(entity.id);
            }

            entity.scene = null;
        }
    }

    /**
     * Performs serialisation of the scene over the network.
     * @param {Serialiser} serialiser - The serialiser to use for all entities.
     */
    networkSerialise(serialiser) {
        for (const entity of this.nameMap.values) {
            serialiser.serialiseEntity(entity);
        }
    }
}


module.exports = Scene;

/*
game {
    scene:
    networkservice
    
    createSolider() {
        networkService.callMulticastRpc('CREATE_SOLDIER', id: entityId, { position, orientation });
    }
}

PLAYER_JOINS_GAME   -
    findSpawnLocation   -
    for (const teamMember in team) {
        networkService.callMulticastRpc('CREATE_SOLDIER', id: entityId, {position, orientation}));
    }

PLAYER_LEAVES_GAME  -
    for (const teamMember in team) {
        networkService.callMulticastRpc('DELETE_SOLDIER', id: entityId, {position, orientation}));
    }
*/
