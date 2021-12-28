# Getting started
```bash
ifconfig # to discover ip range
```

# NMap
```bash
nmap -sn 192.168.160.0/24 # discover two hosts
nmap -PS 192.168.160.1-2 # port scan for the two hosts
```

# curl
```bash
curl ipv6-server.ipv6guest.kringlecastle.com # instructs to connect to other tcp port
nmap -6 -sV ipv6-server.ipv6guest.kringlecastle.com # discovered port listening on 9000
nc -6 ipv6-server.ipv6guest.kringlecastle.com 9000 # PieceOnEarth
```
`PieceOnEarth` is the password...