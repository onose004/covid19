from neo4jrestclient.client import GraphDatabase
from neo4jrestclient import client
import json
import hashlib
import pandas as pd
import re
import io
import datetime
from tqdm import tqdm

from pref import dataloader

def analyze_edge(gdb):
    gdb.query('MATCH (c:Case) SET c.infected_to=0')
    q = (
        f'MATCH (r:Case)-[e:CONTACTED]->(c:Case) \n'
        f'RETURN r.tag, COUNT(e)'
        )
    results = gdb.query(q, data_contents=True)
    for row in tqdm(results, desc="Analyze edge"):
        tag, count = tuple(row)
        q = (
                f'MATCH (c:Case) \n'
                f'WHERE c.tag="{tag}" \n'
                f'SET c.infected_to={count} \n'
                )
        gdb.query(q)

if __name__ == '__main__':
    clean=True
    url = "http://neo4j:pass@localhost:7474/db/data/"
    gdb = GraphDatabase(url)

    if clean:
        gdb.query("MATCH (a) DETACH DELETE a", data_contents=True)

    for pref_id in dataloader.keys():
        dl = dataloader[pref_id]
        for di in tqdm(range(len(dl)), desc=pref_id):
            q = (dl[di].get_node_query())
            gdb.query(q)
            for ei in range(len(dl[di].contact_tags)):
                q = (dl[di].get_edge_query(ei))
                gdb.query(q)

    analyze_edge(gdb)
