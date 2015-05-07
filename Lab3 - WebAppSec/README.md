# Language-Based-Security
Repository of the exercises and the project of the Chalmers Language-Based Security Course.

##Introduction
The purpose of this assignment is to explore vulnerabilities and protection methods in web applications.

In this lab, you are going to locate and exploit a Cross-Site Scripting (XSS). Using this vector, you will get administrator access to the system by a cookie hijacking attack.  
Once in the administration pages, you will find and exploit a SQL-injection to gain code execution.

______________________________________________________________________________________________________________________

##The web application
The web application used in this lab is from PentesterLab and represents a CMS blogging platform.  
It is a bootable CD in ISO format that you can boot from in your VirtualBox, VMware or QEMU:

xss_and_mysql_file_i386.iso (32-bit, 178M, MD5: c9c7a31ab9bf79b82b72b58bb0a3a657)  
Depending of your virtual machine configuration, you might create a port redirection to the virtual host tcp/80 port.  
The system includes a PhantomJS script that simulates an administrator visiting every page of the website every minute.

______________________________________________________________________________________________________________________

##Part 1: Cross-Site Scripting (XSS)
Your objective is to find an XSS vulnerability to perform a Session Hijacking attack and gain administration clearance in the web application.

In the report you should include:

- A description of all the XSS vulnerabilities you've found
- A step-by-step description of the attack that you have designed to hijack the administrator session information.
- A recommendation on how this issue should be fixed
- A general discussion on possible server-side protection mechanisms
- Since XSS is an attack that highly affects the users you should discuss possible client-side protection mechanisms
- The administration interface is under the admin link on the main page.

Hint:If you need to quickly run a server to capture the leak you can use the command: socat TCP-LISTEN:80,reuseaddr,fork -

Extra: Can you come up with a possible patch for the website code?

______________________________________________________________________________________________________________________

##Part 2: SQL-Injection
Your objective is to find an SQL-Injection vulnerability in the web application and exploit it to modify the one of your requests in the database so that it is approved.

In the report you should include:

- A description of all the SQL-injection vulnerabilities you've found
- A description of what you think the SQL-query you're exploiting might look like
- Exploit the FILE privilege of the blog user to read the /etc/passwd file.
- Find a writing directory and inject a webshell to get remote execution in the server. Explain the webshell.
- A recommendation on how this issue should be fixed.
- A general discussion on possible server-side protection mechanisms

Hint:a possible webshell is <?php system($_GET['c']);?>

Extra:Your admin access might expire in the near future. How can you get future access without changing the administrator password? What do you suggest to mitigate this vulnerability in particular?