'use strict';

var chai = require('chai');
var expect = chai.expect;
var EntityWriter = require('../../lib/network/entity_writer.js');

/**
 * Verify the Entity class behaves as expected.
 */
describe('network/entity_writer', () => {
    it('Should be empty when constructed', () => {
        const writer = new EntityWriter();

        expect(writer.buffer).to.be.null;
    });

    it('Should throw when serialising invalid parameters', () => {
        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.serialise(5)
        }).to.throw('Unknown type encountered during serialisation.');

        expect(() => {
            writer.serialise({name: 'Example', type: 'Invalid', value: 0});
        }).to.throw('Unknown type encountered during serialisation.');
    });

    it('Should serialise number parameters', () => {
        const propertyName = 'example';
        const propertyType = 'number';
        const propertyValue = 5;

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.serialise({name: propertyName, type: propertyType, value: propertyValue});
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(propertyName);
        expect(writer.buffer.data[0].type).to.equal(propertyType);
        expect(writer.buffer.data[0].value).to.equal(propertyValue);
    });

    it('Should serialise string parameters', () => {
        const propertyName = 'example';
        const propertyType = 'string';
        const propertyValue = 'test string';

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.serialise({name: propertyName, type: propertyType, value: propertyValue});
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(propertyName);
        expect(writer.buffer.data[0].type).to.equal(propertyType);
        expect(writer.buffer.data[0].value).to.equal(propertyValue);
    });

    it('Should serialise Vec3 parameters', () => {
        const propertyName = 'example';
        const propertyType = 'vec3';

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.serialise({name: propertyName, type: propertyType, x: 1, y: 2, z: 3});
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(propertyName);
        expect(writer.buffer.data[0].type).to.equal(propertyType);
        expect(writer.buffer.data[0].x).to.equal(1);
        expect(writer.buffer.data[0].y).to.equal(2);
        expect(writer.buffer.data[0].z).to.equal(3);
    });

    it('Should serialise multiple parameters', () => {
        const propertyName1 = 'example';
        const propertyName2 = 'example2';
        const propertyName3 = 'example3';

        const propertyType1 = 'number';
        const propertyType2 = 'string';
        const propertyType3 = 'vec3';

        const propertyValue1 = 10;
        const propertyValue2 = 'testing serialiser';

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        writer.serialise({name: propertyName1, type: propertyType1, value: propertyValue1});
        writer.serialise({name: propertyName2, type: propertyType2, value: propertyValue2});
        writer.serialise({name: propertyName3, type: propertyType3, x: 5, y: 6, z: 7});

        expect(writer.buffer.data.length).to.equal(3);

        expect(writer.buffer.data[0].name).to.equal(propertyName1);
        expect(writer.buffer.data[1].name).to.equal(propertyName2);
        expect(writer.buffer.data[2].name).to.equal(propertyName3);

        expect(writer.buffer.data[0].type).to.equal(propertyType1);
        expect(writer.buffer.data[1].type).to.equal(propertyType2);
        expect(writer.buffer.data[2].type).to.equal(propertyType3);

        expect(writer.buffer.data[0].value).to.equal(propertyValue1);
        expect(writer.buffer.data[1].value).to.equal(propertyValue2);
        expect(writer.buffer.data[2].x).to.equal(5);
        expect(writer.buffer.data[2].y).to.equal(6);
        expect(writer.buffer.data[2].z).to.equal(7);
    });
});
