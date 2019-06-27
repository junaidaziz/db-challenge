const express = require('express');
const dataRouter = express.Router();
const fs = require('fs');
const {
  putDataRequest,
  getDataRequest,
  removeDataRequest,
} = require('../helpers');

const routeExpressions = ['/:studentId', '/:studentId/*'];

dataRouter.put(routeExpressions, async (req, res, next) => {
  const {
    params: {
      studentId
    },
    body: setProperties,
  } = req;
  const propertiesString = req.params[0];

  if(propertiesString == undefined) {
    return res.send({
      message: 'No Properties found!',
      success: false
    });
  }
  const result = await putDataRequest(studentId, propertiesString, setProperties);
  return res.send(result);
})


dataRouter.get(routeExpressions, async (req, res, next) => {
  const {
    params: {
      studentId
    }
  } = req;

  const fileName = `data/${studentId}.json`;
  const propertiesString = req.params[0];

  // check if file dosn't exists then return with status code 404.
  if (!fs.existsSync(fileName)) {
    return res.status(404).send({
      success: false,
      message: 'Student record dosn\'t found',
    });
  }

  const result = await getDataRequest(studentId, propertiesString);
  return res.send(result);
})

dataRouter.delete(routeExpressions, async (req, res, next) => {
  const {
    params: {
      studentId
    },
  } = req;
  const fileName = `data/${studentId}.json`;
  const propertiesString = req.params[0];

  // check if file dosn't exists then return with '404'
  if (!fs.existsSync(fileName)) {
    return res.status(404).send({ success: false, message: 'Student record dosn\'t found' });
  }

  if (propertiesString == undefined) { // Remove file
    await fs.unlinkSync(fileName);
    return res.send({success: true, message: 'File has been removed successfully'});
  } else { // Remove Properties
    const result = await removeDataRequest(studentId, propertiesString);
    return res.send(result);
  }
});

module.exports = dataRouter



