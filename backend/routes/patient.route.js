let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Patient Model
let patientSchema = require('../Models/Patient')

// CREATE Patient
router.route('/create-patient').post((req, res, next) => {
  patientSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Patient
router.route('/').get((req, res) => {
  patientSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Patient
router.route('/edit-patient/:id').get((req, res) => {
  patientSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update patient
router.route('/update-patient/:id').put((req, res, next) => {
  patientSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Patient updated successfully !')
      }
    },
  )
})

// Delete patient
router.route('/delete-patient/:id').delete((req, res, next) => {
  patientSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
