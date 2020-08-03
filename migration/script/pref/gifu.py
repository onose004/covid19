import pandas as pd
import requests
import io
import os 
import logging
from ._base import BaseDataloader

logging.basicConfig(level=logging.INFO)

class Gifu(BaseDataloader):
    def pref_name(self):
        return "岐阜"
    def pref_id(self):
        return "gifu"
    def fetch(self):
        url = "https://data.gifu-opendata.pref.gifu.lg.jp/dataset/4661bf9d-6f75-43fb-9d59-f02eb84bb6e3/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80/download/210005gifucovid19patients.csv"
        if self.csv_exists():
            return
        res = requests.get(url)
        self.logger.info(f"Fetching data from {url}")
        with open(self.csv_path, "wb") as f:
            f.write(res.content.decode('shift-jis').encode('utf-8'))
        self.logger.info(f"Fetch completed and saved: {self.csv_path}")
        pass
