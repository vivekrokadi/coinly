const bit = document.getElementById("bitcoin");
const eth = document.getElementById("ethereum");
const doge = document.getElementById("dogecoin");
const bnb = document.getElementById("binance");
const xrp = document.getElementById("xrp");

const biturl =
  "https://data.messari.io/api/v1/assets/bitcoin/metrics/market-data?currency=inr";
const ethurl =
  "https://data.messari.io/api/v1/assets/ethereum/metrics/market-data?currency=inr";
const dogeurl =
  "https://data.messari.io/api/v1/assets/dogecoin/metrics/market-data?currency=inr";
const bnburl =
  "https://data.messari.io/api/v1/assets/binance-coin/metrics/market-data?currency=inr";
const xrpurl =
  "https://data.messari.io/api/v1/assets/xrp/metrics/market-data?currency=inr";

console.log("Fetching data...");

async function fetchPrice() {
  try {
    const [bitresponse, ethresponse, dogeresponse, bnbresponse, xrpresponse] =
      await Promise.all([
        fetch(biturl),
        fetch(ethurl),
        fetch(dogeurl),
        fetch(bnburl),
        fetch(xrpurl),
      ]);

    if (
      !bitresponse.ok ||
      !ethresponse.ok ||
      !dogeresponse.ok ||
      !bnbresponse.ok ||
      !xrpresponse.ok
    ) {
      throw new Error("Error fetching one of the APIs.");
    }

    const bitdata = await bitresponse.json();
    const ethdata = await ethresponse.json();
    const dogedata = await dogeresponse.json();
    const bnbdata = await bnbresponse.json();
    const xrpdata = await xrpresponse.json();

    console.log("Bitcoin Data:", bitdata);
    console.log("Ethereum Data:", ethdata);
    console.log("Dogecoin Data:", dogedata);
    console.log("Binance Coin Data:", bnbdata);
    console.log("XRP Data:", xrpdata);

    bit.textContent =
      "$" +
      (bitdata.data.market_data.price_usd || "Unavailable").toLocaleString();
    eth.textContent =
      "$" +
      (ethdata.data.market_data.price_usd || "Unavailable").toLocaleString();
    doge.textContent =
      "$" +
      (dogedata.data.market_data.price_usd || "Unavailable").toLocaleString();
    bnb.textContent =
      "$" +
      (bnbdata.data.market_data.price_usd || "Unavailable").toLocaleString();
    xrp.textContent =
      "$" +
      (xrpdata.data.market_data.price_usd || "Unavailable").toLocaleString();
  } catch (error) {
    console.error("Error fetching prices:", error);
    bit.textContent = "Error fetching data";
    eth.textContent = "Error fetching data";
    doge.textContent = "Error fetching data";
    bnb.textContent = "Error fetching data";
    xrp.textContent = "Error fetching data";
  }
}

fetchPrice();
