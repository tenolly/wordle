# Guide how to add your language (for windows, the linux manual find yourself)
# https://stackoverflow.com/questions/65267036/add-libreoffice-dictionary-to-pyenchant-on-windows-for-anaconda

import datetime
from itertools import product

from colorama import Fore
import argparse
import enchant

parser = argparse.ArgumentParser()
parser.add_argument("language", help="the dictionary will be created for that language")
parser.add_argument("alphabet", help="all the letters of the alphabet, case insensitive")
parser.add_argument("target_file")

args = parser.parse_args()
if not enchant.dict_exists(args.language):
    raise ValueError("dictionary not installed")

d = enchant.Dict(args.language)

print(f"run from {Fore.GREEN + datetime.datetime.now().strftime('%H:%M:%S') + Fore.RESET} to ", end="")

words = []
for word in filter(d.check, map("".join, product(args.alphabet.lower(), repeat=5))):
    words.append(word)

print(Fore.GREEN + datetime.datetime.now().strftime('%H:%M:%S') + Fore.RESET, end="  ==>  ")

with open(args.target_file, mode="w") as file:
    file.write("\n".join(words))

print(f"{Fore.GREEN + str(len(words)) + Fore.RESET} words saved to {args.target_file}")
