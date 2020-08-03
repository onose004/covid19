from pref import dataloader

for pref_id in dataloader.keys():
    dl = dataloader[pref_id]
    dl.fetch()
