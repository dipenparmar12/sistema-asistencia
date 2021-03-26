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
const Student_1 = require("./Student");
// ///// student_id, date_id, teacher_id, absent_present
// //// Attendances Table
// const Attendances = attendance_db.define('attendances', {
//   // student_id: { type: DataTypes.INTEGER, allowNull:false }
//   student_id: { type: DataTypes.UUID, allowNull: false, onDelete: 'cascade' } // Cascade mean if we delete Studnet_i, than all atten. that has same s.id that all rows deleted from this table also
//   , teacher_id: { type: DataTypes.UUID, allowNull: false, }
//   , date: { type: DataTypes.DATEONLY, allowNull: false, }
//   , present: { type: DataTypes.TINYINT, defaultValue: 2 }
// });
let Attendance = class Attendance {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], Attendance.prototype, "student_id", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], Attendance.prototype, "teacher_id", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", Number)
], Attendance.prototype, "present", void 0);
__decorate([
    typeorm_2.Column('date'),
    __metadata("design:type", Date)
], Attendance.prototype, "date", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.CreateDateColumn(),
    __metadata("design:type", Date)
], Attendance.prototype, "createdAt", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.UpdateDateColumn(),
    __metadata("design:type", Date)
], Attendance.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.default, student => student.attendances, {
        eager: true,
        nullable: true,
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Student_1.default)
], Attendance.prototype, "student", void 0);
Attendance = __decorate([
    typeorm_1.EntityRepository(),
    typeorm_2.Entity()
], Attendance);
exports.default = Attendance;
//# sourceMappingURL=Attendance.js.map