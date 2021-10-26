from bs4 import BeautifulSoup
import requests
import pandas as pd
import numpy as np
import re

urls = []
platform = ['fd','dk','yh']
for plat in platform: # iterate through urls by filling text string
    for year in range(17,22):
        if year <=20: #Iterate through all 18 weeks of the season
            for week in range (1,18):
                url = f'http://rotoguru1.com/cgi-bin/fyday.pl?week={week}&year=20{year}&game={plat}&scsv=1'
                urls.append(url)
        else:
            for week in range (1,8):#Since the 2021 season is in progress there is only 7 weeks of data available
                url = f'http://rotoguru1.com/cgi-bin/fyday.pl?week={week}&year=20{year}&game={plat}&scsv=1'
                urls.append(url)

df_fd = pd.DataFrame() # create empty dataframes for each seperate platform
df_dk = pd.DataFrame()
df_yh = pd.DataFrame()

headers = {'User-Agent':
           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
}

for url in urls:

    response = requests.get(url, headers = headers)
    text = BeautifulSoup(response.text, 'html.parser')

    if response.status_code != 200:
        raise Exception(f'The status code is not 200! It is {response.status_code}.')

    csv_data = text.find('pre').string

    df = pd.DataFrame([x.split(';') for x in csv_data.split('\n')]) #create temporary dataframe with the specific url info to concat onto full dataframe

    if re.search('fd', url) != None: #search url for the platform and load into platform specific dataframe
        df_fd = pd.concat([df_fd, df[1:]], axis = 0) #skip first row with column names when concatenating
    elif re.search('dk', url) != None:
        df_dk = pd.concat([df_dk, df[1:]], axis = 0)
    elif re.search('yh', url) != None:
        df_yh = pd.concat([df_yh, df[1:]], axis = 0)
    else:
        raise ValueError('URL not found!')

df_dk.columns =['Week', 'Year', 'GID', 'Name', 'Pos', 'Team', 'h/a', 'Oppt', 'DK points', 'DK salary'] #add back column names for each dataframe
df_fd.columns =['Week', 'Year', 'GID', 'Name', 'Pos', 'Team', 'h/a', 'Oppt', 'FD points', 'FD salary']
df_yh.columns =['Week', 'Year', 'GID', 'Name', 'Pos', 'Team', 'h/a', 'Oppt', 'YH points', 'YH salary']

df_dk = df_dk.drop(['GID','Team', 'h/a', 'Oppt'], axis = 1) #drop column names from DraftKings and Yahoo Sports dataframes that will not be used to merge
df_yh = df_yh.drop(['GID','Team', 'h/a', 'Oppt'], axis = 1)

df_fd = pd.merge(df_fd, df_dk, how='inner', on =['Week','Year','Name', 'Pos'])#merge DraftKings dataframe information into the FanDuel dataframe
df_fd = pd.merge(df_fd, df_yh, how='inner', on =['Week','Year','Name', 'Pos'])#merge Yahoo Sports dataframe information into the FanDuel dataframe

df_fd.to_csv('roto_scrape.csv', sep=';', encoding='utf-8')
