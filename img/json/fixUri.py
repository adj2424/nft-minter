import json
# appended all 100 image uris' to a new base uri
cid = 'bafybeieourdi7wzsc6g357ekbxe3fhw3mfg4uzgjzidwchxv2e54vi5luq'
for i in range(1, 101): 
    f = open(f'{i}.json')
    data = json.load(f)
    data['image'] = data['image'].replace('NewUriToReplace', cid)
    with open(f'{i}.json', 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False, indent=4)
