# wordle
docker build -t wordle-image .
docker run -d --name wordle-container -p 80:80 wordle-image