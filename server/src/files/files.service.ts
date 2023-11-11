import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { join } from 'path';

@Injectable()
export class FilesService {
    createFile(files): string[] {
        try {
            const fileNames = [];
            files.forEach((file) => {
                const fileName = uuid.v4() + '.jpg';
                fileNames.push(fileName);
                const filePath = path.resolve(__dirname, '..', '..', 'static');
                console.log(filePath);
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            });
            return fileNames;
        } catch (e) {
            throw new HttpException('Ошибка при загрузке файла', 500);
        }
    }
}
