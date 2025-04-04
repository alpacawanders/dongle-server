import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller({ path: 'club', version: '1' })
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Get()
    findAll() {
        return this.clubService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clubService.findOne(+id);
    }

    @Post()
    create(@Body() createClubDto: CreateClubDto) {
        return this.clubService.create(createClubDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
        return this.clubService.update(+id, updateClubDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clubService.remove(+id);
    }
}
