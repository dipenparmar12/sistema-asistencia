"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Teacher_1 = require("./Teacher");
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
let Student = class Student {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    typeorm_2.Column(),
    __metadata("design:type", Number)
], Student.prototype, "roll_no", void 0);
__decorate([
    typeorm_2.Column(),
    __metadata("design:type", Number)
], Student.prototype, "enrollment_no", void 0);
__decorate([
    typeorm_2.Column(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "subject", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "mobile", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    typeorm_2.Column({ default: 'default.jpg' }),
    __metadata("design:type", String
    // @Column()
    // @Generated('uuid')
    // teacher_id: String
    )
], Student.prototype, "profile_pic", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.CreateDateColumn(),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.UpdateDateColumn(),
    __metadata("design:type", Date)
], Student.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Teacher_1.default),
    __metadata("design:type", Teacher_1.default
    // @OneToMany(type => Attendance, attendance => attendance.student_id, { cascade: ['insert', 'update'] })
    // attendances: Attendance[]
    )
], Student.prototype, "teacher", void 0);
Student = __decorate([
    typeorm_1.EntityRepository(),
    typeorm_1.Entity(),
    typeorm_2.Unique(['enrollment_no'])
], Student);
exports.default = Student;
//# sourceMappingURL=Student.js.map