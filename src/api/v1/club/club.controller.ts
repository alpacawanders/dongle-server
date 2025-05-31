import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Public } from '../auth/decorator/public.decorator';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { Role } from '../user/entities/user.entity';
import { GetClubDto } from './dto/get-club.dto';

@Controller({ path: 'club', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Public()
    @Get()
    findAll(@Query() dto: GetClubDto) {
        return this.clubService.findAll(dto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clubService.findOne(id);
    }

    @RBAC(Role.ADMIN)
    @Post()
    create(@Body() createClubDto: CreateClubDto) {
        return this.clubService.createClub(createClubDto);
    }

    @RBAC(Role.ADMIN)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateClubDto: UpdateClubDto,
    ) {
        return this.clubService.updateClub(id, updateClubDto);
    }

    @RBAC(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clubService.deleteClub(id);
    }
}
