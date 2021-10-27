import pandas as pd
import numpy as np

full_data = pd.read_csv("roto_scrape.csv", sep = ';', index_col=0)

data_2021 = full_data[full_data['Year'] == 2021]

dk_cumpoints = data_2021.groupby('Name').apply(lambda grp: np.cumsum(grp.sort_values('Week')[['DK points']])).reset_index()
dk_cumpoints = dk_cumpoints.drop('Name', axis=1).rename({'DK points': 'DK_cum_points'}, axis=1)

DK_cumulative = pd.merge(data_2021, dk_cumpoints, left_index=True, right_on='level_1')

DK_cumulative['Bool'] = [1 if x > 0 else 0 for x in DK_cumulative['DK points']]

DK_cumulative['Games Played'] = DK_cumulative.groupby('Name')['Bool'].cumsum()

DK_cumulative['Average DK Points'] = DK_cumulative['DK_cum_points'] / DK_cumulative['Games Played']

DK_cumulative.to_csv('DK_avg_points.csv', sep=';', encoding='utf-8')
