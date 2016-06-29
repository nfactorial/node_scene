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
     * Serializes the parameters associated with a script object.
     * @param {String} name - Name associated with the script being serialized.
     * @param {Script} script - The script to be serialized.
     * @returns {boolean} True if the serialized script contains data to be transmitted otherwise false.
     */
    processScript(name, script) {
        this.buffer = {
            name: name,
            param: []
        };

        this.script = script;
        script.serialize(this);
        this.script = null;

        return this.buffer.data.length > 0;
    }

    /**
     * Serializes the specified parameter into the network buffer.
     * @param {ParameterBase} parameter - The parameter to be serialized.
     */
    param(parameter) {
        this.buffer.param.push(writeParam(this.script, parameter));
    }
}

module.exports = ScriptWriter;
