import json
# appended all 100 image uris' to a new base uri
cid = 'bafybeihindw3bp6mimufny6bj7csisbbayz76yb7yd3me7bzli5nl2ybxi'
for i in range(1, 101): 
    f = open(f'{i}.json')
    data = json.load(f)
    data['image'] = data['image'].replace('NewUriToReplace', cid)
    with open(f'{i}.json', 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False, indent=4)