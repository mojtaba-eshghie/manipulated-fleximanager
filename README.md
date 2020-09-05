/etc/flexiwan/agent/token.txt


sudo systemctl status flexiwan-router
sudo systemctl restart flexiwan-router
sudo systemctl start flexiwan-router

sudo fwagent start



docker run -d --name new-vpp new-vpp
docker exec new-vpp vppctl show version
docker exec -it new-vpp bash


docker rmi -f image_id
docker rmi -f testvppscenario_router_a testvppscenario_router_b
docker-compose rm

docker-compose up --build



to make a presentation about vpp code take a look into the release.md file in the vpp repository.

compare vpp and flexiwan vpp code side-by-side ::: use the https://docs.flexiwan.com/overview/feature-desc.html page to identify which features are from the org. vpp and which are provided by new "plugins' or commands...





DHCP:
src/vnet/dhcp
---> how does it 





# first create m1, m2, m3 in the /data/db path of your system
# then issue the following commands (of course in different terminals)
sudo mongod --port 27017 --dbpath /data/db/m1 --replSet rs
sudo mongod --port 27018 --dbpath /data/db/m2 --replSet rs
sudo mongod --port 27019 --dbpath /data/db/m3 --replSet rs

#login to server1:
mongo --port 27017
rs.initiate()
# then go to primary (do this by hitting enter) and do:
rs.add("localhost:27018")
# then do this (this one is arbiter node):
rs.add("localhost:27019", true)

c


# if it shows you port 3000 already in use:
npx kill-port 3000




packet-generator new { name x limit 1000 size 128-128 interface memif1/1 node memif1/1 data { IP6: da01::1 -> da01::2 incrementing 100 } }


packet-generator new { name x limit 1000 size 128-128 interface memif1/1 node memif1/1 data { ICMP: 1.0.0.2 -> 2.0.0.2 } }



packet-generator new { name x limit 1 size 64-64 data { ICMP: da01::1 -> da01::2 ICMP echo_request}}




{ name x limit 1
  node ip4-input
  size 64-64
  no-recycle
  data {
    ICMP: 1.0.0.2 -> 2.0.0.2
    ICMP echo_request
    incrementing 100
  }
}






packet-generator new { name x limit 1000 node ip4-input size 64-64 data { ICMP: 1.0.0.2 -> 2.0.0.2 ICMP echo_request incrementing 100 } }


packet-generator new { name x3 limit 1000 node ip4-input size 64-64 data { IP: da01::1 -> da01::2 ICMP echo_request incrementing 100 } }
packet-generator new { name x limit 1000 node ip4-input size 64-64 data { IP4: 1.0.0.2 -> 2.0.0.2 } }





packet-generator new { name s0 limit 10000 size 128-128 interface local0 node ethernet-input data { IP4: 1.2.3 -> 4.5.6 UDP: 11.22.33.44 -> 11.22.34.44 UDP: 1234 -> 2345 incrementing 114 } }






packet-generator new { name s1 limit 10000 size 128-128 interface memif1/1 node ethernet-input data { IP6: da01::1 -> da01::1 UDP: 11.22.33.44 -> 11.22.34.44 UDP: 1234 -> 2345 incrementing 114 } }







--------------------------------------------------
install & run: redis-server, npm install packages at the manager directory,



mongodb://localhost:27017,localhost:27018,localhost:27019?replicaSet=rs
mongodb://ubuntu:27017,ubuntu:27018,ubuntu:27019/flexiwan?replicaSet=rs
mongodb://ubuntu:27017,ubuntu:27018,ubuntu:27019/flexiwanAnalytics?replicaSet=rs













=-------------------------------------------------------------------------------------



curl -X POST -k "https://0.0.0.0:3443/api/users/register" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"accountName\":\"account\",\"userFirstName\":\"user\",\"userLastName\":\"eshghie\",\"email\":\"eshghi.it@gmail.com\",\"password\":\"110903332311\",\"userJobTitle\":\"eng\",\"userPhoneNumber\":\"\",\"country\":\"US\",\"companySize\":\"0-10\",\"serviceType\":\"Provider\",\"numberSites\":\"10\",\"companyType\":\"\",\"companyDesc\":\"\",\"captcha\":\"\"}"



curl -X POST -k "https://0.0.0.0:3443/api/users/verify-account" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"id\":\"5f51d32f1e8503126130f287\",\"token\":\"G9VsPkgFZkmh67vqFaZP7fRooEa5tR\"}"


curl -X POST -sD - -k "https://0.0.0.0:3443/api/users/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"username\":\"eshghi.it@gmail.com\",\"password\":\"110903332311\",\"captcha\":\"\"}"


curl -X GET -sD - -k "https://0.0.0.0:3443/api/tokens" -H "accept: application/json" -H "Content-Type: application/json" 


http://0.0.0.0:3000/api/users/register




curl -X POST -k "https://0.0.0.0:3443/api/tokens" -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNiNzgyNDIzNWMyMDY2ZTdkODljMGIiLCJ1c2VybmFtZSI6ImVzaGdoaS5pdEBnbWFpbC5jb20iLCJvcmciOm51bGwsIm9yZ05hbWUiOm51bGwsImFjY291bnQiOiI1ZjNiNzgyNDIzNWMyMDY2ZTdkODljMGEiLCJhY2NvdW50TmFtZSI6ImFjY291bnQiLCJwZXJtcyI6eyJqb2JzIjoxNSwiYmlsbGluZyI6MywiYWNjb3VudHMiOjcsIm9yZ2FuaXphdGlvbnMiOjE1LCJkZXZpY2VzIjoxNSwidG9rZW5zIjoxNSwiYXBwaWRlbnRpZmljYXRpb25zIjoxNSwibWVtYmVycyI6MTUsInR1bm5lbHMiOjE1LCJhY2Nlc3N0b2tlbnMiOjE1LCJub3RpZmljYXRpb25zIjoxNSwicGF0aGxhYmVscyI6MTUsIm1scG9saWNpZXMiOjE1fSwiaWF0IjoxNTk3NzM2ODQwLCJleHAiOjE1OTgzNDE2NDB9.E3FX0Gc4ovjTWL4LM3Pvv1ZFyoXDSoWriXVgnslIVuA" -d "{\"name\":\"mayraa\"}"




curl -X POST -k "https://0.0.0.0:3443/api/devices" -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmUiLCJc2VybmFtZSI6ImVzaGdoaS5pdEBnbWFpbC5jb20iLCJvcmciOm51bGwsIm9yZ05hbWUiOm51bGwsImFjY291bnQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmQiLCJhY2NvdW50TmFtZSI6ImFjY291bnQiLCJwZXJtcyI6eyJqb2JzIjoxNSwiYmlsbGluZyI6MywiYWNjb3VudHMiOjcsIm9yZ2FuaXphdGlvbnMiOjE1LCJkZXZpY2VzIjoxNSwidG9rZW5zIjoxNSwiYXBwaWRlbnRpZmljYXRpb25zIjoxNSwibWVtYmVycyI6MTUsInR1bm5lbHMiOjE1LCJhY2Nlc3N0b2tlbnMiOjE1LCJub3RpZmljYXRpb25zIjoxNSwicGF0aGxhYmVscyI6MTUsIm1scG9saWNpZXMiOjE1fSwiaWF0IjoxNTk5MDQ4MjI0LCJleHAiOjE1OTk2NTMwMjR9.QtMejmnDFy_Ck8Re0np6iuKKC0K-55HCA62no5ikdyg" -d "{\"name\":\"mayraa\"}"






curl -X GET -k "https://0.0.0.0:3443/api/organizations/" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"offset\":\"0\",\"limit\":\"1\"}" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmUiLCJ1c2VybmFtZSI6ImVzaGdoaS5pdEBnbWFpbC5jb20iLCJvcmciOm51bGwsIm9yZ05hbWUiOm51bGwsImFjY291bnQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmQiLCJhY2NvdW50TmFtZSI6ImFjY291bnQiLCJwZXJtcyI6eyJqb2JzIjoxNSwiYmlsbGluZyI6MywiYWNjb3VudHMiOjcsIm9yZ2FuaXphdGlvbnMiOjE1LCJkZXZpY2VzIjoxNSwidG9rZW5zIjoxNSwiYXBwaWRlbnRpZmljYXRpb25zIjoxNSwibWVtYmVycyI6MTUsInR1bm5lbHMiOjE1LCJhY2Nlc3N0b2tlbnMiOjE1LCJub3RpZmljYXRpb25zIjoxNSwicGF0aGxhYmVscyI6MTUsIm1scG9saWNpZXMiOjE1fSwiaWF0IjoxNTk5MDQ4MjI0LCJleHAiOjE1OTk2NTMwMjR9.QtMejmnDFy_Ck8Re0np6iuKKC0K-55HCA62no5ikdyg"



-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmUiLCJ1c2VybmFtZSI6ImVzaGdoaS5pdEBnbWFpbC5jb20iLCJvcmciOm51bGwsIm9yZ05hbWUiOm51bGwsImFjY291bnQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmQiLCJhY2NvdW50TmFtZSI6ImFjY291bnQiLCJwZXJtcyI6eyJqb2JzIjoxNSwiYmlsbGluZyI6MywiYWNjb3VudHMiOjcsIm9yZ2FuaXphdGlvbnMiOjE1LCJkZXZpY2VzIjoxNSwidG9rZW5zIjoxNSwiYXBwaWRlbnRpZmljYXRpb25zIjoxNSwibWVtYmVycyI6MTUsInR1bm5lbHMiOjE1LCJhY2Nlc3N0b2tlbnMiOjE1LCJub3RpZmljYXRpb25zIjoxNSwicGF0aGxhYmVscyI6MTUsIm1scG9saWNpZXMiOjE1fSwiaWF0IjoxNTk5MDQ4MjI0LCJleHAiOjE1OTk2NTMwMjR9.QtMejmnDFy_Ck8Re0np6iuKKC0K-55HCA62no5ikdyg"



token for device (token1):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmciOiI1ZjRmOTM3NzdkNDY1YTBmZTczN2RkOGMiLCJhY2NvdW50IjoiNWY0Zjg5NjA3ZDQ2NWEwZmU3MzdkZDZkIiwiaWF0IjoxNTk5MDUxMTQwfQ.OMwfP6xzxe3fysxgk8IkgBLpsVbhGCKY3oJKfdAPKhw




http://0.0.0.0:3000/verify-account?id=5f4f89607d465a0fe737dd6e&t=r5SYMlpZXV7KZKkZ6VOOcVnGedCFtE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmUiLCJc2VybmFtZSI6ImVzaGdoaS5pdEBnbWFpbC5jb20iLCJvcmciOm51bGwsIm9yZ05hbWUiOm51bGwsImFjY291bnQiOiI1ZjRmODk2MDdkNDY1YTBmZTczN2RkNmQiLCJhY2NvdW50TmFtZSI6ImFjY291bnQiLCJwZXJtcyI6eyJqb2JzIjoxNSwiYmlsbGluZyI6MywiYWNjb3VudHMiOjcsIm9yZ2FuaXphdGlvbnMiOjE1LCJkZXZpY2VzIjoxNSwidG9rZW5zIjoxNSwiYXBwaWRlbnRpZmljYXRpb25zIjoxNSwibWVtYmVycyI6MTUsInR1bm5lbHMiOjE1LCJhY2Nlc3N0b2tlbnMiOjE1LCJub3RpZmljYXRpb25zIjoxNSwicGF0aGxhYmVscyI6MTUsIm1scG9saWNpZXMiOjE1fSwiaWF0IjoxNTk5MDQ4MjI0LCJleHAiOjE1OTk2NTMwMjR9.QtMejmnDFy_Ck8Re0np6iuKKC0K-55HCA62no5ikdyg


