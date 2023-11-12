import { HttpException, Injectable } from '@nestjs/common';
import { put } from '@vercel/blob';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
    async compressImage(image) {
        return await sharp(image)
            .webp({ effort: 3 })
            .toBuffer()
            .then((data) => data);
    }

    async uploadOneFile(file) {
        try {
            const compressedFile = await this.compressImage(file.buffer);
            const fileName = uuid.v4() + '.webp';
            await put(fileName, compressedFile, {
                access: 'public',
                addRandomSuffix: false,
            });
            return fileName;
        } catch (error) {
            throw new HttpException(
                `Ошибка при загрузке файла "${file.originalname}" - ${error}`,
                500,
            );
        }
    }

    async uploadFiles(files): Promise<string[]> {
        try {
            if (!files) {
                throw new HttpException('Файлы не найдены', 500);
            }

            const fileUrls = [];

            for (const file of files) {
                const url = await this.uploadOneFile(file);
                fileUrls.push(url);
            }
            return fileUrls;
        } catch (error) {
            throw new HttpException(
                `Ошибка при загрузке файлов - ${error}`,
                500,
            );
        }
    }
}
