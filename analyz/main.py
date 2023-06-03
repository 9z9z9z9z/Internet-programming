import json

with open("analyz/git-stats.json", "r", encoding="utf-8") as file:
    data = json.load(file)

data_python = []
data_js = []
data_java = []

for item in data:
    if item["name"] == "Java":
        data_java.append(item)
    elif item["name"] == "Python":
        data_python.append(item)
    elif item["name"] == "JavaScript":
        data_js.append(item)
del data

with open("analyz/git-stats-java.json", "w", encoding="utf-8") as file:
    json.dump(data_java, file)
with open("analyz/git-stats-python.json", "w", encoding="utf-8") as file:
    json.dump(data_python, file)
with open("analyz/git-stats-js.json", "w", encoding="utf-8") as file:
    json.dump(data_js, file)

print("==")
