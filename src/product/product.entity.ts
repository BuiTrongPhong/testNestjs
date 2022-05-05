import { Order } from "src/order/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    price: number
    @Column()
    total: number
    @ManyToMany(()=> Order, order => order.products)
    orders: Order[]
}