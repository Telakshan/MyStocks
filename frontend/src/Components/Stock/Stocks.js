import React, { useState } from "react";
import axios from "axios";
//import "bootstrap/dist/css/bootstrap.min.css";
import StockChart from "./StockChart";
import BarChart from "./BarChart";
import Card from "../Card/Card";
import "./Stock.css";

const Stocks = () => {
  let [stockXValues, setXValues] = useState([]);
  let [stockYValues, setYValues] = useState([]);
  let [sentimentXValue, setSentimentXValue] = useState([]);
  let [sentimentYValue, setSentimentYValue] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [links, setLinks] = useState([]);

  let tickerMatch = {
    gme: "gamestop",
    msft: "microsoft",
    aapl: "apple",
    amc: "amc",
    tsla: "tesla",
    gm: "generalmotors",
    fb: "facebook",
    bb: "blackberry",
    amzn: "amazon",
    pltr: "palantir",
    slv: "silver",
    dis: "disney",
    twtr: "twitter",
    nflx: "netflix",
    atos: "atossa therapeutics",
    amd: "amd",
    gpro: "gopro",
    sbux: "starbucks",
    baba: "alibaba",
    f: "ford",
    nio: "nio",
    goog: "google",
    hpq: "hp"
  };

  const Search = () => {
    const API_KEY = "2YMUA51JFBIJ7E6X";
    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${searchTerm}&outputsize=compact&apikey=${API_KEY}`;

    let stockX = [];
    let stockY = [];
    axios
      .get(API_CALL)
      .then((res) => {
        for (let key in res.data["Time Series (Daily)"]) {
          stockX.unshift(key);
          stockY.unshift(res.data["Time Series (Daily)"][key]["1. open"]);
        }

        setXValues(stockX);
        setYValues(stockY);
      })
      .catch((error) => console.error(error));
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(tickerMatch[searchTerm.toLowerCase()]);
    const NEWS_API = `https://newsapi.org/v2/everything?q=${
      tickerMatch[searchTerm.toLowerCase()]
    }&from=${today}&sortBy=popularity&apiKey=bf0be14eb79f4aad8c4108fc7311b303`;
    
    let news = [];
    let links = [];
    axios.get(NEWS_API).then((res) => {
      console.log(res.data);
      for (let i in res.data.articles) {
        news.push(res.data.articles[i]);
        links.push(res.data.articles[i].url);
      }

      setNews(news);
      setLinks(links);
    });
  };

  const onChange = (n) => {
    setSearchTerm(n.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    Search();
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors",
      };
      fetch(
        `https://ancient-sea-50766.herokuapp.com/api/sentiment/?q=${searchTerm.toUpperCase()}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setSentimentXValue(data.date.reverse());
          setSentimentYValue(data.compound);
        });
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="stock">
      <form className="search" onSubmit={(e) => onSubmit(e)}>
        <h1>Enter ticker to begin</h1>
        <input
          className="search-box"
          type="text"
          value={searchTerm}
          name="searchTerm"
          placeholder="Enter ticker here"
          onChange={(n) => onChange(n)}
        />

        <button type="submit" className="btn">
          Enter
        </button>
      </form>
      <h1 className="stock-title">Stock data for {searchTerm.toUpperCase()}</h1>

      <StockChart
        x={stockXValues}
        y={stockYValues}
        label={searchTerm.toUpperCase()}
      />

      <h4 className="sent-title">
        Sentiment Analysis of recent headlines for {tickerMatch[searchTerm]}
      </h4>
      <p className='sub-text'> Scores above zero are positive sentiment, below zero are negative</p>
      <BarChart x={sentimentXValue} y={sentimentYValue}/>

      <footer className='footer'>
        <p>Developed by Thilakshan Baskaran</p>
        <p>Thanks for checking it out!</p>
      </footer>
      <Card
        headlines={news}
        links={links}
        name={tickerMatch[searchTerm.toLowerCase()]}
      />
    </div>
  );
};

export default Stocks;
