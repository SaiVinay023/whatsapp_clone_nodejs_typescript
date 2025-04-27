/*import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export async function uploadFile(file: Express.Multer.File) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
  };
  return s3.upload(params).promise();
} */