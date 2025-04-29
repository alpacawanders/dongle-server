import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateClubDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    detail: string;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsString()
    @IsNotEmpty()
    contact: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsString()
    @IsOptional()
    apply_url?: string;

    @IsBoolean()
    @IsNotEmpty()
    isRecruiting?: boolean;

    @IsDateString()
    @IsOptional()
    recruit_start?: Date;

    @IsDateString()
    @IsOptional()
    recruit_end?: Date;

    @IsString()
    @IsOptional()
    youtube_url?: string;

    @IsString()
    @IsOptional()
    instagram_url?: string;

    @IsNumber()
    @IsOptional()
    owner_id?: number;
}
