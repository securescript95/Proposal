import os
from flask import Flask

# create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "romantic-love-secret-key-2024")

# Import routes
from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
