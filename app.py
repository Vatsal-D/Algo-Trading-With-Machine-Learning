import plotly.graph_objects as go
import pandas as pd
from datetime import datetime
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the start date and end date from the form
        start_date_input = request.form['start_date']
        end_date_input = request.form['end_date']

        # Read the data from the CSV file
        df = pd.read_csv('predicted.csv')

        # Convert the 'Date' column to datetime
        df['Date'] = pd.to_datetime(df['Date'])

        # Convert input strings to datetime
        start_date = datetime.strptime(start_date_input, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_input, '%Y-%m-%d')

        # Filter the dataframe based on the input dates
        filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]

        # Create the candlestick graph
        fig = go.Figure(data=[go.Candlestick(x=filtered_df['Date'],
                                            open=filtered_df['Open'],
                                            high=filtered_df['High'],
                                            low=filtered_df['Low'],
                                            close=filtered_df['Close'])])

        fig.update_layout(xaxis_rangeslider_visible=False)
        graph = fig.to_html(full_html=False)

        return render_template('index.html', graph=graph)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
