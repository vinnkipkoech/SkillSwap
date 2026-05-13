const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "API is working!" });
});

router.post('/', async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;