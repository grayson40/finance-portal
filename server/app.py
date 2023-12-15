from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
from firebase import db

app = Flask(__name__)
CORS(app)

app.debug = True

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    stock = yf.Ticker(symbol)
    stock_data = stock.info
    return jsonify(stock_data)

@app.route('/api/stock-history', methods=['GET'])
def get_stock_history():
    symbol = request.args.get('symbol')
    stock = yf.Ticker(symbol)
    stock_history = stock.history(period="max")
    return jsonify(stock_history.to_json())

@app.route('/users/<user_id>/expenses', methods=['POST'])
def add_expense(user_id):
    # Parse the request data
    data = request.get_json()

    # Add the expense to the user's expenses in Firebase
    db.collection('users').document(user_id).collection('expenses').add(data)

    # Return the new expense
    return jsonify(data), 201

@app.route('/users/<user_id>/expenses', methods=['GET'])
def get_expenses(user_id):
    # Get the user's expenses from Firebase
    expenses = db.collection('users').document(user_id).collection('expenses').get()

    # Convert the expenses data to JSON
    expenses_data = [doc.to_dict() for doc in expenses]

    # Return the expenses data
    return jsonify(expenses_data), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0')
