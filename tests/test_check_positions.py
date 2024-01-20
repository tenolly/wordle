import pytest
from app.utils import check_positions


tests = [
    (("CAT", "CAT"), ["G", "G", "G"]),
    (("CAT", "TAC"), ["Y", "G", "Y"]),
    (("CAT", "TAH"), ["Y", "G", "N"]),
    (("CATH", "CATA"), ["G", "G", "G", "N"]),
    (("AAAU", "AAAA"), ["G", "G", "G", "N"]),
    (("AUAU", "AAAA"), ["G", "N", "G", "N"]),
    (("TAHP", "AHAP"), ["Y", "Y", "Y", "G"]),
]


@pytest.mark.parametrize("words, result", tests)
def test_check_positions(words, result):
    assert check_positions(*words) == result
