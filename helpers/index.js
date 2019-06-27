const fs = require('fs');
let helpers = {};

helpers.putDataRequest = async (studentId, propertiesString, setProperties) => {
  const fileName = `data/${studentId}.json`;
  const properties = propertiesString.split('/').filter(el => el !== '');
  let data = {};
  let evalString = 'data';

  try {
    if (fs.existsSync(fileName)) { //File Already Exists
      const fileData = await fs.promises.readFile(fileName, 'utf8');
      data = JSON.parse(fileData);
    }
    
    properties.map(property => {
      evalString = evalString.concat(`.${property}`);
      if (eval(evalString)  == undefined) {
        eval(`${evalString} = {}`)
      }
    });

    eval(`${evalString} = ${JSON.stringify(setProperties)}`);
    await fs.promises.writeFile(fileName, JSON.stringify(data), 'utf8');
  } catch(err) {
    return { message: err.message, success: false };
  }
  
  return { success: true };
}

helpers.getDataRequest = async (studentId, propertiesString) => {
  try {
    const fileName = `data/${studentId}.json`;
    const fileData = await fs.promises.readFile(fileName, 'utf8');
    let data = JSON.parse(fileData);

    if (propertiesString == undefined) {
      return { success: true, data }
    }

    const evalString = `data.${
      propertiesString
      .split('/')
      .filter(el => el !== '')
      .join('.')
    }`;

    data = eval(`${evalString}`);
    if (data == undefined) {
      return { success: false, message: 'unable to find Property' };
    } else {
      return { success: true, data };
    }
  } catch(err) {
    return { success: false, message: err.message };
  }
}

helpers.removeDataRequest = async (studentId, propertiesString) => {
  try {
    const fileName = `data/${studentId}.json`;
    const fileData = await fs.promises.readFile(fileName, 'utf8');
    let data = JSON.parse(fileData);
    
    const evalString = `data.${
      propertiesString
      .split('/')
      .filter(el => el !== '')
      .join('.')
    }`;

    eval(`delete ${evalString}`);
    await fs.promises.writeFile(fileName, JSON.stringify(data), 'utf8');
    return { success: true, message: 'Properties has been removed successfully' };

  } catch(err) {
    return { success: false, message: err.message };
  }
}

module.exports = helpers;