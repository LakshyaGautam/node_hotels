const express = require('express');
const router = express();

const MenuItem = require('./../models/MenuItem');
const { lowerFirst } = require('lodash');


router.post('/', async (req, res) =>{
  try{
    const data = req.body;

    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }

})


router.get('/', async (req, res) =>{
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  } 
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sour' || taste == 'spicy' || taste == 'sweet'){
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response); 
        }
        else {
            res.status(404).json({error: 'Invalid taste type'})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true, 
            runValidators: true
        })

        if (!response){
            res.status(404).json({error: 'MenuItem not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});        
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if (!response){
            res.status(404).json({error: 'MenuItem not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'MenuItem Deleted Successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;
