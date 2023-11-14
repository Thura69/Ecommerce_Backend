import {v2 as cloudinary} from 'cloudinary';
import config from 'config';



const cloud_name = config.get<string>('cloudName');
const api_key = config.get<string>('cloudApiKey');
const api_secret = config.get<string>('cloudApiSecret');

cloudinary.config({ 
  cloud_name: cloud_name, 
  api_key: api_key, 
  api_secret: api_secret 
});

          
// cloudinary.config({ 
//   cloud_name: 'dbqyaigcg', 
//   api_key: '968512548519858', 
//   api_secret: 'UH3O1jt7-FM_tE9zQP3zFCOwCyc' 
// });

export const cloudinaryUploadImg = async (fileUploads: string) => {
    return new Promise((resolve) => {
       cloudinary.uploader.upload(fileUploads, (error,result) => {
            resolve({
                url: result?.secure_url,
            })
        })
    })
};

