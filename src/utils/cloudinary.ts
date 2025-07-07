import cloudinary from '../lib/cloudinary';

const sharp = require('sharp');

export const uploadSingleImage = async (
  file: Express.Multer.File,
  folder: string,
  quality: number = 80,
) => {
  try {
    const webpBuffer = await sharp(file.buffer)
      .webp({ quality: quality })
      .toBuffer();

    const fileStr = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: `/linkify-multimedia/${folder}`,
      format: 'webp',
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a cloudinary:', error);
    throw new Error('Error al intentar subir la imagen');
  }
};

export const uploadMultipleImages = async (
  files: Express.Multer.File[],
  folder: string,
  quality: number = 80,
) => {
  try {
    const imageUrls: string[] = [];

    for (const file of files) {
      const webpBuffer = await sharp(file.buffer)
        .webp({ quality: quality })
        .toBuffer();

      const fileStr = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

      const result = await cloudinary.uploader.upload(fileStr, {
        folder: `/linkify-multimedia/${folder}`,
        format: 'webp',
      });

      imageUrls.push(result.secure_url);
    }

    return imageUrls;
  } catch (error) {
    console.error('Error al subir las imágenes a cloudinary:', error);
    throw new Error('Error al intentar subir las imágenes');
  }
};

export const deleteImage = async (url: string) => {
  try {
    const publicId = getPublicIdFromUrl(url);

    if (!publicId) {
      throw new Error('No se pudo obtener el publicId');
    }

    await cloudinary.uploader.destroy(publicId);

    return { message: 'Imagen eliminada con éxito' };
  } catch (error) {
    console.error('Error al intentar eliminar imagen:', error);
    throw new Error('Error al intentar eliminar imagen');
  }
};

const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/(.+)\.[a-zA-Z]+$/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error('No se pudo obtener el publicId');
};
