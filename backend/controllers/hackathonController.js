const Hackathon = require('../models/Hackathon');

exports.createHackathon = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      imageUrl,
      status,
      rules,
      themes,
      eligibility,
      registration,
      prizes,
      perks,
      judgingCriteria,
      sponsors,
      contact,
      socialMedia,
      registrationLink
    } = req.body;

    const hackathon = new Hackathon({
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      imageUrl,
      status,
      rules,
      themes: themes || [],
      eligibility: eligibility || [],
      registration: registration || {},
      prizes: prizes || [],
      perks: perks || [],
      judgingCriteria: judgingCriteria || [],
      sponsors: sponsors || [],
      contact: contact || [],
      socialMedia: socialMedia || [],
      registrationLink
    });

    const savedHackathon = await hackathon.save();
    res.status(201).json(savedHackathon);
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(500).json({ message: 'Error creating hackathon', error: error.message });
  }
};

// Update the getHackathon controller to populate all fields
exports.getHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .select('title description startDate endDate location maxParticipants imageUrl status themes eligibility prizes perks judgingCriteria sponsors contact socialMedia registrationLink registrationClicks')
      .lean();
      
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    
    res.json(hackathon);
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    res.status(500).json({ message: 'Error fetching hackathon', error: error.message });
  }
};

// Update the updateHackathon controller to handle all fields
exports.updateHackathon = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      imageUrl,
      status,
      rules,
      themes,
      eligibility,
      registration,
      prizes,
      perks,
      judgingCriteria,
      sponsors,
      contact,
      socialMedia
    } = req.body;

    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startDate,
        endDate,
        location,
        maxParticipants,
        imageUrl,
        status,
        rules,
        themes,
        eligibility,
        registration,
        prizes,
        perks,
        judgingCriteria,
        sponsors,
        contact,
        socialMedia
      },
      { new: true }
    );

    if (!updatedHackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    res.json(updatedHackathon);
  } catch (error) {
    console.error('Error updating hackathon:', error);
    res.status(500).json({ message: 'Error updating hackathon', error: error.message });
  }
}; 