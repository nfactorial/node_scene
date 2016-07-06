'use strict';

var chai = require('chai');
var expect = chai.expect;
var Entity = require('../../lib/entity');
var Network = require('../../lib/network');

/**
 * Verify the Entity class behaves as expected.
 */
describe('entity', () => {
    const TEST_ENTITY_NAME = 'TestEntity';
    const TEST_ENTITY_ID = 1000;
    const PARENT_ENTITY_ID = 2000;
    const PARENT_ENTITY_NAME = 'ParentEntity';

    it('Should begin life in a default state', () => {
        const entity = new Entity(TEST_ENTITY_ID, TEST_ENTITY_NAME);

        expect(entity.id).to.equal(TEST_ENTITY_ID);
        expect(entity.name).to.equal(TEST_ENTITY_NAME);
        expect(entity.networkRole).to.equal(Network.Role.None);

        expect(entity.children.length).to.equal(0);

        expect(entity.owner).to.be.null;

        expect(entity.parent).to.be.null;
        expect(entity.trigger).to.be.null;
        expect(entity.rigidBody).to.be.null;
        expect(entity.collision).to.be.null;

        // TODO: Verify position etc.
        expect(entity.position.x).to.equal(0);
        expect(entity.position.y).to.equal(0);
        expect(entity.position.z).to.equal(0);
    });

    it('Should not be able to be its own parent', () => {
        const entity = new Entity(TEST_ENTITY_ID, TEST_ENTITY_NAME);

        entity.addChild(entity);

        expect(entity.children.length).to.equal(0);
    });

    it('Should allow its parent to be set', () => {
        const entity = new Entity(TEST_ENTITY_ID, TEST_ENTITY_NAME);
        const parent = new Entity(PARENT_ENTITY_ID, PARENT_ENTITY_NAME);

        expect(entity.parent).to.be.null;
        expect(entity.children.length).to.equal(0);

        expect(parent.children.length).to.equal(0);

        parent.addChild(entity);

        expect(entity.parent).to.equal(parent);
        expect(parent.children.length).to.equal(1);

        parent.removeChild(entity);

        expect(entity.parent).to.be.null;
        expect(parent.children.length).to.equal(0);
    });

    it('Should ignore unknown children', () => {
        const entity = new Entity(TEST_ENTITY_ID, TEST_ENTITY_NAME);
        const entity2 = new Entity(TEST_ENTITY_ID + 1, TEST_ENTITY_NAME + 1);
        const parent = new Entity(PARENT_ENTITY_ID, PARENT_ENTITY_NAME);

        parent.addChild(entity);

        parent.removeChild(entity2);
        expect(entity.parent).to.equal(parent);
        expect(parent.children.length).to.equal(1);

        parent.removeChild(null);
        expect(entity.parent).to.equal(parent);
        expect(parent.children.length).to.equal(1);

        parent.removeChild(undefined);
        expect(entity.parent).to.equal(parent);
        expect(parent.children.length).to.equal(1);
    })
});
