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
const bcrypt = require("bcryptjs");
const Student_1 = require("./Student");
// ///// username, password, full_name, subject, email, mobile, address, profile_pic, user_type, dep_id
// // Teachers Table
// const Teachers = attendance_db.define('teachers', {
//   id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: uuidv4() }
//   , username: { type: DataTypes.STRING, unique: true, allowNull: false }
//   , password: { type: DataTypes.TEXT, allowNull: false }
//   , full_name: { type: DataTypes.STRING(100), allowNull: false }
//   , subject: { type: DataTypes.STRING(50), allowNull: false }
//   , email: { type: DataTypes.STRING(100), allowNull: true }
//   , mobile: { type: DataTypes.STRING(100), allowNull: true }
//   , address: { type: DataTypes.TEXT, allowNull: true }
//   , profile_pic: { type: DataTypes.TEXT, allowNull: true }
//   , user_type: { type: DataTypes.STRING(50), allowNull: true }
//   , dep_id: { type: DataTypes.STRING(50), allowNull: true }
//   , is_logged: { type: DataTypes.TEXT, allowNull: true }
// });
let Teacher = class Teacher {
    // @JoinTable()
    // stud: Student[]
    hashPassword() {
        this.password = bcrypt.hashSync(this.password + '', 12);
    }
    unencrypted_password_is_valid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password + '');
    }
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
__decorate([
    typeorm_2.Column({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Teacher.prototype, "username", void 0);
__decorate([
    typeorm_2.Column(),
    __metadata("design:type", String)
], Teacher.prototype, "password", void 0);
__decorate([
    typeorm_2.Column(),
    __metadata("design:type", String)
], Teacher.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "subject", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "mobile", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "address", void 0);
__decorate([
    typeorm_2.Column({ default: 'default.jpg' }),
    __metadata("design:type", String)
], Teacher.prototype, "profile_pic", void 0);
__decorate([
    typeorm_2.Column({ default: 'teacher' }),
    __metadata("design:type", String)
], Teacher.prototype, "roll", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "dep_id", void 0);
__decorate([
    typeorm_2.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "is_logged", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.CreateDateColumn(),
    __metadata("design:type", Date)
], Teacher.prototype, "createdAt", void 0);
__decorate([
    typeorm_2.Column(),
    typeorm_2.UpdateDateColumn(),
    __metadata("design:type", Date)
], Teacher.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => Student_1.default, student => student.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "students", void 0);
Teacher = __decorate([
    typeorm_1.EntityRepository(),
    typeorm_2.Entity(),
    typeorm_2.Unique(['username'])
], Teacher);
exports.default = Teacher;
//# sourceMappingURL=Teacher.js.map