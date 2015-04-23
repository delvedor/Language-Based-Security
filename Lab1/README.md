Introduction
The purpose of this assignment is to explore time of check to time of use (TOCTOU) vulnerabilities and its protection methods.

In this lab, you will write a Java application using a buggy API. After exploiting that application, you will suggest a fix.

Part 0: The scenario and base program
You have to write a frontend for a command line shopping cart. The application (called ShoppingCart.java) has to:

print the current balance of the user
print the product list and their prices
ask a product to buy
check if the amount of credits is enough, if not stop the execution.
otherwise, withdraw the price of the product from the wallet.
add the name of the product to the pocket file.
print the new balance.
exit normally.
This is an example:

$ java ShoppingCart
Your balance: 30000 credits
pen     40
car     30000
candies 1
book    100
What you want to buy?: <insert a product name, e.g. pen>
Your new balance is: 29960 credits

$ cat pocket.txt
book
pen

$ cat wallet.txt
29960
We provide the backend here (the API is documented in the source code), which includes:
Wallet.java: Interacts with the wallet.
Pocket.java: Interacts with the pocket.
Store.java: Interacts with the product options and prices.
Part 1: Exploit your program
The goal is to attack the program and exploit a race condition in this system. Can you get a car but paying less than its value? Obviously, it is not allowed to modify the files pocket.txt nor wallet.txt manually.

What is the root of the problem?
Explain in detail how you can attack this system.
Provide the program output and result, explaining the interleaving to achieve them.
Part 2: Fix the API
The goal is to fix the API to avoid the vulnerability.

Write a Wallet method implementing the necessary protections:
public void safeWithdraw(int valueToWithdraw) throws Exception
Were there other APIs suffering from possible races? If so, please explain them and update the APIs to eliminate any race problems.
Why are these protections enough?