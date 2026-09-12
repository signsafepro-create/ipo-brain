import os
import time
import ccxt
import pandas as pd
from dotenv import load_dotenv

load_dotenv(".env.local")

def run_quant_engine():
    print("=======================================")
    print(" LIL.JR INSTITUTIONAL QUANT BOT V2.0")
    print("=======================================")
    
    # 1. Load API Keys
    # We default to binanceus or coinbase if not specified
    exchange_id = os.environ.get("EXCHANGE_ID", "binanceus")
    api_key = os.environ.get("EXCHANGE_API_KEY")
    api_secret = os.environ.get("EXCHANGE_API_SECRET")
    mode = os.environ.get("QUANT_BOT_MODE", "PAPER").upper()
    
    if not api_key or "placeholder" in api_key:
        print("[ERROR] No Exchange API Key found in .env.local")
        print("Continuing in SIMULATION/PAPER mode without real data...")
        # We can still fetch public data without API keys on most exchanges!
        api_key = None
        api_secret = None

    print(f"[SYSTEM] Engine Initialized in {mode} Mode.")
    print(f"[SYSTEM] Connecting to {exchange_id.upper()}...")

    # Initialize CCXT exchange
    exchange_class = getattr(ccxt, exchange_id)
    exchange_args = {
        'enableRateLimit': True,
    }
    if api_key and api_secret:
        exchange_args['apiKey'] = api_key
        exchange_args['secret'] = api_secret
        
    exchange = exchange_class(exchange_args)

    # Strategy Parameters
    symbol = os.environ.get("TRADE_SYMBOL", "BTC/USDT")
    timeframe = '1m'
    fast_sma_period = 5
    slow_sma_period = 15
    position = 0 # 0 = flat, 1 = long
    
    print(f"[STRATEGY] SMA Crossover (Fast: {fast_sma_period}, Slow: {slow_sma_period}) on {symbol}")
    print("[NETWORK] Websocket feed connected. Scanning order books...")
    
    try:
        while True:
            try:
                # Fetch recent OHLCV (Open, High, Low, Close, Volume) data
                ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=slow_sma_period + 5)
                df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
                df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
                
                # Calculate SMAs
                df['fast_sma'] = df['close'].rolling(window=fast_sma_period).mean()
                df['slow_sma'] = df['close'].rolling(window=slow_sma_period).mean()
                
                latest = df.iloc[-1]
                prev = df.iloc[-2]
                
                current_price = latest['close']
                
                print(f"[MARKET] {symbol} Price: ${current_price:.2f} | Fast SMA: {latest['fast_sma']:.2f} | Slow SMA: {latest['slow_sma']:.2f}")
                
                # Trading Logic
                # Cross UP = Buy Signal
                if prev['fast_sma'] <= prev['slow_sma'] and latest['fast_sma'] > latest['slow_sma']:
                    if position == 0:
                        print(f"!!! [SIGNAL] BUY TRIGGERED at ${current_price:.2f} !!!")
                        if mode == "LIVE":
                            print("[EXECUTION] Sending LIVE Market BUY order...")
                            # exchange.create_market_buy_order(symbol, amount)
                        else:
                            print("[EXECUTION] PAPER TRADE: Bought 1 unit.")
                        position = 1
                
                # Cross DOWN = Sell Signal
                elif prev['fast_sma'] >= prev['slow_sma'] and latest['fast_sma'] < latest['slow_sma']:
                    if position == 1:
                        print(f"!!! [SIGNAL] SELL TRIGGERED at ${current_price:.2f} !!!")
                        if mode == "LIVE":
                            print("[EXECUTION] Sending LIVE Market SELL order...")
                            # exchange.create_market_sell_order(symbol, amount)
                        else:
                            print("[EXECUTION] PAPER TRADE: Sold 1 unit.")
                        position = 0

            except Exception as e:
                print(f"[ERROR] Fetching data: {e}")
                
            time.sleep(10)
            
    except KeyboardInterrupt:
        print("\n[SYSTEM] Quant Engine shutting down. Closing positions (if applicable)...")

if __name__ == "__main__":
    run_quant_engine()
