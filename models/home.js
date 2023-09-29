const db = require("../config/config");

const Home = {};

Home.getCounts = (result) => {
    const sql = `
    SELECT 'users' AS type, COUNT(*) FROM users
    UNION ALL 
    SELECT 'orders', COUNT(*) FROM orders
    UNION ALL 
    SELECT 'restaurants', COUNT(*) FROM restaurants
    UNION ALL 
    SELECT 'products', COUNT(*) FROM products;
    
    `;

    db.query(sql, (err, counts) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Counts obtained:", counts);
            result(null, counts);
        }
    });
};


module.exports = Home;