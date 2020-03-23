const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to db successfully");
        
    } catch (error) {
        console.error("Could not connect!", error);
    }
})();

module.exports = mongoose.connection;
