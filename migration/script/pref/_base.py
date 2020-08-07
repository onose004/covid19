import os 
import requests
import datetime
import logging
import pandas as pd
from abc import abstractmethod
from contextlib import contextmanager

class BaseDataloader(object):
    def __init__(self):
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        self.download_path = os.path.join(f"./download/{date_str}")
        if not os.path.exists(self.download_path):
            os.makedirs(self.download_path)
        self.logger = logging.getLogger(__name__)
        self.df = None
        self.csv_path = os.path.join(self.download_path, f"{self.pref_id}.csv")

    def csv_exists(self):
        if os.path.exists(self.csv_path):
            self.logger.info(f"Already exists: {self.csv_path}")
            return True
        else:
            self.logger.info(f"Doesn't exist: {self.csv_path}")
            return False

    def load_csv(self):
        if self.df is None:
            self.df = pd.read_csv(self.csv_path)
        return self.df

    @property
    @abstractmethod
    def pref_id(self):
        raise NotImplementedError()

    @property
    @abstractmethod
    def pref_name(self):
        raise NotImplementedError()

    @abstractmethod
    def fetch(self):
        raise NotImplementedError()

    @abstractmethod
    def __len__(self):
        raise NotImplementedError()

    @abstractmethod
    def __getitem__(self, idx):
        raise NotImplementedError()

class BaseCase():
    def __init__(
            self,
            tag=None,
            date=None,
            sex=None,
            address=None,
            nationality=None,
            note=None,
            contact_tags=[],
            age=None,
            pref=None,
            ):
        self.tag = tag
        self.date = date
        self.sex = sex
        self.address = address
        self.nationality = nationality
        self.note = note
        self.contact_tags = contact_tags
        self.age = age
        self.pref = pref

        self.enum_sex = 0
        self.enum_age = 0
        self.enum_address = 0
        self.enum_nationality = 0
        self.enum_pref = 0
        pass

    @staticmethod
    def to_cypher(literal):
        if literal is None:
            return '"情報なし"'
        if literal is "nan":
            return '"情報なし"'
        if literal is True:
            return '"はい"'
        if literal is False:
            return '"いいえ"'
        return f'"{literal}"'

    def get_node_query(self):
        q = (
            f'MERGE (c:Case {{tag: "{self.tag}"}}) \n'
            f'MERGE (pc:Pref {{tag: "{self.pref}"}}) \n'
            f'MERGE (c)-[:TESTED_AT]->(pc) \n'
            f'SET c.note={self.to_cypher(self.note)} \n'
            f'SET c.date=date("{self.date}") \n'
            f'SET c.date_label="{datetime.datetime.strptime(self.date, "%Y-%m-%d").strftime("%m/%d")}" \n'
            )
        for pi in ["age", "pref", "nationality", "sex", "address"]:
            q += (
                f'SET c.{pi}={self.to_cypher(eval("self." + pi))} \n'
                f'SET c._enum_{pi}={eval("self.enum_" + pi)} \n'
                )
        return q

    def get_edge_query(self, idx):
        if idx > len(self.contact_tags):
            raise ValueError
        tag = self.contact_tags[idx]
        q = (
            f'MERGE (c:Case {{tag: "{self.tag}"}}) \n'
            f'MERGE (r:Case {{tag: "{tag}"}}) \n'
            f'MERGE (r)-[:CONTACTED]->(c) \n'
            )
        return q

    def get(self):
        return (
            self.tag,
            self.date,
            self.age,
            self.enum_age,
            self.sex,
            self.enum_sex,
            self.address,
            self.enum_address,
            self.nationality,
            self.enum_nationality,
            self.note,
            self.contact_tags,
            )
