import { EntityRepository } from 'typeorm'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'

// ///// id, roll_no, enrollment_no, full_name, email, mobile, address, dob, profile_pic
// //// Students Table
// const Students = attendance_db.define('students', {
//   id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: uuidv4() }
//   , roll_no: { type: DataTypes.INTEGER, unique: false, allowNull: false }
//   , enrollment_no: { type: DataTypes.STRING(100), unique: true, allowNull: false }
//   , full_name: { type: DataTypes.STRING(100), allowNull: false }
//   , email: { type: DataTypes.STRING(100), allowNull: true }
//   , mobile: { type: DataTypes.STRING(100), allowNull: true }
//   , address: { type: DataTypes.TEXT, allowNull: true }
//   , dob: { type: DataTypes.DATE, allowNull: true }
//   , profile_pic: { type: DataTypes.TEXT, allowNull: true }
//   , teacher_id: { type: DataTypes.UUID, allowNull: false, }
// });

@EntityRepository()
@Entity()
@Unique(['enrollment_no'])
export default class Student {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	roll_no: number

	@Column()
	enrollment_no: number

	@Column()
	name: String

	@Column({ nullable: true })
	subject: String

	@Column({ nullable: true })
	email: String

	@Column({ nullable: true })
	mobile: String

	@Column({ nullable: true })
	address: String

	@Column({ default: 'default.jpg' })
	profile_pic: String

	@Column()
	@CreateDateColumn()
	createdAt: Date

	@Column()
	@UpdateDateColumn()
	updatedAt: Date
}
