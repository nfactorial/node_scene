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
    })
});
