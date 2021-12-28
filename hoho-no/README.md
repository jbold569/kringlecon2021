# Filter
> 2021-12-28 04:53:44 Failed login from 217.143.192.22 for ribb
fail2ban-regex  --print-no-missed /var/log/hohono.log "^ Failed login from <HOST> for (?P<NAME>\w+)$"

> 2021-12-28 04:54:51 144.230.146.108 sent a malformed request
fail2ban-regex  --print-no-missed /var/log/hohono.log "^ <HOST> sent a malformed request$"

> 2021-12-28 08:51:16 Invalid heartbeat 'charlie' from 122.186.55.56
fail2ban-regex  --print-no-missed /var/log/hohono.log "^ Invalid heartbeat '(?P<NAME>\w+)' from <HOST>$"

# Jail
[naughtylist]
enabled=true
filter=naughtyfilter
logpath=/var/log/hohono.log
# banaction = /root/naughtylist add <HOST>
# unbanaction = /root/naughtylist del <HOST>
action=naughtylist
findtime=1h
maxretry=10

# Action
[INCLUDES]

before = 

[Definition]
# Option:  actionban
# Notes.:  command executed when banning an IP. Take care that the
#          command is executed with Fail2Ban user rights.
# Tags:    See jail.conf(5) man page
# Values:  CMD
#
actionban = /root/naughtylist add <HOST>

# Option:  actionunban
# Notes.:  command executed when unbanning an IP. Take care that the
#          command is executed with Fail2Ban user rights.
# Tags:    See jail.conf(5) man page
# Values:  CMD
#
actionunban = /root/naughtylist del <HOST>

[Init]

# Execution

Create all of the `.conf` files. Run `fail2ban-client restart` and refresh the naughtylist.

# References
https://github.com/fail2ban/fail2ban/wiki/How-to-ban-something-other-as-host-(IP-address),-like-user-or-mail,-etc.
https://github.com/fail2ban/fail2ban/blob/cb042dda7dfb9122c4cef0b79287f35e214b01ac/man/jail.conf.5
https://github.com/fail2ban/fail2ban/wiki/Developing-Regex-in-Fail2ban
https://www.digitalocean.com/community/tutorials/how-fail2ban-works-to-protect-services-on-a-linux-server