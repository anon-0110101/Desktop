from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

def create_tables():
    with app.app_context():
        db.create_all()

@app.route("/home")
def home():
    products = Product.query.all()
    return render_template('index.html', products=products)

@app.route('/coupons')
def coupons():
    discounts = {
        'fruit_discounts': [
            {'name': 'Apples', 'discount': '20%'},
            {'name': 'Bananas', 'discount': '15%'}
        ],
        'bread_discounts': [
            {'name': 'Whole Wheat Bread', 'discount': '10%'},
            {'name': 'White Bread', 'discount': '5%'}
        ],
        'meat_discounts': [
            {'name': 'Chicken', 'discount': '25%'},
            {'name': 'Beef', 'discount': '30%'}
        ],
        'product_discounts': [
            {'name': 'Toothpaste', 'discount': '10%'},
            {'name': 'Shampoo', 'discount': '15%'}
        ]
    }
    
    weekly_schedule = {
        'Monday': discounts['fruit_discounts'],
        'Tuesday': discounts['bread_discounts'],
        'Wednesday': discounts['meat_discounts'],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': discounts['product_discounts']
    }
    
    return render_template('coupons.html', weekly_schedule=weekly_schedule)

@app.route("/promotions")
def promotions():
    return render_template('promotions.html')

@app.route("/services")
def services():
    return render_template('services.html')

@app.route("/proveedores")
def proveedores():
    return render_template('proveedores.html')

if __name__ == "__main__":
    create_tables()
    app.run(debug=True)
