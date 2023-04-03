import json
# appended all 100 image uris' to a new base uri
cid = 'bafybeiez5abohaxwpnzgdfub5keayojbfpx7wwr7nsaqef7aqe6pilf63y'
for i in range(1, 101): 
    f = open(f'{i}.json')
    data = json.load(f)
    data['image'] = data['image'].replace('NewUriToReplace', cid)
    with open(f'{i}.json', 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False, indent=4)
