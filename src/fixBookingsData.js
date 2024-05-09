import mysql from "mysql";
// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'nroot1234',
  database: 'production'
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  
  // Query the table
  connection.query('SELECT * FROM bookings', (err, rows) => {
    if (err) {
      console.error('Error querying table:', err);
      return;
    }
    sudo apt-get install php8.3-fpm php8.3 php8.3-cli php8.3-mysql php8.3-gd php8.3-imagick php8.3-recode php8.3-tidy php8.3-xmlrpc php8.3-common php8.3-curl php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-bz2 php8.3-intl php8.3-json php8.3-readline php8.3-zip

    // Iterate over the rows
    rows.forEach(row => {
      // Modify the fields as needed
      // For example, let's assume you want to convert a field named 'name' to uppercase
      row.name = row.name.toUpperCase();
      console.log(row);
      // Update the record in the database
    //   connection.query('UPDATE bookings SET name = ? WHERE id = ?', [row.name, row.id], (err, result) => {
    //     if (err) {
    //       console.error('Error updating record:', err);
    //       return;
    //     }
    //     console.log('Record updated successfully');
    //   });
    });
  });
});

// Close the connection after all operations are done
connection.end();
