import random
import datetime


def get_daily_word(words):
    today = datetime.datetime.now()
    random.seed(today.year * 5 + today.month * 7 + today.day * 11)
    return words[random.randrange(0, len(words))]
