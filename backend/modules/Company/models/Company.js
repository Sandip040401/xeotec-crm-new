const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    domain: { type: String, unique: true, required: true }, // e.g., company.crm.com
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who bought CRM
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // All employees under CRM
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
