var { JsonDB, Config } =require('node-json-db');
var db = new JsonDB(new Config("myDataBase", true, false, '/'));
  exports.pushTransection = async (userid,transaction,amont) => {
    try {
       // let numberOfElements = await db.count(`/transaction/${userid}`);
        const d = new Date();
        let textDate = d.toLocaleString();
        var obj={"transaction":transaction,"amont":amont,"date":textDate}
        db.push(`/transaction/${userid}[]`,obj);
        // await db.save();

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