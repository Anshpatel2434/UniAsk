import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Initialise environment variables
load_dotenv()

app_password = os.environ.get("APP_PASSWORD")

def sendMail(email,code):
    sender_email = "anshpatel2434@gmail.com"

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = 'Uni-Ask Code Verification'

    body ='<h2>Your Uni-Ask Signup Verification Code is : <h1><center>'+str(code)+'</center></h1></h2>'
    message.attach(MIMEText(body, 'html'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email,email, message.as_string())

    print("Email sent successfully!")