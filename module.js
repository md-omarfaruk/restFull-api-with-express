const fs = require('fs');

const getDbFoods = () => {
    return new Promise ((resolved, reject)=> {
        fs.readFile('./db.json', 'utf-8', (err, data)=> {
            const foods = JSON.parse(data)
            resolved(foods)
        });
    }) 
};

const insertDbFoods = (foods) =>{
    return new Promise ((resolved, reject)=> {
        fs.writeFile('./db.json', JSON.stringify(foods), (err)=> {
            resolved("Successfully food item added");
        });
    })
}

module.exports.getDbFoods = getDbFoods;
module.exports.insertDbFoods = insertDbFoods;