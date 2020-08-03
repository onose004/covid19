import pandas as pd
import requests
import io
import os 
import re
import logging
from ._base import BaseDataloader, BaseCase

logging.basicConfig(level=logging.INFO)

class Aichi(BaseDataloader):
    def __init__(self):
        super().__init__()
        self._enum_sex = {"情報なし": 0}
        self._enum_age = {"情報なし": 0}
        self._enum_address = {"情報なし": 0}
        self._enum_nationality = {"情報なし": 0}

    @property
    def pref_name(self):
        return "愛知"

    @property
    def pref_id(self):
        return "aichi"

    def fetch(self):
        url = "http://linkdata.org/api/1/rdf1s8260i/Infected_document_aichi.csv"
        if self.csv_exists():
            return
        res = requests.get(url)
        self.logger.info(f"Fetching data from {url}")
        with open(self.csv_path, "wb") as f:
            f.write(res.content)
        self.logger.info(f"Fetch completed and saved: {self.csv_path}")
        return

    def __len__(self):
        df = self.load_csv()
        return df.shape[0]

    def get_enum(self, obj, key):
        if key is None:
            return 0
        if key in obj.keys():
            return int(obj[key])
        
        ind = max([obj[k] for k in obj.keys()]) + 1
        obj[key] = ind
        return ind

    def __getitem__(self, idx):
        df = self.load_csv()
        obj = df.iloc[idx]

        case = BaseCase(
            tag=f'愛知{obj["Infected_document_aichi"]}',
            date=obj["発表日"],
            pref="愛知",
            )
        case.enum_pref = 1

        # sex
        sex_search = re.findall(r'男性|女性', obj["年代・性別"])
        if sex_search:
            case.sex = sex_search[0]
            case.enum_sex = self.get_enum(self._enum_sex, case.sex)

        # age
        age_search = re.findall(r'[0-9]+', obj["年代・性別"])
        if age_search:
            if "未満" in obj["年代・性別"]:
                case.age = age_search[0] + "歳代"
            else:
                case.age = age_search[0] + "歳代"
            case.enum_age = self.get_enum(self._enum_age, case.age)

        if type(obj["国籍"]) is not float:
            case.nationality = obj["国籍"]
            case.enum_nationality = self.get_enum(self._enum_nationality, obj["国籍"])

        if type(obj["住居地"]) is not float:
            case.address = obj["住居地"]
            case.enum_address = self.get_enum(self._enum_address, obj["住居地"])

        if type(obj["接触状況"]) is not float:
            case.note = f'接触状況: {obj["接触状況"]}'
        else:
            case.note = ""

        if type(obj["備考"]) is not float:
            case.note = case.note + f' 備考:{obj["備考"]}'

        # contact
        contact_range_search = re.findall(r'[0-9]+~[0-9]+', str(obj["接触状況"]))
        if contact_range_search:
            for ci in contact_range_search:
                bins = ci.split('~')
                tags = [f"愛知{x}" for x in list(range(int(bins[0]), int(bins[1]) + 1))]
                case.contact_tags = case.contact_tags + tags

        
        contact_id_search = re.sub(r'[0-9]+~[0-9]+', '', str(obj["接触状況"]))
        contact_id_search = re.findall(r'[0-9]+', (contact_id_search))

        if contact_id_search:
            tags = [f"愛知{x}" for x in contact_id_search]
            case.contact_tags = case.contact_tags + tags


        return case
    



