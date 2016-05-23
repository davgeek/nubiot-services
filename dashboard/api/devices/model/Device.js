'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const deviceSchema = new Schema({
  _id: { type: String, unique: true, default: shortid.generate },
  name: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  icon: { type: String, required: true },
  owner: Schema.Types.ObjectId,
  secret: String,
  token: String,
  mqtt: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  created_at: { type: Date },
  updated_at: { type: Date },
  nodes: [{ type: String, ref: 'Node' }]
});

//Transform
deviceSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

deviceSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  
  next();
});

module.exports = mongoose.model('Device', deviceSchema);