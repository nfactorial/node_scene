'use strict';

var chai = require('chai');
var expect = chai.expect;

var Vec3 = require('../../lib/vec3');
var RigidBody = require('../../lib/rigid_body');

/**
 * Verify the RigidBody class behaves as expected.
 */
describe('rigid_body', () => {
    it('Should be empty when constructed', () => {
        const body = new RigidBody();

        expect(body.type).to.equal(RigidBody.BodyType.KINEMATIC);
        expect(body.body).to.be.null;
        expect(body.mass).to.equal(0);
        expect(body.restitution).to.equal(1);
        expect(body.linearVelocity.x).to.equal(0);
        expect(body.linearVelocity.y).to.equal(0);
        expect(body.linearVelocity.z).to.equal(0);
        expect(body.angularVelocity.x).to.equal(0);
        expect(body.angularVelocity.y).to.equal(0);
        expect(body.angularVelocity.z).to.equal(0);
    });

    it('Should respond correctly to isStatic', () => {
        const body = new RigidBody();

        body.type = RigidBody.BodyType.STATIC;
        expect(body.isStatic()).to.be.true;

        body.type = RigidBody.BodyType.KINEMATIC;
        expect(body.isStatic()).to.be.false;

        body.type = RigidBody.BodyType.DYNAMIC;
        expect(body.isStatic()).to.be.false;
    });

    it('Should respond correctly to isKinematic', () => {
        const body = new RigidBody();

        body.type = RigidBody.BodyType.STATIC;
        expect(body.isKinematic()).to.be.false;

        body.type = RigidBody.BodyType.KINEMATIC;
        expect(body.isKinematic()).to.be.true;

        body.type = RigidBody.BodyType.DYNAMIC;
        expect(body.isKinematic()).to.be.false;
    });

    it('Should respond correctly to isStaticOrKinematic', () => {
        const body = new RigidBody();

        body.type = RigidBody.BodyType.STATIC;
        expect(body.isStaticOrKinematic()).to.be.true;

        body.type = RigidBody.BodyType.KINEMATIC;
        expect(body.isStaticOrKinematic()).to.be.true;

        body.type = RigidBody.BodyType.DYNAMIC;
        expect(body.isStaticOrKinematic()).to.be.false;
    });

    it('Should allow linear velocity of kinematic objects to be changed', () => {
        const body = new RigidBody();
        const velocity = new Vec3(1, 2, 3);

        body.linearVelocity = velocity;

        expect(body.linearVelocity.x).to.equal(velocity.x);
        expect(body.linearVelocity.y).to.equal(velocity.y);
        expect(body.linearVelocity.z).to.equal(velocity.z);
    });

    it('Should allow angular velocity of kinematic objects to be changed', () => {
        const body = new RigidBody();
        const velocity = new Vec3(4, 5, 6);

        body.angularVelocity = velocity;

        expect(body.angularVelocity.x).to.equal(velocity.x);
        expect(body.angularVelocity.y).to.equal(velocity.y);
        expect(body.angularVelocity.z).to.equal(velocity.z);
    });
});
