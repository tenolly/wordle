def check_positions(hidden_word, suggested_word):
    if len(hidden_word) != len(suggested_word):
        raise ValueError("words must be the same length")
    
    hidden_word, suggested_word = hidden_word.upper(), suggested_word.upper()
    
    colors = ["_"] * len(hidden_word)

    for i in range(len(hidden_word)):
        if hidden_word[i] == suggested_word[i]:
            colors[i] = "G"  # Green
        elif suggested_word[i] not in hidden_word:
            colors[i] = "N"  # None

    while "_" in colors:
        index = colors.index("_")
        char = suggested_word[index]
        for i in range(len(hidden_word)):
            if hidden_word[i] == char and colors[i] != "G":
                colors[index] = "Y"  # Yellow
                break
        else:
            colors[index] = "N"  # None

    return colors
