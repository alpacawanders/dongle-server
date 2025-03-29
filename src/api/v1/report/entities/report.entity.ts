import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Club } from '../../club/entities/club.entity';
import { User } from '../../user/entities/user.entity';

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    image_url: string;

    @ManyToOne(() => Club, (club) => club.reports, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'club_id' })
    club: Club;

    @ManyToOne(() => User, (user) => user.reports, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'writer_id' })
    writer: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}
