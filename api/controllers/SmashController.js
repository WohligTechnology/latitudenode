module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getAll: function(req, res) {
    if (req.body) {
      Smash.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  save: function(req, res) {
      if(req.body) {
        req.body.eventDate = moment(req.body.eventDate).toDate();
req.model.saveData(req.body, res.callback);
      }
      else if (req.allParams()) {
req.model.saveData(req.allParams(), res.callback);
      }
        
    },
};
module.exports = _.assign(module.exports, controller);