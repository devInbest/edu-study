<?php
/**
 * Enquiry endpoint for Hostinger Premium (PHP).
 * Place this file at: public_html/api/enquiry.php
 * Copy enquiry-config.example.php → enquiry-config.php and edit emails.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed.']);
  exit;
}

$configFile = __DIR__ . '/enquiry-config.php';
$config = [
  'to_email' => 'studywala202226@gmail.com',
  'from_email' => 'noreply@edustudyconsultancy.com',
  'from_name' => 'Edu Study Consultancy',
];

if (is_file($configFile)) {
  $loaded = include $configFile;
  if (is_array($loaded)) {
    $config = array_merge($config, $loaded);
  }
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON body.']);
  exit;
}

// Honeypot
if (!empty($data['website'])) {
  echo json_encode(['message' => 'Enquiry received.']);
  exit;
}

$name = trim((string)($data['name'] ?? ''));
$mobile = trim((string)($data['mobile'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$preferredCourse = trim((string)($data['preferredCourse'] ?? ''));
$college = trim((string)($data['college'] ?? ''));
$location = trim((string)($data['location'] ?? ''));
$qualification = trim((string)($data['qualification'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

function valid_indian_mobile($mobile) {
  return (bool)preg_match('/^[6-9]\d{9}$/', $mobile);
}

function valid_email_addr($email) {
  return (bool)filter_var($email, FILTER_VALIDATE_EMAIL);
}

if (
  $name === '' ||
  strlen($name) < 3 ||
  !preg_match("/^[a-zA-Z\\s.'-]+$/", $name) ||
  !valid_indian_mobile($mobile) ||
  !valid_email_addr($email)
) {
  http_response_code(400);
  echo json_encode(['error' => 'Please provide valid name, mobile, and email.']);
  exit;
}

if ($preferredCourse === '' || $location === '' || strlen($location) < 3 || $qualification === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Course, location, and qualification are required.']);
  exit;
}

if ($college === '' || strlen($college) < 3) {
  http_response_code(400);
  echo json_encode(['error' => 'College / University is required.']);
  exit;
}

if ($message === '' || strlen($message) < 10 || strlen($message) > 150) {
  http_response_code(400);
  echo json_encode(['error' => 'Please provide a message between 10 and 150 characters.']);
  exit;
}

$submittedAt = gmdate('c');
$subject = 'New admission enquiry — ' . $name;
$body = "New enquiry from the website\n\n"
  . "Name: {$name}\n"
  . "Mobile: {$mobile}\n"
  . "Email: {$email}\n"
  . "Preferred course: {$preferredCourse}\n"
  . "College / University: {$college}\n"
  . "Location: {$location}\n"
  . "Qualification: {$qualification}\n"
  . "Message: {$message}\n"
  . "Submitted at (UTC): {$submittedAt}\n";

$fromEmail = $config['from_email'];
$fromName = $config['from_name'];
$toEmail = $config['to_email'];

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . sprintf('%s <%s>', $fromName, $fromEmail);
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$ok = @mail($toEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Unable to send enquiry right now. Please try WhatsApp or call us.',
  ]);
  exit;
}

echo json_encode([
  'message' => 'Thank you! Our counsellor will contact you soon.',
]);
