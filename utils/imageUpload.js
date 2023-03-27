const sharp = require('sharp');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const {S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
})

async function uploadImage(name, data, type) {
    const buff = await sharp(data).resize({height:500, width:500}).toBuffer();
    
    const command = new PutObjectCommand({
        Bucket: "mobilkubucket",
        Key: name,
        Body:buff,
        ContentType: type
    })
    await s3.send(command);
}

async function getImage(name) {
    const image = new GetObjectCommand({
        Bucket: "mobilkubucket",
        Key:name
    })

    const rest = await getSignedUrl(s3, image, {expiresIn: 7200});
    return rest;
}

module.exports = {uploadImage,getImage}