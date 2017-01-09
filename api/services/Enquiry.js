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
module.exports = mongoose.model('Enquiry', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getAll: function (data, callback) {
    Enquiry.find({}).sort( { createdAt: -1 } ).exec(function (err, results) {
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

    saveEnquiry: function (data, callback) {
    var enquirydata = data;
    console.log(data.myCart);
   

    enquirydata = this(enquirydata);
    enquirydata.save(function (err, respo) {
      if (err) {
        callback(err, null);
      } else {
        console.log("respo", respo);

    

            var emailData = {};
            emailData.email = "pratik.gawand@wohlig.com";
            emailData.cc =  ['pratik.gawand@wohlig.com', '"PG" <pratikg17@gmail.com>' ,'"" <pratik.patel@wohlig.com>'];
            // emailData.cc =  ['avanti.atre@smaaash.in', '"" <mukta.fernandes@smaaash.in>' ,'"" <aadil@ting.in>','"" <rajiv@tingmail.in>','"" <vamsi@tingmail.in>','"" <arjun.garewal@smaaash.in>','"" <nilesh.jadhav@smaaash.in>','"" <bhupender.singh@smaaash.in>','"" <vipin@tingmail.in>'];

            

            emailData.content = data;
        
            emailData.filename = "emailletter.ejs";
             emailData.subject = "Latitude Enquiry";
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
      
  },
};
module.exports = _.assign(module.exports, exports, model);
