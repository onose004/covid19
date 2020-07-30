from neo4jrestclient.client import GraphDatabase
from neo4jrestclient import client
import json
import hashlib
import pandas as pd
import re
import io
import datetime



def char_full_to_half(text):
    return text.translate(str.maketrans({chr(0xFF01 + i): chr(0x21 + i) for i in range(94)}))


def analyze_note(note):
    bins = str(note).split("県")
    obj = {}
    pref_name = ""
    for item in bins:
        person_search = re.findall(r'[0-9]+例目', item)
        if person_search:
            if pref_name is "":
                continue
            obj[pref_name] += person_search
        pref_search = re.search(r'愛知|岐阜', item)
        if pref_search:
            pref_name = pref_search.group()
            if pref_name not in obj.keys():
                obj[pref_name] = []

    person_list = []
    for pref_name in obj.keys():
        for case_idx in obj[pref_name]:
            person = f"{pref_name}_{case_idx}"
            person_list.append(person)

    return person_list


def analyze_attr(attr):
    obj = {"loc": None, "foreign_history": None, "foreigner": None,
            "sex": None, "age": None}
    address_search = re.findall(r'.*在住', attr)
    if address_search:
        obj["loc"] = address_search[0]
    foreign_travel_search = re.findall(r'帰国|渡航', attr)
    if foreign_travel_search: 
        obj["foreign_history"] = True
    foreigner_seaerch = re.findall(r'籍', attr)
    if foreigner_seaerch:
        obj["foreigner"] = True
    sex_search = re.findall(r'男性|女性', attr)
    if sex_search:
        obj["sex"] = sex_search[0]
    age_search = re.findall(r'\([0-9]+.*\)', attr)
    if age_search:
        obj["age"] = age_search[0].replace('(', '').replace(')', '')
    
    return(obj)
        
def analyze_date(date):
    date = str("2020年" + date)
    date_dt = datetime.datetime.strptime(date, '%Y年%m月%d日')
    return date_dt.strftime('%Y-%m-%d')

def to_cypher(literal):
    if literal is None:
        return '"情報なし"'
    if literal is True:
        return '"はい"'
    if literal is False:
        return '"いいえ"'
    return f'"{literal}"'

def enum(pref):
    return int(pref.replace("愛知", "1").replace("岐阜", "2"))

def test(clean=True):
    url = "http://neo4j:pass@localhost:7474/db/data/"
    gdb = GraphDatabase(url)
    if clean:
        gdb.query("MATCH (a) DETACH DELETE a", data_contents=True)

    with open("./migration/data/debug.csv", "r") as csv:
        with io.StringIO() as f:
            for line in csv:
                f.write(char_full_to_half(line))
            text = f.getvalue()
        with io.StringIO(text) as f:
            df = pd.read_csv(f, header=None)

    df.columns = ["idx", "date", "attr", "note", "misc"]

    route_tag_list_all = []

    for index, row in df.iterrows():
        note_str = row['note']
        route_tag_list = analyze_note(note_str)
        route_tag_list_all = route_tag_list_all + route_tag_list 
        attr_obj = (analyze_attr(str(row['attr'])))
        date_str = analyze_date(row['date'])
        case_pref = "愛知"
        case_tag = f"{case_pref}_{row['idx']}"

        q = (
                f'MERGE (c:Case {{tag: "{case_tag}"}}) \n'
                f'MERGE (pc:Pref {{tag: "{case_pref}"}}) \n'
                f'MERGE (c)-[:TESTED_AT]->(pc) \n'
                f'SET c.note={to_cypher(note_str)} \n'
                f'SET c.date=date("{date_str}") \n'
                f'SET c.foreign_history={to_cypher(attr_obj["foreign_history"])} \n'
                f'SET c.sex={to_cypher(attr_obj["sex"])} \n'
                f'SET c.foreigner={to_cypher(attr_obj["foreigner"])} \n'
                f'SET c.loc={to_cypher(attr_obj["loc"])} \n'
                f'SET c.age={to_cypher(attr_obj["age"])} \n'

                f'SET c.community={enum(case_pref)} \n'
                f'SET c.infected_to=0 \n'
            )
        gdb.query(q)

        for route_tag in route_tag_list:
            route_pref = route_tag.split('_')[0]
            q = (
                    f'MERGE (c:Case {{tag: "{case_tag}"}}) \n'
                    f'MERGE (r:Case {{tag: "{route_tag}"}}) \n'
                    f'MERGE (pr:Pref {{tag: "{route_pref}"}}) \n'
                    f'MERGE (r)-[:CONTACTED]->(c) \n'
                    f'MERGE (r)-[:TESTED_AT]->(pr) \n'

                    f'SET r.community={enum(route_pref)} \n'
                    f'SET r.infected_to=0 \n'
                )
            gdb.query(q)

    for route_tag in list(set(route_tag_list_all)):
        q = (
                f'MERGE (r {{tag: "{route_tag}"}})-[e:CONTACTED]->(c) \n'
                f'WITH COUNT(e) as cnt \n'
                f'MERGE (r {{tag: "{route_tag}"}})-[e:CONTACTED]->(c) \n'
                f'WITH cnt, r \n'
                f'SET r.infected_to=cnt \n'
            )

        gdb.query(q)


test()
