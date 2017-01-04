module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getAll: function(req, res) {
    if (req.body) {
      Enquiry.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

   saveEnquiry: function(req, res) {
    if (req.body) {
      Enquiry.saveEnquiry(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
};

module.exports = _.assign(module.exports, controller);
