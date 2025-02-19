const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, // Dynamic Role
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null }, // Null for superadmin
    isActive: { type: Boolean, default: true }, // Enable/Disable User
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
