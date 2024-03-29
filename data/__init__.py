import os

    
laguages = {
    "en": {
        "dict": open(os.path.join(os.path.dirname(__file__), "en_dict.txt"), mode="r").read().splitlines(),
        "templates": {
            "PLAY": "PLAY",
            "NEW WORD": "NEW\nWORD"
        },
        "errors": {
            "not_enough_letters": "Not enough letters"
        }  
    },
    "ru": {
        "dict": open(os.path.join(os.path.dirname(__file__), "ru_dict.txt"), mode="r", encoding="cp1251").read().splitlines(),
        "templates": {
            "PLAY": "ИГРАТЬ",
            "NEW WORD": "НОВОЕ\nСЛОВО"
        },
        "errors": {
            "not_enough_letters": "Недостаточно символов"
        }
    }
}
