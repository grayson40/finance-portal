from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    stock = yf.Ticker(symbol)
    stock_data = stock.info
    return jsonify(stock_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
