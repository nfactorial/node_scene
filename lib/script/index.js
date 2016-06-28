'use strict';

const Serialisable = require('../serialisable');

/**
 * Base class for all script components.
 */
class Script extends Serialisable {

    /**
     * Prepares the script object for use by the system.
     * @param {Entity} entity - The entity which the script belongs to.
     */
    constructor(entity) {
        super();

        this.entity = entity;
    }
}

module.exports = Script;
