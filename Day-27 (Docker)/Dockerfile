# jaha pe docker basically 2 chiz pe hi kaam karti hai 1.images 2. container
# image jo banta hai woh in 4 chiz se banta hai 
#1. pehla operating system (os) koi bhi operating system window/linux/mac os
#2. dusra hai node jo hum log node se server run karte hai woh hona chahiye 
#3. teesra hai dependenies jaisi humlog koi bhi package intall karte hai woh dependcies file main jaata hai (package.json,package-lock.json)
#4. aur last jo hota hai woh code base hota hai humlog jitna bhi code likhte hai use codebase kehte hai 

# ===================================IMAGE======================================================
# toh sabse pehe image banane ke liye 2 chiz chahiye hota hai os aur node jo ke mera ek hi line ka command pura kar deta hai (FROM node:20-alpine) yeh likhne se mera OS aur nodes aa jaata hai docker file main 

# Definition: Ye hamari Base Image hai.
# Matlab: Jaise aapne bataya, ye ek hi line mein aapko Linux OS (Alpine version, jo bahut light hota hai) aur Node.js (version 20) ka pura environment set karke de deta hai. Iske bina Docker image nahi ban sakti kyunki ise base chahiye hota hai.
FROM node:20-alpine 

# Definition: Ye Dependencies list ko copy karne ka step hai.
# Matlab: Ye aapke local computer se dependencies ki file (package.json) ko Docker image ke andar dalta hai. Hum ise pehle isliye karte hain taaki Docker in dependencies ko cache (save) kar sake aur har baar naya install na karna pade.
COPY ./package.json .
COPY ./package-lock.json .

# Definition: Ye Build Command hai.
# Matlab: Ye command image ke andar ja kar saare jaruri packages install karti hai (jo node_modules folder banata hai). Ye image banane ke waqt (build time) hi chalti hai. AGAR NODE_MODULE NAHI HOTA HAI TABHI YEH COMMAND USE KARTE WARNA NAHI KARTE HAI 
RUN npm install

# Definition: Ye Codebase ko copy karne ka step hai.
# Matlab: Jab dependencies install ho jaati hain, tab hum apna asli kaam (logic/code) yaani server.js file ko image mein dalte hain. Isse hamara application image ke andar complete ho jata hai.
COPY ./server.js .


# ========================================CONTAINER====================================================
# toh yaha pe images banane ke baad humlog container banate hai container basically ek running instance hota hai image ka toh jab bhi humlog image ko run karte hai toh woh container ban jata hai aur usme hamara server chalne lagta hai toh uske liye humlog command use karte hai (CMD ["node","server.js"]) yeh command hamare container ke andar ja kar server.js file ko node ke through run kar deta hai
# Definition: Ye Command hai jo container ke andar server.js ko run karta hai.
CMD ["node","server.js"]


# toh yaha pe humein images ko banane ke liye terminal main ja kar command run karna hota hai (docker build . -t <image-name> .) yeh command current directory (.) mein Dockerfile ko dhundta hai aur uske instructions ke hisaab se image banata hai jiska naam humne <image-name> diya hai. example ke liye agar humne image ka naam "cohot_2" diya hai toh command hoga (docker build -t cohot_2 .) isse hamari image ban jayegi jiska naam "cohot_2" hoga isko agar dekhna hai docker deskotop main ja kar images section main dekh sakte hai waha pe hamari image "cohot_2" dikh jayegi

# Definition: Ye Command hai jo image ko build karta hai.
# (docker build . -t <image-name> .)


# aur jab humein container run karna hota hai toh humlog command use karte hai (docker run -p 8080:3000 <image-name>) yeh command hamare image ko run karta hai aur usme hamara server start ho jata hai aur -p 8080:3000 ka matlab hai ki hamara local machine ka port 8080 docker container ke port 3000 se connect ho jayega isse hum apne browser main ja kar localhost:8080 pe apne server ko access kar sakte hai jaruri nahi ki 8080 hi use kare aap koi bhi port use kar sakte hai bas jaise ki aapne 8080 use kiya hai toh aapko browser main ja kar localhost:8080 pe apne server ko access karna hoga agar aapne 5000 use kiya hai toh aapko browser main ja kar localhost:5000 pe apne server ko access karna hoga

# Definition: Ye Command hai jo container ko run karta hai.
# (docker run  <image-name>)  yeh run container toh bana dega par isko access nahi kar skhe hai container ke ilawa
# (docker run -p 8080:3000 <image-name>) yeh run container with port mapping