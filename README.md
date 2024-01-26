## wordle
The wordle game clone written with fastapi and vanilla js.
## Install
1) Clone the repository (or download zip and unpuck it)
```bash
git clone https://github.com/tenolly/wordle.git
```
2) Install the requirements (if you want to develop it, use dev-requirements.txt)
```bash
pip install -r requirements/requirements.txt
```
3) Run the application (you can set any port, using --port)
```bash
uvicorn app.main:app
```
## Install (Docker)
1) Pull the docker image
```bash
docker pull tenoly/wordle-website
```
2) Run the application (runs at http://127.0.0.1/)
```bash
docker run -p 80:80 tenoly/wordle-website
```
