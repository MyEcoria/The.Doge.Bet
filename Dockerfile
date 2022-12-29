FROM ubuntu:latest
CMD ["bash"]
RUN apt update -y && apt upgrade -y && apt install wget git nodejs npm -y && apt clean
WORKDIR /root
USER root
RUN git clone https://github.com/MyEcoria/dogeBet.git dogebet
WORKDIR /root/dogebet
RUN npm install reconnecting-websocket
RUN npm install request
ENTRYPOINT node index.js
