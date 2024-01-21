from string import ascii_lowercase as letters
from itertools import product

import enchant


d = enchant.Dict("en_US")

words = []
for word in filter(d.check, map("".join, product(letters, repeat=5))):
    words.append(word)

with open("data/en_dict.txt", mode="w") as file:
    file.write("\n".join(words))
