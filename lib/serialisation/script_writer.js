'use strict';

const writeParam = require('./param_writer.js');

/**
 * Class used to write entity script data to a buffer for transmission across the network.
 */
class ScriptWriter {
    constructor() {
        this.script = null;
        this.buffer = null;
    }

    /**
     * Serialises the parameters associated with a script object.
     * @param {String} name - Name associated with the script being serialised.
     * @param {Script} script - The script to be serialised.
     * @returns {boolean} True if the serialised script contains data to be transmitted otherwise false.
     */
    processScript(name, script) {
        this.buffer = {
            name: name,
            data: []
        };

        this.script = script;
        script.serialise(this);
        this.script = null;

        return this.buffer.data.length > 0;
    }

    /**
     * Serialises the specified parameter into the network buffer.
     * @param {ParameterBase} parameter - The parameter to be serialised.
     */
    param(parameter) {
        this.buffer.data.push(writeParam(this.script, parameter));
    }
}

module.exports = ScriptWriter;
