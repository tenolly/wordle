import os
import datetime

from fastapi import FastAPI, Request, Cookie
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from data import laguages
from .utils import get_daily_word, check_positions


app = FastAPI()
app.mount("/static", StaticFiles(directory=os.path.join(
    os.path.dirname(__file__), "static")), name="static")

templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request, lang: str = Cookie(default="en")):
    available_laguages = list(laguages.keys())
    if lang not in available_laguages:
        lang = "en"

    context = {
        "lang": lang,
        "next_lang": available_laguages[(available_laguages.index(lang) + 1) % len(available_laguages)],
        "play": laguages[lang]["templates"]["PLAY"]
    }
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@app.get("/game", response_class=HTMLResponse)
async def game(request: Request, lang: str = Cookie(default="en")):
    available_laguages = list(laguages.keys())
    if lang not in available_laguages:
        lang = "en"

    context = {
        "lang": lang,
        "play": laguages[lang]["templates"]["PLAY"]
    }
    return templates.TemplateResponse(request=request, name="game.html", context=context)


@app.post("/check_word", response_class=JSONResponse)
async def check_word(request: Request):
    json_responce = await request.json()
    word, lang = json_responce["word"].lower(), json_responce["lang"].lower()

    response = {"word": word}
    if len(response["word"]) != 5:
        response["error"] = laguages[lang]["errors"]["not_enough_letters"]
        return JSONResponse(response, status_code=400)

    response["success"] = response["word"] in laguages[lang]["dict"]
    if response["success"]:
        response["result"] = check_positions(get_daily_word(
            laguages[lang]["dict"]), response["word"])

    return JSONResponse(response)


@app.get("/get_server_time", response_class=JSONResponse)
async def game(request: Request):
    time_now = datetime.datetime.now()
    return JSONResponse({"hour": time_now.hour, "minute": time_now.minute, "second": time_now.second})
