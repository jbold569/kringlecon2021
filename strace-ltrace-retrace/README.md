```bash
strace ./make_the_candy
execve("./make_the_candy", ["./make_the_candy"], 0x7ffc0c90a450 /* 12 vars */) = 0
brk(NULL)                               = 0x55ace06f5000
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=19540, ...}) = 0
mmap(NULL, 19540, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f6bba149000
close(3)                                = 0
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\20\35\2\0\0\0\0\0"..., 832) = 832
fstat(3, {st_mode=S_IFREG|0755, st_size=2030928, ...}) = 0
mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f6bba147000
mmap(NULL, 4131552, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f6bb9b34000
mprotect(0x7f6bb9d1b000, 2097152, PROT_NONE) = 0
mmap(0x7f6bb9f1b000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1e7000) = 0x7f6bb9f1b000
mmap(0x7f6bb9f21000, 15072, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f6bb9f21000
close(3)                                = 0
arch_prctl(ARCH_SET_FS, 0x7f6bba1484c0) = 0
mprotect(0x7f6bb9f1b000, 16384, PROT_READ) = 0
mprotect(0x55ace03aa000, 4096, PROT_READ) = 0
mprotect(0x7f6bba14e000, 4096, PROT_READ) = 0
munmap(0x7f6bba149000, 19540)           = 0
brk(NULL)                               = 0x55ace06f5000
brk(0x55ace0716000)                     = 0x55ace0716000
openat(AT_FDCWD, "registration.json", O_RDONLY) = -1 ENOENT (No such file or directory)
fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 0), ...}) = 0
write(1, "Unable to open configuration fil"..., 35Unable to open configuration file.
) = 35
exit_group(1)                           = ?
+++ exited with 1 +++
```

```bash
ltrace ./make_the_candy 
fopen("registration.json", "r")                           = 0
puts("Unable to open configuration fil"...Unable to open configuration file.
)               = 35
+++ exited (status 1) +++

touch registration.json
kotton_kandy_co@9161456e108f:~$ ltrace ./make_the_candy registration.json 
fopen("registration.json", "r")                           = 0x55aa864f6260
getline(0x7ffe1d1d8200, 0x7ffe1d1d8208, 0x55aa864f6260, 0x7ffe1d1d8208) = -1
puts("Unregistered - Exiting."Unregistered - Exiting.
)                           = 24
+++ exited (status 1) +++
```

# References
- [syscalls](https://man7.org/linux/man-pages/man2/syscalls.2.html)

