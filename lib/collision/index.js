'use strict';

const Ammo = require('@nfactorial/ammo_node');

var ammoVec = new Ammo.btVector3();

/**
 * Object that represents a collidable object in the scene.
 */
class Collision {
    constructor() {
        this.shape = null;
        this.shapeType = Collision.Shape.INVALID;
    }

    /**
     * Creates a collision object in the shape of a box.
     * @param {Vec3} halfExtents - Half the length along each axis for the box.
     */
    createBox(halfExtents) {
        ammoVec.setValue(halfExtents.x, halfExtents.y, halfExtents.z);

        this.shape = new Ammo.btBoxShape(ammoVec);
        this.shapeType = Collision.Shape.BOX;
    }

    /**
     * Creates a collision object in the shape of a sphere.
     * @param {number} radius - The radius of the sphere.
     */
    createSphere(radius) {
        this.shape = new Ammo.btSphereShape(radius);
        this.shapeType = Collision.Shape.SPHERE;
    }

    /**
     * Creates a collision object in the shape of a cylinder.
     * @param {Vec3} halfExtents -
     */
    createCylinder(halfExtents) {
        ammoVec.setValue(halfExtents.x, halfExtents.y, halfExtents.z);

        this.shape = new Ammo.btCylinderShape(ammoVec);
        this.shapeType = Collision.Shape.CYLINDER;
    }

    /**
     * Creates a collision object in the shape of a cone.
     * @param {number} radius - Radius of the cone
     * @param {number} length - Length of the cone.
     */
    createCone(radius, length) {
        this.shape = new Ammo.btConeShape(radius, length);
        this.shapeType = Collision.Shape.CONE;
    }

    /**
     * Static method that creates a collision object based on a description.
     * @param {Object} data - Description of the collision object to be created.
     * @param {String} data.shape - The shape of the collision object to be created.
     * @returns {*}
     */
    static create(data) {
        var collision = null;
        if (data) {
            switch (data.shape) {
                case 'box':
                    collision = new Collision();
                    collision.createBox(halfExtents);
                    break;

                case 'sphere':
                    collision = new Collision();
                    collision.createSphere(halfExtents);
                    break;

                case 'cylinder':
                    collision = new Collision();
                    collision.createCylinder(halfExtents);
                    break;

                case 'cone':
                    collision = new Collision();
                    collision.createCylinder(halfExtents);
                    break;

                default:
                    throw new Error('Collision.create - Invalid shape specified (' + data.shape + ').');
            }
        }

        return collision;
    }
}

Collision.Shape = {
    INVALID: 0,
    BOX: 1,
    SPHERE: 2,
    CYLINDER: 3,
    CONE: 4
};

module.exports = Collision;
