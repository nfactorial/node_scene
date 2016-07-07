'use strict';

/**
 * Maintains a collection of prefab definitions for use within a scene.
 * A prefab is a description of an entity that may be instantiated within the scene.
 */
class PrefabRegistry {
    constructor() {
        this.prefabMap = new Map();
    }

    /**
     * Retrieves the prefab definition associated with the specified name.
     * @param {String} name - Name of the prefab definition to be retrieved.
     * @returns {Object} Prefab definition associated with the supplied name or undefined if one could not be found.
     */
    getPrefab(name) {
        return this.prefabMap.get(name);
    }

    /**
     * Registers a collection of prefab definitions.
     * @param {Array} data - Array of prefab definitions to be registered.
     */
    register(data) {
        for (const item of data) {
            if (item.name) {
                this.prefabMap.set(item.name, item);
            }
        }
    }
}

module.exports = PrefabRegistry;
