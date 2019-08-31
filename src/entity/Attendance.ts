import { EntityRepository, ManyToOne, ManyToMany, JoinTable, TreeParent, TreeChildren, Generated } from 'typeorm'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'
import Student from './Student'

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
	@Generated('uuid')
	student_id: string

	@Column()
	@Generated('uuid')
	teacher_id: string

	@Column({ nullable: true })
	present: number

	@Column('datetime')
	date: Date

	@Column()
	@CreateDateColumn()
	createdAt: Date

	@Column()
	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(type => Student, student => student.attendances)
	student: Student
}
