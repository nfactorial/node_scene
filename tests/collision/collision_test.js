'use strict';

var chai = require('chai');
var expect = chai.expect;

var Collision = require('../../lib/collision');

/**
 * Verify the Collision class behaves as expected.
 */
describe('collision', () => {
    it('Should fail to create with invalid shape data', () => {
        const data = {
            shape: 'invalid'
        };

        expect(() => {
            Collision.create(data);
        }).to.throw('Collision.create - Invalid shape specified');
    });

    it('Should be empty after construction', () => {
        const collision = new Collision();

        expect(collision.shape).to.be.null;
        expect(collision.shapeType).to.equal(Collision.Shape.INVALID);
    });
});
