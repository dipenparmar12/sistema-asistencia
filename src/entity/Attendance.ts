import { EntityRepository } from 'typeorm'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'

// ///// student_id, date_id, teacher_id, absent_present
// //// Attendances Table
// const Attendances = attendance_db.define('attendances', {
//   // student_id: { type: DataTypes.INTEGER, allowNull:false }
//   student_id: { type: DataTypes.UUID, allowNull: false, onDelete: 'cascade' } // Cascade mean if we delete Studnet_i, than all atten. that has same s.id that all rows deleted from this table also
//   , teacher_id: { type: DataTypes.UUID, allowNull: false, }
//   , date: { type: DataTypes.DATEONLY, allowNull: false, }
//   , present: { type: DataTypes.TINYINT, defaultValue: 2 }
// });

@EntityRepository()
@Entity()
export default class Attendance {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	student_id: number

	@Column()
	teacher_id: number

	@Column({ nullable: true })
	present: String

	@Column()
	@CreateDateColumn()
	date: Date

	@Column()
	@CreateDateColumn()
	createdAt: Date

	@Column()
	@UpdateDateColumn()
	updatedAt: Date
}
