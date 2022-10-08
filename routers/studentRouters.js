const express = require('express');
const db = require('../module');
const router = express.Router();

const getFoodsData = (req, res) =>{
    db.getDbFoods()
    .then(foods => res.send(foods));
    
};

const addNewItem = (req, res) => {
    const addFoodItem = req.body;
    db.getDbFoods()
    .then(foods => {
        foods.push(addFoodItem);
        db.insertDbFoods(foods)
        .then(data => res.send(foods))
    });
};

const getAFoodData = (req, res) => {
    const id = parseInt(req.params.id);
    db.getDbFoods()
    .then(foods => {
        const foodItem = foods.find(foodItem => foodItem.id === id);
            if(!foodItem) res.status(404).send("Item not found");
            else res.send(foodItem);
    });
};

const updateAFoodData = (req, res)=> {
    const id = parseInt(req.params.id);
    const updateItem = req.body;
    db.getDbFoods()
    .then(foods => {
        const foodItem = foods.find(foodItem => foodItem.id === id);
        console.log(foodItem)
        if(!foodItem) res.status(404).send("Item not found")
        else {
            const findItemIndex = foods.findIndex(item => item.id === foodItem.id);
            console.log(findItemIndex)
                foods[findItemIndex] = updateItem;
                db.insertDbFoods(foods)
                .then(data => res.send(updateItem))
        }
    })
}

const deleteAFoodData = (req, res)=> {
    const id = parseInt(req.params.id);
    db.getDbFoods()
    .then(foods => {
        const foodItem = foods.find(foodItem => foodItem.id === id);
        if(!foodItem) res.status(404).send("Item not found");
        else {
            const updatedFoods = foods.filter(item => item.id !== foodItem.id);
            db.insertDbFoods(updatedFoods)
            .then(data => {res.send(foodItem)});
        }
    });
};

router.route('/').get(getFoodsData).post(addNewItem);

// app.post('/api/foods');

router.route('/:id').get(getAFoodData).put(updateAFoodData).delete(deleteAFoodData);

// app.put('/api/foods/:id');

// app.delete('/api/foods/:id');


module.exports = router;
