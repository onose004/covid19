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
    gdb.query(f'MATCH (c:Case) SET c.n_child=0, c.n_descendant=0')
    q = (
        f'MATCH (r:Case)-[ec:CONTACTED]->(cc:Case) \n'
        f'MATCH (r)-[ed:CONTACTED*1..]->(cd:Case) \n'
        f'RETURN r.tag, COUNT(DISTINCT cc), COUNT(DISTINCT cd)'
        )
    results = gdb.query(q, data_contents=True)
    for row in tqdm(results, desc="Analyze edge"):
        tag, n_child, n_descendant = tuple(row)
        q = (
                f'MATCH (c:Case) \n'
                f'WHERE c.tag="{tag}" \n'
                f'SET c.n_child={n_child}, \n'
                f'c.n_descendant={n_descendant} \n'
                )
        gdb.query(q)

if __name__ == '__main__':
    clean = True
    url = "http://neo4j:pass@localhost:7474/db/data/"
    gdb = GraphDatabase(url)

    if clean:
        gdb.query("MATCH (a) DETACH DELETE a", data_contents=True)

        for pref_id in dataloader.keys():
            dl = dataloader[pref_id]
            gdb.query(dl.get_data_source_query())
            for di in tqdm(range(len(dl)), desc=pref_id):
                q = (dl[di].get_node_query())
                gdb.query(q)
                for ei in range(len(dl[di].contact_tags)):
                    q = (dl[di].get_edge_query(ei))
                    gdb.query(q)

    analyze_edge(gdb)
