'use strict';

/**
 * Base class for all script components.
 */
class Script {

    /**
     * Prepares the script object for use by the system.
     * @param {Entity} entity - The entity which the script belongs to.
     */
    constructor(entity) {
        this.entity = entity;
    }
}

module.exports = Script;
