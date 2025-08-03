import os
from flask import render_template, request, redirect, url_for
from app import app

# Sample photo data for the gallery
PHOTOS = [
    {
        'id': 1,
        'title': 'Attitude',
        'description': 'Your attitude to life is what makes you so specal and unique .',
        'image': '/static/images/p1.jpg'
    },
    {
        'id': 2,
        'title': 'Confidence',
        'description': 'Such strong confidence makes me jealous , It is inspiring to me ',
        'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop&crop=center'
    },
    {
        'id': 3,
        'title': 'Social skills',
        'description': 'Something that i would have loved to have , but i would like to learn it from you in our journey together',
        'image': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=700&fit=crop&crop=center'
    },
    {
        'id': 4,
        'title': 'Cutness',
        'description': "With such skills you still manage to be so cute and adorable . IT's amazing .",
        'image': 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=700&fit=crop&crop=center'
    },
    {
        'id': 5,
        'title': 'Uniqueness',
        'description': 'Among all your qualities , this is most attractive to me . You are so unique and special .',
        'image': '/static/images/p2.jpg'
    }
]

# Romantic welcoming messages
WELCOME_MESSAGES = [
    "You are the light that brightens my darkest days",
    "Every moment with you feels like a beautiful dream",
    "Your love is the magic that makes life extraordinary",
    "In your eyes, I see my forever and always",
    "You are my heart's greatest treasure"
]

@app.route('/')
def home():
    # Load hearts SVG for the floating animation
    with open('static/images/hearts.svg', 'r') as f:
        hearts_svg = f.read()
    return render_template('home.html', messages=WELCOME_MESSAGES, hearts_svg=hearts_svg)

@app.route('/gallery')
def gallery():
    return render_template('gallery.html', photos=PHOTOS)

@app.route('/proposal')
def proposal():
    # Get phone number from environment or use default
    phone_number = os.environ.get('WHATSAPP_NUMBER', '9266327439')
    return render_template('proposal.html', phone_number=phone_number)
