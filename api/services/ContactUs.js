var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  comment: {
    type: String,
    default: ""
  },
  time: {
    type: Date,
    default: Date.now
  },
  status:{
    type:String,
    enum:["Pending","Spoke With Client","Commented"]
  },
  note:String,
  time2:{
    type: Date,
    default: Date.now
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ContactUs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getAll: function (data, callback) {
    ContactUs.find({}).sort( { createdAt: -1 } ).exec(function (err, results) {
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
