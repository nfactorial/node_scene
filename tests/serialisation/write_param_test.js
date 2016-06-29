'use strict';

var chai = require('chai');
var expect = chai.expect;

const Vec3 = require('../../lib/vec3');
const Parameter = require('../../lib/parameter');
const writeParam = require('../../lib/serialization/param_writer');

/**
 * Verify the Entity class behaves as expected.
 */
describe('serialization/write_param', () => {
    const INVALID_PARAMETER_TYPE = 'INVALID_TYPE';
    const PARAMETER_NAME = 'testParameter';

    it('Should throw if no object is supplied', () => {
        expect(function () {
            writeParam(null, {
                name: PARAMETER_NAME,
                type: Parameter.Types.SCALAR
            });
        }).to.throw('writeParam.obj - Invalid object was specified for writing.');

        expect(function () {
            writeParam(undefined, {
                name: PARAMETER_NAME,
                type: Parameter.Types.SCALAR
            });
        }).to.throw('writeParam.obj - Invalid object was specified for writing.');
    });

    it('Should throw if no parameter is supplied', () => {
        const testObject = {};

        expect(function () {
            writeParam(testObject, null);
        }).to.throw('writeParam.param - Invalid parameter specified for writing.');
        expect(function () {
            writeParam(testObject, undefined);
        }).to.throw('writeParam.param - Invalid parameter specified for writing.');
    });

    it('Should throw if an unknown parameter type is supplied', () => {
        const testObject = {};

        expect( function () {
            writeParam(testObject, {
                name: PARAMETER_NAME,
                type: INVALID_PARAMETER_TYPE
            });
        }).to.throw('writeParam - Unknown type encountered during serialization.');
    });

    it('Should correctly write scalar parameters', () => {
        const TEST_VALUE = 5;

        const testObject = {testParameter: TEST_VALUE};

        const result = writeParam(testObject, {
            name: PARAMETER_NAME,
            type: Parameter.Types.SCALAR
        });

        expect(result).to.be.valid;
        expect(result.name).to.equal(PARAMETER_NAME);
        expect(result.type).to.equal(Parameter.Types.SCALAR);
        expect(result.value).to.equal(TEST_VALUE);
        expect(result.x).to.be.undefined;
        expect(result.y).to.be.undefined;
        expect(result.z).to.be.undefined;
    });

    it('Should correctly write boolean parameters', () => {
        const TEST_VALUE = true;

        const testObject = {testParameter: TEST_VALUE};

        const result = writeParam(testObject, {
            name: PARAMETER_NAME,
            type: Parameter.Types.BOOLEAN
        });

        expect(result).to.be.valid;
        expect(result.name).to.equal(PARAMETER_NAME);
        expect(result.type).to.equal(Parameter.Types.BOOLEAN);
        expect(result.value).to.equal(TEST_VALUE);
        expect(result.x).to.be.undefined;
        expect(result.y).to.be.undefined;
        expect(result.z).to.be.undefined;
    });

    it('Should correctly write string parameters', () => {
        const TEST_VALUE = 'An unit test string';

        const testObject = {testParameter: TEST_VALUE};

        const result = writeParam(testObject, {
            name: PARAMETER_NAME,
            type: Parameter.Types.STRING
        });

        expect(result).to.be.valid;
        expect(result.name).to.equal(PARAMETER_NAME);
        expect(result.type).to.equal(Parameter.Types.STRING);
        expect(result.value).to.equal(TEST_VALUE);
        expect(result.x).to.be.undefined;
        expect(result.y).to.be.undefined;
        expect(result.z).to.be.undefined;
    });

    it('Should correctly write vec3 parameters', () => {
        const TEST_VALUE = new Vec3(1, 2, 3);

        const testObject = {testParameter: TEST_VALUE};

        const result = writeParam(testObject, {
            name: PARAMETER_NAME,
            type: Parameter.Types.VECTOR3
        });

        expect(result).to.be.valid;
        expect(result.name).to.equal(PARAMETER_NAME);
        expect(result.type).to.equal(Parameter.Types.VECTOR3);
        expect(result.value).to.be.undefined;
        expect(result.x).to.equal(TEST_VALUE.x);
        expect(result.y).to.equal(TEST_VALUE.y);
        expect(result.z).to.equal(TEST_VALUE.z);
    });
});
