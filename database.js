var { JsonDB, Config } =require('node-json-db');
var db = new JsonDB(new Config("myDataBase", true, false, '/'));
// exports.checkUser = async (userid) => {
//     try {
//         console.log(22);
//         var user=await db.getIndex("/userid", userid);
//         console.log(user);
//         //if(user){
//         db.push("/userid",userid);
//         return true;

//    // }
//     } catch (error) {
//       console.error(error);
//       return error
//     }
//   };
  exports.pushTransection = async (userid,transaction,amont) => {
    try {
       // let numberOfElements = await db.count(`/transaction/${userid}`);
        var obj={"transaction":transaction,"amont":amont}
        db.push(`/transaction/${userid}[]`,obj);
        return true;

    } catch (error) {
      console.error(error);
      return error

    }
  };
  exports.get = async (userid) => {
    try {
        console.log(userid);
        var data=await db.getData(`/transaction/${userid}`);
        console.log(data);
        return data;
    } catch (error) {
      console.error(error);
      return error

    }
  };