from spire.doc import *
from spire.doc.common import *
document = Document()
sec = document.AddSection()
paragraph = sec.AddParagraph()


htmlString=""""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up Page</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-image: url('background-image-url.jpg');
        background-size: cover;
    }
    .login-container {
        width: 700px;
        background: #ffffff;
        padding: 20px;
        margin: 100px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .close-btn {
        font-size: 24px;
        float: right;
        cursor: pointer;
    }
    h1 {
        text-align: center;
        color: #333;
    }
    .social-buttons {
        margin: 20px 0;
    }
    .social-button {
        display: block;
        width: calc(100% - 20px);
        margin: 10px auto;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }
    .facebook {
        background-color: #3b5998;
        color: white;
    }
    .google {
        background-color: #dd4b39;
        color: white;
    }
    .email-section, .password-section {
        margin-top: 20px;
    }
    input[type="email"], input[type="password"]{
        width: calc(100% - 20px);
        padding: 10px;
        margin: 5px auto;
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        width: calc(100% - 20px);
        padding: 10px;
        margin: 20px auto;
        background-color: #555;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
    }
    .footer-text {
        text-align: center;
        color: #888;
        margin-top: 15px;
        font-size: 14px;
    }
    a {
        color: #0077cc;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
<div class="login-container">
    <span class="close-btn" onclick="window.close()">×</span>
    <h1>Sign Up</h1>
    <p class="footer-text">Already have an account? <a href="#">Log in</a></p>
    <div class="social-buttons">
        <button class="social-button facebook">Sign up with Facebook</button>
        <button class="social-button google">Sign up with Google</button>
    </div>
    <div class="email-section">
        <input type="email" placeholder="Your email">
    </div>
    <div class="password-section">
        <input type="password" placeholder="Your password">
    </div>
    <button>Sign Up</button>
    <p class="footer-text">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
</div>
</body>
</html>
"""

paragraph.AppendHTML(htmlString)
imageStream = document.SaveImageToStreams(0, ImageType.Bitmap)
with open("HtmlToImage2.png",'wb') as imageFile:
    imageFile.write(imageStream.ToArray())
document.Close()
