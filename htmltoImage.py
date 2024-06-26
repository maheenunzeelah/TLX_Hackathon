# pip3 install requests
import requests

HCTI_API_ENDPOINT = "https://hcti.io/v1/image"
# Retrieve these from https://htmlcsstoimage.com/dashboard
HCTI_API_USER_ID = 'a526f8b0-0b9d-4551-b264-19da19413cc7'
HCTI_API_KEY = '881af195-4088-4d89-b4a0-2758f8f6521a'

data = { 'html': """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="login-wrapper">
  <div class="login-modal">
    <h2>Log in</h2>
    <p>Don’t have an account? <a href="#">Sign up</a></p>
    <button class="social-button">Log in with Facebook</button>
    <button class="social-button">Log in with Google</button>
    <div class="form-group">
      <input type="email" id="email" name="email" placeholder="Your email">
    </div>
    <div class="form-group">
      <input type="password" id="password" name="password" placeholder="Your password">
    </div>
    <button class="login-button">Log in</button>
    <a class="forgot-password" href="#">Forgot password?</a>
  </div>
</div>
</body>
</html>""",
         'css': """
```css
body {
  font-family: Arial, sans-serif;
  background-image: url('background.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.login-wrapper {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.login-modal h2 {
  text-align: center;
}

.login-modal p {
  text-align: center;
  font-size: 0.8em;
}

.social-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #007BFF; /* Placeholder color for both buttons */
}

.form-group {
  margin: 10px 0;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 0.8em;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```
""" }

image = requests.post(url = HCTI_API_ENDPOINT, data = data, auth=(HCTI_API_USER_ID, HCTI_API_KEY))

print("Your image URL is: %s"%image.json()['url'])
# https://hcti.io/v1/image/7ed741b8-f012-431e-8282-7eedb9910b32
