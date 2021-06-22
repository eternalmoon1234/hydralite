from requests import get

tags = []

for i in range(1, 101):
  res = get(f'https://api.stackexchange.com/2.2/tags?page={i}&order=desc&sort=popular&site=stackoverflow').json()
  for item in res['items']:
    tags.append(item['name'])
  print(i)

with open('tags.txt', 'w+') as f:
  for tag in tags:
    f.write(f'{tag}\n')