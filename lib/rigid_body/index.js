'use strict';

const Ammo = require('@nfactorial/ammo_node');
const Vec3 = require('../vec3');

var ammoTransform = new Ammo.btTransform();
var ammoVec1 = new Ammo.btVector3();
var ammoVec2 = new Ammo.btVector3();
var ammoQuat = new Ammo.btQuaternion();
var ammoOrigin = new Ammo.btVector3(0, 0, 0);

/**
 * Provides API support for a RigidBody that maps to Ammo.js.
 * This code is based on the rigid-body implementation found in playcanvas
 * https://github.com/playcanvas/engine/blob/master/src/framework/components/rigid-body/component.js
 */
class RigidBody {
    constructor(entity) {
        this.entity = entity;
        this.type = RigidBody.BodyType.KINEMATIC;
        this.body = null;
        this.mass = 0;
        this.restitution = 1;
        this.friction = 0;
        this.linearDamping = 0;
        this.angularDamping = 0;
        this._displacement = new Vec3(0, 0, 0);
        this._linearVelocity = new Vec3(0, 0, 0);
        this._angularVelocity = new Vec3(0, 0, 0);
        this.linearFactor = new Vec3(0, 0, 0);
        this.angularFactor = new Vec3(0, 0, 0);
    }

    createBody() {
        var shape;

        if (this.entity && this.entity.collision) {
            shape = entity.collision.shape;
            
            if (entity.trigger) {
                entity.trigger.destroy();
                entity.trigger = null;
            }
        }

        if (shape) {
            if (this.body) {
                this.system.removeBody(this.body);
                Ammo.destroy(this.body);
            }

            let isStaticOrKinematic = this.isStaticOrKinematic();
            var mass = isStaticOrKinematic ? 0 : this.mass;

            var localInertia = new Ammo.btVector3(0, 0, 0);
            if (!isStaticOrKinematic) {
                shape.calculateLocalInertia(mass, localInertia);
            }

            var pos = entity.getPosition();
            var rot = entity.getRotation();
            ammoQuat.setValue(rot.x, rot.y, rot.z, rot.w);

            var startTransform = new Ammo.btTransform();
            startTransform.setIdentity();
            startTransform.getOrigin().setValue(pos.x, pos.y, pos.z);
            startTransform.setRotation(ammoQuat);

            var motionState = new Ammo.btDefaultMotionState(startTransform);
            var bodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);

            var body = new Ammo.btRigidBody(bodyInfo);

            body.setRestitution(this.restitution);
            body.setFriction(this.friction);
            body.setDamping(this.linearDamping, this.angularDamping);

            var v = this.linearFactor;
            ammoVec1.setValue(v.x, v.y, v.z);
            body.setLinearFactor(ammoVec1);

            v = this.angularFactor;
            ammoVec1.setValue(v.x, v.y, v.z);
            body.setAngularFactor(ammoVec1);

            if (this.isKinematic()) {
                body.setCollisionFlags(body.getCollisionFlags() | RigidBody.BodyFlag.KINEMATIC_OBJECT);
                body.setActivationState(RigidBody.BodyState.DISABLE_DEACTIVATION);
            }

            this.body = body;

            if (this.enabled && this.entity.enabled) {
                this.enableSimulation();
            }
        }
    }

    enableSimulation() {
        if (this.entity.collision && this.entity.collision.enabled && !this.data.simulationEnabled) {
            if (this.body) {
                this.system.addBody(body, this.group, this.mask);
            }
        }
    }
    /**
     * Forceably activates the rigid body simulation.
     */
    activate() {
        if (this.body) {
            this.body.activate();
        }
    }

    /**
     * Determines whether or not the rigid-body is currently active.
     * @returns {null|*}
     */
    isActive() {
        return (this.body && this.body.isActive());
    }

    /**
     * Determines whether or not the rigid-body is of type STATIC.
     * @returns {boolean} True if the rigid body is static otherwise false.
     */
    isStatic() {
        return (this.type === RigidBody.BodyType.STATIC);
    }

    /**
     * Determines whether or not the rigid-body is of type STATIC or KINEMATIC.
     * @returns {boolean} True if the rigid body is static or kinematic otherwise false.
     */
    isStaticOrKinematic() {
        return (this.type === RigidBody.BodyType.STATIC || this.type === RigidBody.BodyType.KINEMATIC);
    }

    /**
     * Determines whether or not the rigid-body is of type KINEMATIC.
     * @returns {boolean} True if the rigid body is kinematic otherwise false.
     */
    isKinematic() {
        return (this.type === RigidBody.BodyType.KINEMATIC);
    }

    /**
     * Retrieves the current linear velocity of the rigid body component.
     * @returns {Vec3} The linear velocity associated with the rigid body component.
     */
    get linearVelocity() {
        if (!this.isKinematic()) {
            if (this.body) {
                var vel = this.body.getLinearVelocity();
                this._linearVelocity.set(vel.x(), vel.y(), vel.z());
            }
        }

        return this._linearVelocity;
    }

    /**
     * Sets the linear velocity of the rigid-body component.
     * @param {Vec3} velocity - The linear velocity of the rigid-body.
     */
    set linearVelocity(velocity) {
        this.activate();

        if (!this.isKinematic()) {
            if (this.body) {
                ammoVec1.setValue(velocity.x, velocity.y, velocity.z);
                this.body.setLinearVelocity(ammoVec1);
            }
        } else {
            this._linearVelocity.copy(velocity);
        }
    }

    /**
     * Retrieves the angular velocity of the rigid-body.
     * @returns {Vec3} The angular velocity of the rigid-body.
     */
    get angularVelocity() {
        if (!this.isKinematic()) {
            if (this.body) {
                var vel = this.body.getAngularVelocity();
                this._angularVelocity.set(vel.x(), vel.y(), vel.z());
            }
        }

        return this._angularVelocity;
    }

    /**
     * Sets the current angular velocity of the rigid-body.
     * @param {Vec3} velocity - The angular velocity to be set.
     */
    set angularVelocity(velocity) {
        this.activate();
        if (!this.isKinematic()) {
            if (this.body) {
                ammoVec1.setValue(velocity.x, velocity.y, velocity.z);
                this.body.setAngularVelocity(ammoVec1);
            }
        } else {
            this._angularVelocity.copy(velocity);
        }
    }
}

/**
 * Enumeration that specifies the type of body dynamics supported by the RigidBody class.
 * @type {{STATIC: string, DYNAMIC: string, KINEMATIC: string}}
 */
RigidBody.BodyType = {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
    KINEMATIC: 'kinematic'
};

RigidBody.BodyMask = {
    NONE: 0,
    ALL: 65535,
    STATIC: 2,
    NOT_STATIC: 65535 ^ 2,
    NOT_STATIC_KINEMATIC: 65535 ^ (2 | 4)
};

RigidBody.BodyFlag = {
    STATIC_OBJECT: 1,
    KINEMATIC_OBJECT: 2,
    NORESPONSE_OBJECT: 4
};

RigidBody.BodyState = {
    ACTIVE_TAG: 1,
    ISLAND_SLEEPING: 2,
    WANTS_DEACTIVATION: 3,
    DISABLE_DEACTIVATION: 4,
    DISABLE_SIMULATION: 5
};

module.exports = RigidBody;
