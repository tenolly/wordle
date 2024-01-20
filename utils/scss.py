import os


for filename in os.listdir("app/static/scss"):
    if not filename.startswith("_"):
        source, target = "app/static/scss/" + filename, "app/static/css/" + filename.replace('.scss', '.css')
        os.system(f"sass --no-source-map {source} {target}")
        print(source, "->", target)
