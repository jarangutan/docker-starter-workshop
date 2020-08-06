const Keyboard = require('../models/keyboardModel');

exports.index = function (req, res) {
  Keyboard.get(function (err, keyboard) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Sweet keyboards successfully retrieved!",
      data: keyboard
    });
  });
};

exports.new = function (req, res) {
  const keyboard = new Keyboard();
  keyboard.name = req.body.name ? req.body.name : keyboard.name;
  keyboard.style = req.body.style;
  keyboard.switch = req.body.switch;

  keyboard.save(function (err) {
    if (err)
      res.json(err);

    res.json({
      message: 'New keyboard created!',
      data: keyboard
    });
  });
};


exports.view = function (req, res) {
  Keyboard.findById(req.params.keyboard_id, function (err, keyboard) {
    if (err)
      res.send(err);
    res.json({
      message: 'Keyboard details coming up..',
      data: keyboard
    });
  });
};

exports.update = function (req, res) {

  Keyboard.findById(req.params.keyboard_id, function (err, keyboard) {
    if (err)
      res.send(err);

    keyboard.name = req.body.name ? req.body.name : keyboard.name;
    keyboard.style = req.body.style;
    keyboard.switch = req.body.switch;

    // save the keyboard and check for errors
    keyboard.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Keyboard entry updated',
        data: keyboard
      });
    });
  });
};

exports.delete = function (req, res) {
  Keyboard.remove({
    _id: req.params.keyboard_id
  }, function (err, keyboard) {
    if (err)
      res.send(err);

    res.json({
      status: "success",
      message: 'Keyboard entry deleted'
    });
  });
};