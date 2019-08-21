import { EntityRepository } from 'typeorm'
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	VersionColumn,
	Unique,
} from 'typeorm'

// const Teachers = attendance_db.define('teachers', {
// 	id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: uuidv4() }
// 	, username: { type: DataTypes.STRING, unique: true, allowNull: false }
// 	, password: { type: DataTypes.TEXT, allowNull: false }
// 	, full_name: { type: DataTypes.STRING(100), allowNull: false }
// 	, subject: { type: DataTypes.STRING(50), allowNull: false }
// 	, email: { type: DataTypes.STRING(100), allowNull: true }
// 	, mobile: { type: DataTypes.STRING(100), allowNull: true }
// 	, address: { type: DataTypes.TEXT, allowNull: true }
// 	, profile_pic: { type: DataTypes.TEXT, allowNull: true }
// 	, user_type: { type: DataTypes.STRING(50), allowNull: true }
// 	, dep_id: { type: DataTypes.STRING(50), allowNull: true }
// 	, is_logged: { type: DataTypes.TEXT, allowNull: true }
//   });

@EntityRepository()
@Entity()
@Unique(['username'])
export default class Teacher {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	@VersionColumn()
	version: number

	@Column({ type: 'varchar', length: 100 })
	username: String

	@Column()
	password: String

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
	roll: String

	@Column({ nullable: true })
	dep_id: String

	@Column({ type: 'text', nullable: true })
	is_logged: string

	@Column()
	@CreateDateColumn()
	createdAt: Date

	@Column()
	@UpdateDateColumn()
	updatedAt: Date

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10)
	}
}
