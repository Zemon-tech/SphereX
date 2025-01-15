const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  imageUrl: { type: String },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'ended'],
    default: 'upcoming'
  },
  rules: { type: String },
  
  // New fields
  themes: [{
    name: String,
    description: String
  }],

  eligibility: [{
    criteria: String
  }],

  registration: {
    process: String,
    deadline: Date,
    fee: String
  },

  prizes: [{
    position: String,
    prize: String,
    description: String
  }],

  perks: [{
    title: String,
    description: String
  }],

  judgingCriteria: [{
    criteria: String,
    weightage: String
  }],

  sponsors: [{
    name: String,
    logo: String,
    website: String
  }],

  contact: [{
    name: String,
    role: String,
    email: String,
    phone: String
  }],

  socialMedia: [{
    platform: String,
    link: String
  }],

  visits: {
    type: Number,
    default: 0
  },

  visitHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    userId: String
  }],

  registrationLink: { type: String },

  registrationClicks: { type: Number, default: 0 },

  registeredUsers: [{
    userId: String,
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

hackathonSchema.methods.incrementRegistrationClicks = async function(userId) {
  // Check if user has already registered
  const hasRegistered = this.registeredUsers.some(reg => reg.userId === userId);
  
  if (!hasRegistered) {
    this.registeredUsers.push({ userId });
    this.registrationClicks = (this.registrationClicks || 0) + 1;
    return this.save();
  }
  
  return this;
};

hackathonSchema.methods.hasUserRegistered = function(userId) {
  return this.registeredUsers.some(reg => reg.userId === userId);
};

module.exports = mongoose.model('Hackathon', hackathonSchema); 