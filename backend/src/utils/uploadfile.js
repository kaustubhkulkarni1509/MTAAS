const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
s3 = new AWS.S3({ apiVersion: '2006-03-01' });
var uploadParams = { Bucket: '', Key: '', Body: '' };


const upload = async (fpath, filename,location) => {

  try {

    var fs = require('fs')
    var fileStream = fs.createReadStream(fpath)
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Bucket=location
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = path.basename(filename);
    try {
      const stored = await s3.upload(uploadParams).promise()
      console.log(stored);
      return stored.Location
    } catch (err) {
      console.log(err)
    }
  } catch (e) {
    console.log(e)
  }

}

module.exports = { upload: upload }



