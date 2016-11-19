var schema = new Schema({

    eventType: {
        type: [String]
    },
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
   

    people: {
        type: String,
        enum: ["20 to 50", "50 to 100", "100 to 300", "300 to 500", "500 to 700"]
    },
    comment: {
        type: String,
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
module.exports = mongoose.model('Latitude', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getAll: function (data, callback) {
        Latitude.find({}).sort({
            createdAt: -1
        }).exec(function (err, results) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (results) {
                callback(null, results);
            } else {
                callback(null, "Invalid data");
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);