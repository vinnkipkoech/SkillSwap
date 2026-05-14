const express = require('express');
const router = express.Router();
// 🚨 THE FIX: Import the model so the router knows what a "Skill" is
const Skill = require('../models/Skill'); 

router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        // Now that Skill is imported above, this line will actually work!
        const newSkill = new Skill(req.body);
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.deleteOne();
    res.json({ message: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;