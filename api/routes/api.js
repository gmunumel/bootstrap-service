var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource; 
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    })

    return;
  }

  controller.find(req.query, function(err, results) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return;
    } 

    res.json({
      confirmation: 'success',
      results: results
    })
  })
})

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    })

    return;
  }

  controller.findById(id, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: 'Not found'
      })

      return;
    }

    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    })

    return;
  }

  controller.create(req.body, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return;
    }

    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

router.put('/:resource/:id', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];

	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		})

		return;
	}

	controller.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return;
    }

    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

router.delete('/:resource/:id', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];

	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		})

		return
	}

	controller.destroy(req.params.id, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return;
    }

    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

module.exports = router;