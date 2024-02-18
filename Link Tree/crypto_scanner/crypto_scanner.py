from pycoingecko import CoinGeckoAPI
import pandas as pd
cg = CoinGeckoAPI()
top_10_coins = cg.get_coins_markets(vs_currency='usd', order='market_cap_desc', per_page=10, page=1)
df = pd.DataFrame(top_10_coins)
df = df[['id', 'current_price', 'price_change_percentage_24h']]
print(df)
