from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from .serializers import ChartSerializer
from .models import ChartArray
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd

class Sentiment(generics.RetrieveAPIView):

    def get(self, request, format=None):
        ticker = request.GET.get('q', '')
        #ticker = 'TSLA'
        fin_url = 'https://finviz.com/quote.ashx?t=' + ticker
        news_tables = {}

        req = Request(url=fin_url, headers={'user-agent': 'my-app'})
        response = urlopen(req)
        html = BeautifulSoup(response, 'html.parser')
        news_table = html.find(id = 'news-table')
        news_tables[ticker] = news_table
        
        parsed_data = []

        for ticker,news_table in news_tables.items():
            for row in news_table.findAll('tr'):
                title = row.a.text
                date_data = row.td.text.split(' ')

                if len(date_data) == 1:
                    time = date_data[0]
                else:
                    date = date_data[0]
                    time = date_data[1]
                parsed_data.append([ticker, date, time, title])
        df = pd.DataFrame(parsed_data, columns=['ticker', 'date', 'time', 'title'])
        vader = SentimentIntensityAnalyzer()
        f = lambda title: vader.polarity_scores(title)['compound']
        df['compound'] = df['title'].apply(f)
        mean = df['compound'].mean()
        compound_array = df['compound']
        datearray = df['date']
        chartarray = ChartArray(date=datearray, compound=compound_array)
        r = ChartSerializer(chartarray).data
        #r["Access-Control-Allow-Origin"] = "*"

        return Response(r, status=status.HTTP_200_OK)

# Create your views here.
def main(request):
    return HttpResponse('<h1>Hello</h1>')