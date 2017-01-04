module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getAll: function(req, res) {
    if (req.body) {
      ContactUs.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
 saveContactUs: function(req, res) {
    if (req.body) {
      ContactUs.saveContactUs(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  
  
};

module.exports = _.assign(module.exports, controller);
