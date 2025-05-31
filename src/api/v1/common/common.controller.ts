import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorator/public.decorator';

@Controller({ path: 'common', version: '1' })
export class CommonController {
    @Public()
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    createFile(@UploadedFile() file: Express.Multer.File) {
        return {
            fileName: file.filename,
        };
    }
}
