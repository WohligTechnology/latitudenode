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
module.exports = mongoose.model('ContactUs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getAll: function (data, callback) {
    ContactUs.find({}).sort({
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

  saveContactUs: function (data, callback) {
    var contactdata = data;
    console.log(data.myCart);


    contactdata = this(contactdata);
    contactdata.save(function (err, respo) {
      if (err) {
        callback(err, null);
      } else {
        console.log("respo", respo);



        var emailData = {};
        //emailData.email = "pratik.gawand@wohlig.com";
        //  emailData.cc = ['pratik.gawand@wohlig.com', '"PG" <pratikg17@gmail.com>', '"" <pratik.patel@wohlig.com>'];

        emailData.email = ['karan.dhingra@smaaash.in', '"" <hussain.jagmag@1899latitudebanquets.com>', '"" <aadil@ting.in>', '"" <rajiv@tingmail.in>', '"" <vamsi@tingmail.in>', '"" <arjun.garewal@smaaash.in>', '"" <nilesh.jadhav@smaaash.in>', '"" <bhupender.singh@smaaash.in>', '"" <vipin@tingmail.in>'];

        emailData.content = data;

        emailData.filename = "emailletterContactUs.ejs";
        emailData.subject = "Latitude Contact Us";
        Config.email(emailData, function (err, emailRespo) {
          if (err) {
            console.log("EROR in EMAIL CONFIG", err);
            callback(err, null);
          } else {
            console.log(emailRespo);

            callback(null, respo);
          }

        });

      }
    });

  }
};
module.exports = _.assign(module.exports, exports, model);