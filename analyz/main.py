import json
import matplotlib.pyplot as plt


# with open("analyz/git-stats.json", "r", encoding="utf-8") as file:
#     data = json.load(file)

# for item in data:
#     if item["name"] == "Java":
#         data_java.append(item)
#     elif item["name"] == "Python":
#         data_python.append(item)
#     elif item["name"] == "JavaScript":
#         data_js.append(item)
# del data

# with open("analyz/git-stats-java.json", "w", encoding="utf-8") as file:
#     json.dump(data_java, file, indent=4)
# with open("analyz/git-stats-python.json", "w", encoding="utf-8") as file:
#     json.dump(data_python, file, indent=4)
# with open("analyz/git-stats-js.json", "w", encoding="utf-8") as file:
#     json.dump(data_js, file, indent=4)


data_python = []
data_js = []
data_java = []

with open("analyz/git-stats-java.json", "r", encoding="utf-8") as file:
    data_java = json.load(file)
with open("analyz/git-stats-python.json", "r", encoding="utf-8") as file:
    data_python = json.load(file)
with open("analyz/git-stats-js.json", "r", encoding="utf-8") as file:
    data_js = json.load(file)




xlabel = []
for i in range(2012 * 4, 2023 * 4, 1):
    xlabel.append(i / 4)
del i

count_java = []
count_python = []
count_js = []
for i in range(44):
    count_java.append(data_java[i]["count"])
    count_python.append(int(data_python[i]["count"]))
    count_js.append(data_js[i]["count"])

plt.plot(xlabel, count_python)
plt.show()

print("======")
