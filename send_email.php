<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "rodrygodesign@gmail.com"; // Your email address
    $subject = "New Contact Form Submission";
    
    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Email content
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";
    
    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "There was a problem sending your message.";
    }
} else {
    echo "Invalid request.";
}
?>
