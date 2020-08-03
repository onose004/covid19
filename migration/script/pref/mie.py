import pandas as pd
import requests
import io
import os 
import logging
from ._base import BaseDataloader
import pandas as pd

logging.basicConfig(level=logging.INFO)

class Mie(BaseDataloader):
    def pref_name(self):
        return "三重"
    def pref_id(self):
        return "mie"
    def fetch(self):
        url = "https://www.pref.mie.lg.jp/common/content/000896797.csv"
        if self.csv_exists():
            return
        res = requests.get(url)
        self.logger.info(f"Fetching data from {url}")
        with open(self.csv_path, "wb") as f:
            f.write(res.content.decode('shift-jis').encode('utf-8'))
        self.logger.info(f"Fetch completed and saved: {self.csv_path}")
        pass
