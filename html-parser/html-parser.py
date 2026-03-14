import json
from bs4 import BeautifulSoup

# Holds the JSON data
data = {}

with open("html-parser/tailwind-build-classes-raw.html", "r") as raw_file:
    html = raw_file.read()

# Uses Beautiful Soup to parse the HTML data
soup = BeautifulSoup(html, "html.parser")

# Tailwind categories found in <h5> tags, classes found in <a> tags, strip any whitespace, convert to lowercase
for div in soup.find_all("div", class_="w-full mb-6"):
    h5 = div.find("h5")
    if h5:
        key = h5.get_text().strip().lower()
        links = div.find_all("a")
        values = [link.get_text().strip() for link in links]
        data[key] = values

# Strip leading ".", some lines have two classes listed, split them up and append
for key, collection in data.items():
    new_collection = []
    for item in collection:
        item = item.lstrip(".")
        if " / ." in item:
            parts = item.split(" / .")
            new_collection.extend([part.lstrip(".") for part in parts])
        elif " / " in item:
            parts = item.split(" / ")
            new_collection.extend([part.lstrip(".") for part in parts])
        else:
            new_collection.append(item)
    data[key] = new_collection

# Uncomment the two lines below to write to a new file!
# with open("html-parser/test.json", "w") as new_file:
#     json.dump(data, new_file, indent=2)

print("JSON updated")
