const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Création de tâche
router.post('/createTasks', async (req, res) => {
  Task.create(req.body)
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
});

// Lecture des tâches
router.get('/', async (req, res) => {
  Task.find({})
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
});
router.get('/getTasks/:id', (req, res)=>{
  const id = req.params.id
  Task.findById({_id:id})
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
});



router.put('/updateTask/:id',(req,res)=>{
  const id = req.params.id
  Task.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description})
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
})

// Suppression des tâches
router.delete('/deleteTask/:id',  (req, res) =>{
  const id = req.params.id;
  Task.findByIdAndDelete({_id: id})
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
})

// Marquage des tâches comme complètes ou incomplètes
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json();
    }
    task.isComplete = !task.isComplete;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
