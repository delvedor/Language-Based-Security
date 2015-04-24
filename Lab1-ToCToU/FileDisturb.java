import java.io.*;

class FileDisturb {
    public static void main (String[] args) throws Exception {
        Wallet wallet = new Wallet();
        int i = 1;
        System.out.println("File disturb started....");
        System.out.println("From now the file wallet.txt will be continuosly used");
        while (true) {
            i = i * (-1);
            wallet.setBalance(wallet.getBalance() + i);
        }
    }
}