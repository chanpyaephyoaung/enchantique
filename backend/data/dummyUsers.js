import bcrypt from "bcryptjs";

const users = [
   {
      name: "Admin",
      isAdmin: true,
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
      telephoneNum: "+44 1111111111",
   },
   {
      name: "Albus Dumbledore",
      isAdmin: false,
      email: "albus@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
      telephoneNum: "+44 2222222222",
   },
   {
      name: "Severus Snape",
      isAdmin: false,
      email: "severus@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
      telephoneNum: "+44 3333333333",
   },
];

export default users;
