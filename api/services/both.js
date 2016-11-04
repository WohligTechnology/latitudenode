var schema = new Schema({


    name: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    eventdate: {
        type: Date,
        default: ""
    },
    time: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Pending", "Spoke With Client", "Commented"]
    },
    note: String,
    time2: {
        type: Date,
        default: Date.now
    }
});


schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('1899', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);