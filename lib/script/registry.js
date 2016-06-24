'use strict';

const Factory = require('@nfactorial/factory_node');

const SCRIPT_REGISTRY = new Factory();

module.exports = {
    /**
     * Registers a new script object with the script registry.
     * @param {String} name - Name to be associated with the script.
     * @param {function} ctor - Constructor function for the script being registered.
     */
    register: function (name, ctor) {
        SCRIPT_REGISTRY.register(name, ctor);
    },

    /**
     * Creates an instance of the named script object.
     * @param {String} name - Name of the script to be created.
     * @returns {Script} Instance of the script object associated with the specified name.
     */
    create: function (name) {
        return SCRIPT_REGISTRY.create(name);
    }
};
