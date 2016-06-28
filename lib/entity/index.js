'use strict';

const Network = require('../network');
const Parameter = require('../parameter');

/**
 * Represents an object in that exists within the game world.
 */
class Entity {

    /**
     * Prepares a new entity for use by the system.
     * @param {Number} id - Unique identifier to be associated with the entity.
     * @param {String} name - Name to be associated with the entity.
     * @param {Scene=} scene - The scene we are contained within.
     */
    constructor(id, name, scene) {
        this.id = id;
        this.name = name;
        this.scene = scene;
        this.clientId = 0;
        this.networkRole = Network.Role.None;

        this._isEnabled = true;

        this.scripts = new Map();

        this.children = [];

        this.parent = null;
        this.position = Parameter.createVec3('position');
    }

    /**
     * Adds a new child to the child list and updates the parent value of the child node.
     * @param {Entity} entity - The child entity to be added.
     */
    addChild(entity) {
        if (entity && entity !== this) {
            if (entity.parent) {
                entity.parent.removeChild(entity);
            }

            this.children.push(entity);
            entity.parent = this;
        }
    }

    /**
     * Destroys the entity and removes it from the scene.
     */
    destroy() {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        for (const script of this.scripts.values()) {
            script.destroy();
        }

        if (this.scene) {
            this.scene.removeEntity(this);
        }
    }

    /**
     *
     * @param {String} name - Name to be associated with the script instance.
     * @param {Object} component - Script component to be added.
     */
    addScript(name, component) {
        if (!component) {
            throw new Error('Entity.addScript - No script reference was supplied.');
        }

        if (this.scripts.has(name)) {
            throw new Error('Cannot add script, slot is already in use.');
        }

        this.scripts.set(name, component);
    }

    /**
     * Retrieves a named script component associated with the entity.
     * @param {String} name - Name of the script to be retrieved.
     * @returns {Script} The script associated with the name otherwise undefined.
     */
    getScript(name) {
        return this.scripts.get(name);
    }

    /**
     * Removes a child node from this entities child list.
     * @param {Entity} entity - The child entity to be removed.
     */
    removeChild(entity) {
        if (entity && entity.parent === this) {
            const index = this.children.indexOf(entity);
            if (index !== -1) {
                this.children.splice(index, 1);
                entity.parent = null;
            }
        }
    }

    /**
     * Sets the position of the entity in world space.
     * @param {Number} x - Distance along the horizontal axis.
     * @param {Number} y - Distance along the vertical axis.
     * @param {Number} z - Distance along the depth axis.
     */
    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    /**
     * Serialises our entity over the network.
     * @param {EntitySerialiser} serialiser - Serialises to use with our data.
     */
    serialise(serialiser) {
        serialiser.param(this.position);
    }

    /**
     * Called by the framework each frame update when we are enabled.
     * @param {UpdateArgs} updateArgs
     */
    onUpdate(updateArgs) {
        for (const script of this.scripts.values()) {
            script.onUpdate(updateArgs);
        }
    }
    
    /**
     * Retrieves the current enabled status of the entity.
     * @returns {boolean} True if the entity is enabled otherwise false.
     */
    get enabled() {
        return this._isEnabled;
    }

    /**
     * Enables or disables the entity within the scene.
     * @param {boolean} isEnabled - True if the entity is to be enabled otherwise false.
     */
    set enabled(isEnabled) {
        if (isEnabled !== this._isEnabled) {
            this._isEnabled = isEnabled;

            // TODO: Invoke 'initialize' if we weren't previously enabled
        }
    }

    /**
     * Retrieves the current position of the entity in world space.
     * @returns {Vec3} Position of the entity in world space.
     */
    getPosition() {
        return this.position.value;
    }

    /**
     * Sets the position (in local space) of the entity.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setLocalPosition(x, y, z) {
        this.position.set(x, y, z);
    }
}

module.exports = Entity;
