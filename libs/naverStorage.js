'use strict'

const storage_url = 'kr.object.ncloudstorage.com'
const region = 'kr-standard'
const access_key = 'oButzYTuNwaIrxsTmx0W'
const secret_key = '5vxKOkyvMHmboApyCzAmHLYYQnjr6JzjdNHFweyn'
const AWS = require('aws-sdk')
const endpoint = new AWS.Endpoint(storage_url)
const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key
    }
})

module.exports = {
    create: async (bucket_name) => {

        let {Buckets} = await S3.listBuckets().promise()

        if (!Buckets.some(e => {
            return e.Name === bucket_name
        })) {
            try {
                await S3.createBucket({
                    Bucket: bucket_name,
                    CreateBucketConfiguration: {}
                }).promise()

                await S3.putBucketCors({
                    Bucket: bucket_name,
                    CORSConfiguration: {
                        CORSRules: [
                            {
                                "AllowedHeaders": [
                                    "*"
                                ],
                                "AllowedMethods": [
                                    "GET",
                                    "PUT",
                                    "POST",
                                    "DELETE"
                                ],
                                "AllowedOrigins": [
                                    "*"
                                ],
                                "ExposeHeaders": []
                            }
                        ]
                    }
                }).promise()

            } catch (err) {
                return false
            }
        }
    },
    delete: async (key, bucket_name) => {
        let param = {
            Bucket: bucket_name,
            Key: key
        }
        await S3.deleteObject(param).promise()
    }
}