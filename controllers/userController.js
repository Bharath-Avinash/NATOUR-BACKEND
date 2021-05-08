const fs = require('fs');

const Users =JSON.parse( fs.readFileSync('dev-data/data/users.json'));
exports.getAllUser =  (req, res) =>{
    req.requestTime = new Date().toISOString();
    const d = new Date().toISOString();
    
    console.log(req.requestTime);

    //console.log(tours);
   res.send(Users);

  
};
exports.getUser = (req, res) =>{
    
    console.log(req.params);
    const id = req.params.id*1;
  
    const User = Users.find(el=>el.id === id);
    if(!User){
        return res.status(404).json({
        status: 'fail',
        data: 'invalid id'
        });
    }
    console.log(User);
    res.status(200).json({
        status: 'success',
         data  : {tour},

    });
   

  
};
exports.createUser = (req, res) =>{
    const newID = User[Users.length-1].id+1;
    const newTour = Object.assign({id : newID},req.body);
    Users.push(newTour);
    fs.writeFile('dev-data/data/Users.json', JSON.stringify(Users), (err)=>{
        res.status(201).json({
            status : 'success',
            data : {
                Users : newUser,
            }
        });
    });
    
    };

    exports.updateUser = (req, res) =>
    {if(req.params.id>=Users.length){
        return res.status(404).json({
        status: 'fail',
        data: 'invalid id'
        });
    }
    res.status(201).json({
        status : 'success',
        data : '< updated tour here.....>'
    });
};
    exports.deleteUser =(req, res) =>{
        if(req.params.id>=Users.length){
            return res.status(404).json({
            status: 'fail',
            data: 'invalid id'
            });
        }
        res.status(201).json({
            status : 'success',
            data : '< updated tour here.....>'
        });
    };