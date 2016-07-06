'use strict';

var table = new Uint32Array(256);

// Pre-generate crc32 polynomial lookup table
// http://wiki.osdev.org/CRC32#Building_the_Lookup_Table
// ... Actually use Alex's because it generates the correct bit order
//     so no need for the reversal function
for(var i = 256; i--;) {
    var tmp = i;

    for(var k = 8; k--;) {
        tmp = tmp & 1 ? 3988292384 ^ tmp >>> 1 : tmp >>> 1;
    }

    table[ i ] = tmp;
}

module.exports = function(data) {
    var crc = -1;

    for (var i =0, l = data.length; i < l; ++i) {
        crc = crc >>> 8 ^ table[crc & 0xFF ^ data[i]];
    }

    return (crc ^ -1) >>>0;
};
