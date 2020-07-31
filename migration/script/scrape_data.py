from bs4 import BeautifulSoup
from urllib import request
import requests
import json
import sys
import io

def test(pref_id):
    url = "https://www.ctv.co.jp/news/json_cms/rawitems.json"
    req = requests.get(url)
    json_data = req.json()
    with io.StringIO() as f:
        for row in json_data:
            if row["data"] is None:
                continue
            if row["data"]["sectionname"] is None:
                continue
            if row["data"]["text"] is None:
                continue
            section_name = row["data"]["sectionname"]
            if section_name == f"{pref_id}_infection":
                soup = BeautifulSoup(row["data"]["text"], 'html.parser')
                tag_tr_list = soup.find_all('tr')
                for tag_tr in tag_tr_list:
                    tag_td_list = tag_tr.find_all('td')
                    for tag_td in tag_td_list:
                        col = str(tag_td.string)
                        f.write(f"{col},")
                    f.write(f"\n")
        with open(f"./data/{pref_id}.csv", "w") as csv:
            csv.write(f.getvalue())


if __name__ == '__main__':
    for pref_id in ["aichi", "mie", "gifu"]:
        test(pref_id)
