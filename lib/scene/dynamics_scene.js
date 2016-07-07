'use strict';

const Ammo = require('@nfactorial/ammo_node');

const EARTH_GRAVITY = new Ammo.btVector3(0, -9.8, 0);
const ammoVec = new Ammo.btVector3(0, 0, 0);

/**
 * Wrapper around the Ammo dynamics scene representing the current world.
 */
class DynamicScene {
    constructor() {
        this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
        this.overlappingPairCache = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
            this.dispatcher,
            this.overlappingPairCache,
            this.solver,
            this.collisionConfiguration
        );

        this.dynamicsWorld.setGravity(EARTH_GRAVITY);
    }

    /**
     * Steps the dynamics scene using the supplied information.
     * @param {UpdateArgs} updateArgs
     */
    onUpdate(updateArgs) {
        // Args: timeStep, maximum number of sub-steps.
        this.dynamicsWorld.stepSimulation(updateArgs.deltaTime, 2);
    }

    /**
     * Sets the global gravity force applied to the entire dynamics scene.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setGravity(x, y, z) {
        ammoVec.x = x;
        ammoVec.y = y;
        ammoVec.z = z;

        this.dynamicsWorld.setGravity(ammoVec);
    }
}

module.exports = DynamicScene;
