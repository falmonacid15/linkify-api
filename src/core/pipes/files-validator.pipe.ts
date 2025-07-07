import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesValidationPipe implements PipeTransform {
  transform(files: {
    images?: Express.Multer.File[];
    videos?: Express.Multer.File[];
  }) {
    const images = files.images ?? [];
    const videos = files.videos ?? [];
    const totalFiles = images.length + videos.length;

    if (totalFiles > 5) {
      throw new BadRequestException(
        'Se permiten como máximo 5 archivos en total',
      );
    }

    const isImage = (mime: string) => mime.startsWith('image/');
    const isVideo = (mime: string) => mime.startsWith('video/');

    for (const file of images) {
      if (!isImage(file.mimetype)) {
        throw new BadRequestException(
          `El archivo ${file.originalname} no es una imagen válida`,
        );
      }
    }

    for (const file of videos) {
      if (!isVideo(file.mimetype)) {
        throw new BadRequestException(
          `El archivo ${file.originalname} no es un video válido`,
        );
      }
    }

    return files;
  }
}
