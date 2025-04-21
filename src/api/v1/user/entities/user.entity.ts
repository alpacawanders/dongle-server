import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Report } from '../../report/entities/report.entity';
import { Club } from '../../club/entities/club.entity';
import { Notice } from '../../notice/entities/notice.entity';
import { Exclude } from 'class-transformer';

export enum Role {
    USER = 'USER',
    LEADER = 'LEADER',
    ADMIN = 'ADMIN',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude({
        toPlainOnly: true,
    })
    password: string;

    @Column({ nullable: true })
    name: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deletedAt: Date;

    @OneToMany(() => Report, (report) => report.writer)
    reports: Report[];

    @OneToMany(() => Club, (club) => club.owner)
    clubs: Club[];

    @OneToMany(() => Notice, (notice) => notice.writer)
    notices: Notice[];
}
