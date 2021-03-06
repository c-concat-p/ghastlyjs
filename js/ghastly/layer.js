/**
 * an object in a state containing entities and config data
 * @class Layer
 */
var Layer = protos.create({
    _protosName: 'layer',

    /**
     * @member {array} entities
     */
    entities: [],

    /**
     * @param {string} name
     * @method Layer.prototype.getEntity
     */
    getEntity: function(name) {
        var len = this.entities.length;
        var i;

        for(i = 0; i < len; i += 1) {
            if (this.entities[i].name == name) {
                return this.entities[i].entity;
            }
        }
    },

    /**
     * @param {Sprite} entity
     * @method Layer.prototype.addEntity
     */
    addEntity: function(entity) {
        dataControl.parseEntity(this, entity);
    },

    /**
     * @param {object} layer
     * @param {Sprite} entity
     * @method Layer.prototype.removeEntity
     */
    removeEntity: function(entity) {
        var len = this.entities.length;
        var i;

        // need to loop to get index... :/
        for (i = 0; i < len; i += 1) {
            if (entity._uid === this.entities[i].entity._uid) {
                this.entities[i].entity.destroy();
                this.entities[i] = null;
                this.entities.splice(i, 1);
                break;
            }
        }
    },

    /**
     * changes an entity's depth
     *
     * @param {Sprite} entity
     * @param {int} newDepth - 0 for back, -1 for front, or anything inbetween
     * @method Layer.prototype.setEntityDepth
     */
    setEntityDepth: function(entity, newDepth) {
        // TODO add '++' and '--' as newDepth parameter options
        var entitiesLen = this.entities.length;
        var entityObject;
        var depth;
        var i;

        for (i = 0; i < entitiesLen; i += 1) {
            if (this.entities[i].entity._uid === entity._uid) {
                entityObject = this.entities[i];
                depth = i;
                break;
            }
        }

        if (newDepth == -1 && depth === this.entities.length -1) {
            return;
        }
        if (newDepth === 0 && depth === 0) {
            return;
        }

        this.entities.splice(depth, 1);

        if (newDepth === -1 || newDepth >= this.entities.length) {
            this.entities.push(entityObject);
        } else {
            this.entities.splice(newDepth, 0, entityObject);
        }
    },

    /**
     * @param {Sprite} entity
     * @method Layer.prototype.getEntity
     */
    getEntityDepth: function(entity) {
        var entitiesLen = this.entities.length;
        var i;

        for (i = 0; i < entitiesLen; i += 1) {
            if (this.entities[i].entity._uid === entity._uid) {
                return i;
            }
        }
    },
});