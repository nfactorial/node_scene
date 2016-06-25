'use strict';

var chai = require('chai');
var expect = chai.expect;
var Scene = require('../../lib/scene');

/**
 * Verify the Scene class behaves as expected.
 */
describe('scene', () => {
    const TEST_ENTITY_NAME = 'TestEntity';
    const INVALID_ENTITY_NAME = 'InvalidEntity';

    it('Should contain a root node when constructed', () => {
        const scene = new Scene();

        expect(scene.root).not.to.be.null;
        expect(scene.root).not.to.be.undefined;

        expect(scene.findById(scene.root.id)).to.equal(scene.root);
        expect(scene.findByName(scene.root.name)).to.equal(scene.root);

        expect(scene.nameMap.size).to.equal(1);
        expect(scene.idMap.size).to.equal(1);
    });

    it('Should create entities when requested', () => {
        const scene = new Scene();

        const entity = scene.createEntity(TEST_ENTITY_NAME);

        expect(entity).not.to.be.undefined;

        expect(scene.findById(entity.id)).to.equal(entity);
        expect(scene.findByName(entity.name)).to.equal(entity);

        expect(scene.findById(scene.root.id)).to.equal(scene.root);
        expect(scene.findByName(scene.root.name)).to.equal(scene.root);

        expect(scene.findByName(INVALID_ENTITY_NAME)).to.be.undefined;
    });

    it('Should fail to create entities with a name collision', () => {
        const scene = new Scene();

        expect(scene.createEntity(TEST_ENTITY_NAME)).not.to.be.undefined;
        expect(scene.createEntity(TEST_ENTITY_NAME)).to.be.undefined;
    });

    it('Should be able to find entities by name', () => {
        const scene = new Scene();

        const name1 = TEST_ENTITY_NAME;
        const name2 = TEST_ENTITY_NAME + 1;
        const name3 = TEST_ENTITY_NAME + 2;
        const name4 = TEST_ENTITY_NAME + 3;

        const entity1 = scene.createEntity(name1);
        const entity2 = scene.createEntity(name2);
        const entity3 = scene.createEntity(name3);
        const entity4 = scene.createEntity(name4);

        expect(scene.findByName(name1)).to.equal(entity1);
        expect(scene.findByName(name2)).to.equal(entity2);
        expect(scene.findByName(name3)).to.equal(entity3);
        expect(scene.findByName(name4)).to.equal(entity4);
    });

    it('Should be able to find entities by id', () => {
        const scene = new Scene();

        const name1 = TEST_ENTITY_NAME;
        const name2 = TEST_ENTITY_NAME + 1;
        const name3 = TEST_ENTITY_NAME + 2;
        const name4 = TEST_ENTITY_NAME + 3;

        const entity1 = scene.createEntity(name1);
        const entity2 = scene.createEntity(name2);
        const entity3 = scene.createEntity(name3);
        const entity4 = scene.createEntity(name4);

        expect(scene.findById(entity1.id)).to.equal(entity1);
        expect(scene.findById(entity2.id)).to.equal(entity2);
        expect(scene.findById(entity3.id)).to.equal(entity3);
        expect(scene.findById(entity4.id)).to.equal(entity4);
    });
});
