import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Report } from '../../report/entities/report.entity';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity('club')
export class Club {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    detail: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column()
    contact: string;

    @Column()
    location: string;

    @ManyToOne(() => Category, (category) => category.clubs)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ nullable: true })
    apply_url: string;

    @Column({ type: 'date', nullable: true })
    recruit_start: Date;

    @Column({ type: 'date', nullable: true })
    recruit_end: Date;

    @Column({ nullable: true })
    youtube_url: string;

    @Column({ nullable: true })
    instagram_url: string;

    @ManyToOne(() => User, (user) => user.clubs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToMany(() => Report, (report) => report.club)
    reports: Report[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}
