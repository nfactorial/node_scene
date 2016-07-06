'use strict';

const SIZEOF_INT8 = 1;
const SIZEOF_UINT8 = 1;
const SIZEOF_INT16 = 2;
const SIZEOF_UINT16 = 2;
const SIZEOF_INT32 = 4;
const SIZEOF_UINT32 = 4;
const SIZEOF_FLOAT32 = 4;
const SIZEOF_FLOAT64 = 8;

/**
 * Provides methods for writing data into a raw memory buffer.
 */
class BufferWriter {

    /**
     * Prepares the NetworkWriter for use by the title.
     * @param {number} protocolVersion - Version of the data being written.
     */
    constructor() {
        this.buffer = null;
        this.startOffset = 0;
        this.bytesAvailable = 0;
        this.dataLength = 0;
    }

    initialize(buffer, offset, length) {
        this.buffer = buffer;
        this.startOffset = offset;
        this.bytesAvailable = length;
        this.dataLength = 0;
    }

    checksum() {
        if (this.dataLength > SIZEOF_UINT32) {
            this.buffer.writeUInt32BE(
                crc(this.buffer, this.startOffset + SIZEOF_UINT32, this.dataLength - SIZEOF_UINT32),
                this.startOffset,
                true
            );

            return true;
        }

        return false;
    }

    int8(value) {
        if ((this.dataLength + SIZEOF_INT8) <= this.bytesAvailable) {
            this.buffer.writeInt8(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_INT8;
            return true;
        }

        return false;
    }

    uint8(value) {
        if ((this.dataLength + SIZEOF_UINT8) <= this.bytesAvailable) {
            this.buffer.writeUInt8(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_UINT8;
            return true;
        }

        return false;
    }

    int16(value) {
        if ((this.dataLength + SIZEOF_INT16) <= this.bytesAvailable) {
            this.buffer.writeInt16BE(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_INT16;
            return true;
        }

        return false;
    }

    int16(value) {
        if ((this.dataLength + SIZEOF_UINT16) <= this.bytesAvailable) {
            this.buffer.writeUInt16BE(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_UINT16;
            return true;
        }

        return false;
    }

    int32(value) {
        if ((this.dataLength + SIZEOF_INT32) <= this.bytesAvailable) {
            this.buffer.writeInt32BE(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_INT32;
            return true;
        }

        return false;
    }

    uint32(value) {
        if ((this.dataLength + SIZEOF_UINT32) <= this.bytesAvailable) {
            this.buffer.writeUInt32BE(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_UINT32;
            return true;
        }

        return false;
    }

    float32(value) {
        if ((this.dataLength + SIZEOF_FLOAT32) <= this.bytesAvailable) {
            this.buffer.writeFloatBE(value, this.startOffset + this.dataLength, true);
            this.dataLength += SIZEOF_INT32;
            return true;
        }

        return false;
    }

    double(value) {
        if ((this.dataLength + SIZEOF_FLOAT64) <= this.bytesAvailable) {
            this.buffer.writeDoubleBE(value, this.startOffset + this.offset, true);
            this.dataLength += SIZEOF_FLOAT64;
            return true;
        }

        return false;
    }
}

module.exports = BufferWriter;
