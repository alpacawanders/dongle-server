import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('banner')
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_url: string;

    @Column({ nullable: true })
    href: string;

    @Column()
    order: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}
