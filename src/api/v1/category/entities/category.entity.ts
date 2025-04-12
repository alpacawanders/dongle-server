import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Club } from '../../club/entities/club.entity';
import { Exclude } from 'class-transformer';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updatedAt: Date;

    @OneToMany(() => Club, (club) => club.category)
    clubs: Club[];
}
