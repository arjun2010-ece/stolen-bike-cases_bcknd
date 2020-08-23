const { errorHandler } = require("../helpers/dbErrorHandler");
const User = require("../models/user");


exports.createAdmin = (req, res) => {

    const admin =  new User(req.body);
    admin.save((err, data) => {
        if(err || !data){
            return res.json({
                message: errorHandler(err)
              });
        }

        return res.json({
            data,
            message: 'Admin created'
          });
    });
}

exports.createUser = async (req, res) => {

    try {
    const incomingToken = req.headers["token"];
    const admin = await User.find({ token: incomingToken });
    const permissions = req.body.permissions;
    permissions.forEach(p => {
        if(!["read","create"].includes(p)){
            return res.json({
                message: "Permission can only be read and create"
            })
        }
    });    
    const {_id} = admin[0];
    // return res.send(_id)
    if(admin[0]){
        const user =  new User(req.body);
        user["createdBy"] = _id;
        user.save((err, data) => {
            if(err || !data){
                return res.json({
                    message: errorHandler(err)
                  });
            }
    
            return res.json({
                data,
                message: 'Admin created'
              });
        });
    }

    } catch (error) {
         console.log("Error is: ", error.message);
         res.send("Error is: ", error.message);
    }
   
}