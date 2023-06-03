from itertools import count
import json
import numpy as np
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

with open("git-stats-java.json", "r", encoding="utf-8") as file:
    data_java = json.load(file)
with open("git-stats-python.json", "r", encoding="utf-8") as file:
    data_python = json.load(file)
with open("git-stats-js.json", "r", encoding="utf-8") as file:
    data_js = json.load(file)


xlabel = []
for i in range(2012 * 4, 2023 * 4, 1):
    xlabel.append(i / 4)
del i

count_java = []
count_python = []
count_js = []
for i in range(44):
    count_java.append(int(data_java[i]["count"]))
    count_python.append(int(data_python[i]["count"]))
    count_js.append(int(data_js[i]["count"]))

count_java = np.array(count_java)
count_python = np.array(count_python)
count_js = np.array(count_js)

plt.title("График, соответствующий языку Python")
plt.xlabel("Года использования")
plt.ylabel("Примерно число пользователей")
plt.plot(xlabel, count_python, "r")
plt.show()
plt.title("График, соответствующий языку Java")
plt.xlabel("Года использования")
plt.ylabel("Примерно число пользователей")
plt.plot(xlabel, count_java, "g")
plt.show()
plt.title("График, соответствующий языку JavaScript")
plt.xlabel("Года использования")
plt.ylabel("Примерно число пользователей")
plt.plot(xlabel, count_js, "b")
plt.show()


print("======")
