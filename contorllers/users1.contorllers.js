const userModels = require("../models/users1.models");
const jwt = require("jsonwebtoken");
const maxAge = 60000;
const bcrypt = require("bcryptjs");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};
const createSendToken=(userModels,statusCode,res,message)=>{
  const token=createToken(userModels._id);
  const cookieOptions={
    expires:new Date(
      Date.now()+maxAge
    ),
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'None':'lax',
  };

  res.cookie('jwt',token,cookieOptions);
  userModels.password=undefined;
  userModels.passwordConfim=undefined;
  userModels.otp=undefined;
  res.status(statusCode).json({
    status:'success',
    token,
    message,
    data:{
      userModels
    }
  });
}

module.exports.createUsers = async (req, res, next) => {
  const form = req.body;

  const data1 = {
    username: form.username,
    password: form.password,
    user_online: false,
    user_type_id: form.user_type_id,
    created_date: new Date(),
  };
  await userModels.create(data1, (err) => {
    if (!err) {
      console.log("Save");
      res.json({
        status: true,
        message: "Saved",
      });
    } else {
      console.log("error ");

      res.json({
        status: false,

        message: "Email have been!",
      });
    }
  });
};

module.exports.readUsers1 = async (req, res, next) => {
  userModels
    .aggregate([
      {
        $lookup: {
          from: "user_types",
          localField: "user_type_id",
          foreignField: "_id",
          as: "user_type_name",
        },
      },
    ])
    .exec((err, data) => {
      if (!err) {
        res.json({
          status: true,
          message: "selete all data ",
          data: data,
        });
      } else {
        console.log("error");
        res.json({
          status: false,
          message: err,
        });
      }
    });
};

module.exports.readUsers = async (req, res, next) => {
  userModels.find().exec((err, data) => {
    if (!err) {
      res.json({
        status: true,
        message: "selete all data ",
        data: data,
      });
    } else {
      res.json({
        status: false,
        message: err,
      });
    }
  });
};

module.exports.testUser = async (req, res, next) => {
  userModels
    .find()
    .populate("author")
    .exec((err, data) => {
      if (!err) {
        console.log("select ", data);
        res.json({
          status: true,
          message: "selete all data ",
          data: data,
        });
      } else {
        console.log("error");
        res.json({
          status: false,
          message: err,
        });
      }
    });
};

module.exports.updateUsers = async (req, res, next) => {
  const form = req.body;
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(form.password, salt);

  const data = {
    username: form.username,
    password: password,
    user_type_id: form.user_type_id,
    updated_date: new Date(),
  };
  userModels
    .findByIdAndUpdate(form._id, data, { useFindAndModify: false })
    .exec((err, data) => {
      if (!err) {
        console.log("Updatwe Sucess  ");

        res.json({
          status: true,
          message: "Update Sucess !",
          data: data,
        });
      } else {
        console.log("error");

        res.json({
          status: false,
          message: err,
        });
      }
    });
};

module.exports.deleteUsers = async (req, res, next) => {
  const form = req.body;

  userModels
    .findByIdAndDelete(form._id, { useFindAndModify: false })
    .exec((err, data) => {
      if (!err) {
        console.log("Delete Sucess  ");

        res.json({
          status: true,
          message: "Delete Sucess !",
          data: data,
        });
      } else {
        console.log(" Delete error");

        res.json({
          status: false,
          message: err,
        });
      }
    });
};

module.exports.userLogin = async (req, res, next) => {
  const form = req.body;
  const email = form.email;
  const user = await userModels.findOneAndUpdate(
    { email },
    { user_online: true }
  );

  if (user) {
    const auth = await bcrypt.compare(form.password, user.password);

    console.log("login have user");

    if (auth) {
      console.log("password is corect");

      const token = createToken(user._id);

      res.cookie("id", token, {
        withCredent: true,
        httpOnly: true,
        maxAge: 60000,
      });

      res.json({
        status: true,
        message: "login Succecss  !",
        token: token,
      });
    } else {
      res.json({
        status: false,
        message: "password is not corect!",
      });
    }
    return;
  }

  res.json({
    status: false,
    message: "Email have not !",
  });
};

module.exports.checkToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModels.findById(decoded.id);

    if (user)
      return res.status(200).json({
        status: true,
        data: user,
      });
  } else {
    return res.status(401).json({ status: false, message: "Token is not " });
  }
};

