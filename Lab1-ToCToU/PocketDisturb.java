import java.io.*;

class PocketDisturb {

    /*public static void main (String[] args) throws Exception {
        Pocket pocket = new Pocket();
        System.out.println("File disturb started....");
        System.out.println("From now the file pocket.txt will be used concurrently with the other process");
        while (true) {
            pocket.addProduct("Mario sott' olio");
        }
    }*/

    public void disturb() {
        new Thread(new DisturbTh()).start();
    }

    private class DisturbTh implements Runnable {

        public void run() {
            Pocket pocket;
            try {
                pocket = new Pocket();
                System.out.println("File disturb started....");
                //System.out.println("From now the file pocket.txt will be used concurrently with the other process");
                for (int i = 0; i < 150; i++) {
                    try {
                        pocket.addProduct("Mario sott' olio");
                    } catch (Exception e) {
                        System.out.println("error");
                    }
                }
            } catch (Exception e) {
                System.out.println("error");
            }
        }
    }
}