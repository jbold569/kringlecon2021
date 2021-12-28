# Questions
Answer all the questions in the quizme executable:
- What port does 34.76.1.22 have open?
- What port does 34.77.207.226 have open?
- How many hosts appear "Up" in the scan?
- How many hosts have a web port open?  (Let's just use TCP ports 80, 443, and 8080)
- How many hosts with status Up have no (detected) open TCP ports?
- What's the greatest number of TCP ports any one host has open?


# Grep Command Hell

## What port does 34.76.1.22 have open?
```bash
~$ grep "34.76.1.22" bigscan.gnmap 
Host: 34.76.1.22 ()     Status: Up
Host: 34.76.1.22 ()     Ports: 62078/open/tcp//iphone-sync///      Ignored State: closed (999)
```

## What port does 34.77.207.226 have open?
```bash
~$ grep "34.77.207.226" bigscan.gnmap 
Host: 34.77.207.226 ()     Status: Up
Host: 34.77.207.226 ()     Ports: 8080/open/tcp//http-proxy///      Ignored State: filtered (999)
```

## How many hosts appear "Up" in the scan?
```bash
~$ grep "Status: Up" bigscan.gnmap | wc -l
26054
```
## How many hosts have a web port open?  (Let's just use TCP ports 80, 443, and 8080)

```bash
~$ grep -E "(80|443|8080)/open" bigscan.gnmap | wc -l 
14372
```

## How many hosts with status Up have no (detected) open TCP ports?

```bash
grep "Status: Up" bigscan.gnmap | awk -F ' ' '{print $2}' | wc -l # 26054
grep "/open" bigscan.gnmap | awk -F ' ' '{print $2}' | uniq | wc -l # 25652
expr 26054 - 25652 # 402
```

SANS answer
```bash
echo $((`grep Up bigscan.gnmap | wc -l` - `grep Ports bigscan.gnmap | wc -l`))
```

## What's the greatest number of TCP ports any one host has open?

brute force
```bash
grep -E '(open.*){12,}' bigscan.gnmap | wc -l # increment the number in the regex
```

# Resources
[Grep Cheatsheet](https://ryanstutorials.net/linuxtutorial/cheatsheetgrep.php)