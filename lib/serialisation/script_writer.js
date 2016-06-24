'use strict';

const writeParam = require('./param_writer.js');

/**
 * Class used to write entity script data to a buffer for transmission across the network.
 */
class ScriptWriter {
    constructor() {
        this.buffer = null;
    }

    /**
     * Serialises the specified parameter into the network buffer.
     * @param {ParameterBase} parameter - The parameter to be serialised.
     */
    param(parameter) {
        this.buffer.data.push(writeParam(parameter));
    }
}

module.exports = ScriptWriter;
