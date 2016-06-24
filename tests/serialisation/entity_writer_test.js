'use strict';

var chai = require('chai');
var expect = chai.expect;

const Parameter = require('../../lib/parameter');
const EntityWriter = require('../../lib/serialisation/entity_writer.js');

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
            writer.param(5)
        }).to.throw('Unknown type encountered during serialisation.');

        expect(() => {
            writer.param({name: 'Example', type: 'Invalid', value: 0});
        }).to.throw('Unknown type encountered during serialisation.');
    });

    it('Should serialise scalar parameters', () => {
        const paramName = 'example';
        const testParam = Parameter.createScalar(paramName);

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.param(testParam);
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(paramName);
        expect(writer.buffer.data[0].type).to.equal(Parameter.Types.SCALAR);
        expect(writer.buffer.data[0].value).to.equal(0);
    });

    it('Should serialise string parameters', () => {
        const paramName = 'example';
        const testParam = Parameter.createString(paramName);

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.param(testParam);
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(paramName);
        expect(writer.buffer.data[0].type).to.equal(Parameter.Types.STRING);
        expect(writer.buffer.data[0].value).to.equal('');
    });

    it('Should serialise Vec3 parameters', () => {
        const paramName = 'example';
        const testParam = Parameter.createVec3(paramName);

        testParam.set(1, 2, 3);

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        expect(() => {
            writer.param(testParam);
        }).not.to.throw();

        expect(writer.buffer.data.length).to.equal(1);
        expect(writer.buffer.data[0].name).to.equal(paramName);
        expect(writer.buffer.data[0].type).to.equal(Parameter.Types.VECTOR3);
        expect(writer.buffer.data[0].x).to.equal(1);
        expect(writer.buffer.data[0].y).to.equal(2);
        expect(writer.buffer.data[0].z).to.equal(3);
    });

    it('Should serialise multiple parameters', () => {
        const paramName1 = 'example';
        const paramName2 = 'example2';
        const paramName3 = 'example3';

        const testParam1 = Parameter.createScalar(paramName1);
        const testParam2 = Parameter.createString(paramName2);
        const testParam3 = Parameter.createVec3(paramName3);

        const paramValue1 = 10;
        const paramValue2 = 'testing serialiser';

        testParam1.value = paramValue1;
        testParam2.value = paramValue2;
        testParam3.set(5, 6, 7);

        const writer = new EntityWriter();

        writer.buffer = {
            id: 1,
            data: [],
            rpc: []
        };

        writer.param(testParam1);
        writer.param(testParam2);
        writer.param(testParam3);

        expect(writer.buffer.data.length).to.equal(3);

        expect(writer.buffer.data[0].name).to.equal(paramName1);
        expect(writer.buffer.data[1].name).to.equal(paramName2);
        expect(writer.buffer.data[2].name).to.equal(paramName3);

        expect(writer.buffer.data[0].type).to.equal(Parameter.Types.SCALAR);
        expect(writer.buffer.data[1].type).to.equal(Parameter.Types.STRING);
        expect(writer.buffer.data[2].type).to.equal(Parameter.Types.VECTOR3);

        expect(writer.buffer.data[0].value).to.equal(paramValue1);
        expect(writer.buffer.data[1].value).to.equal(paramValue2);
        expect(writer.buffer.data[2].x).to.equal(5);
        expect(writer.buffer.data[2].y).to.equal(6);
        expect(writer.buffer.data[2].z).to.equal(7);
    });
});
