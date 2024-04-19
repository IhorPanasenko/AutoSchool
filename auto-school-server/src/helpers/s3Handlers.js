const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

exports.getPhotoUrl = async (s3CLient, photoName) => {
  const getPhotoObject = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: photoName,
  });

  const photoUrl = await getSignedUrl(s3CLient, getPhotoObject, {
    expiresIn: 3600,
  });

  return photoUrl;
};

exports.uploadPhotoToS3 = async (s3Client, file, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
};

exports.deletePhotoFromS3 = async (s3CLient, photoName) => {
  const deletePhotoObject = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: photoName,
  });

  await s3CLient.send(deletePhotoObject);
};
