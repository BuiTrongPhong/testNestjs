import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToMany(()=>Product,product => product.orders)
    @JoinTable()
    products: Product[]
    @ManyToOne(()=> User, (user) => user.orders)
    user: User
}