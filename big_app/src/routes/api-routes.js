// Initialize express router
const router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!',
  });
});

// Import contact controller
const keyboardController = require('../controllers/keyboardController');

// Contact routes
router.route('/keyboards')
  .get(keyboardController.index)
  .post(keyboardController.new);

router.route('/keyboards/:keyboard_id')
  .get(keyboardController.view)
  .patch(keyboardController.update)
  .put(keyboardController.update)
  .delete(keyboardController.delete);

// Export API routes
module.exports = router;