import os


for filename in os.listdir("app/static/scss"):
    if not filename.startswith("_"):
        os.system(f"sass --no-source-map app/static/scss/{filename} app/static/css/{filename.replace('.scss', '.css')}")
