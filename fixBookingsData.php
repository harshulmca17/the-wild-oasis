<?php
// MySQL database configuration
$servername = "localhost";
$username = "root";
$password = "nroot1234";
$database = "production";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the table
$sql = "SELECT *,DATEDIFF(end_date, start_date) AS date_difference FROM bookings";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Iterate over the rows
    while($row = $result->fetch_assoc()) {
        $price = rand(1,1000);
        $isPaid = $price < 500 ? 1 : 0 ;

        $extraPrice = rand(1,$price);
        $totalPrice = $price+$extraPrice;
        $diff = $row["date_difference"];
        print_r($row['date_difference']."\n"); 
        print_r($row); 
        
        $updateSql = "UPDATE bookings SET num_nights='$diff',is_paid=$isPaid , extra_price='$extraPrice', total_price='$totalPrice',cabin_price='$price',status='checked-out'  WHERE id=" . $row['id'];
        print_r(
            $updateSql."\n");
        if ($conn->query($updateSql) === TRUE) {
            echo "Record updated successfully<br>";
        } else {
            echo "Error updating record: " . $conn->error . "<br>";
        }
    }
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>
