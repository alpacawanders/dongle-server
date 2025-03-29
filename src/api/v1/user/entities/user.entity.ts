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

export enum UserRole {
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
    password: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToMany(() => Report, (report) => report.writer)
    reports: Report[];

    @OneToMany(() => Club, (club) => club.owner)
    clubs: Club[];

    @OneToMany(() => Notice, (notice) => notice.writer)
    notices: Notice[];
}
