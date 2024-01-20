from string import ascii_lowercase as letters
from itertools import permutations

import enchant


d = enchant.Dict("en_US")

words = []
for word in filter(d.check, map("".join, permutations(letters, 5))):
    words.append(word)

with open("data/en_dict.py", mode="w") as file:
    file.write("en_dict = " + str(words))
