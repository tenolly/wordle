import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from data import en_dict
from .utils import get_daily_word, check_positions


app = FastAPI()
app.mount("/static", StaticFiles(directory=os.path.join(
    os.path.dirname(__file__), "static")), name="static")

templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.get("/game", response_class=HTMLResponse)
async def game(request: Request):
    return templates.TemplateResponse(request=request, name="game.html")


@app.post("/check_word", response_class=JSONResponse)
async def check_word(request: Request):
    response = {"word": (await request.json())["word"].lower()}
    if len(response["word"]) != 5:
        response["error"] = "Not enough letters"
        return JSONResponse(response, status_code=400)
    
    response["succses"] = response["word"] in en_dict
    if response["succses"]:
        response["result"] = check_positions(get_daily_word(en_dict), response["word"])

    return JSONResponse(response)
