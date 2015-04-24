import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;

public class Wallet {
  /**
   * The RandomAccessFile of the wallet file
   */
  private RandomAccessFile file;
  //private FileLock lock;
  private FileChannel fch;

  /**
   * Creates a Wallet object
   *
   * A Wallet object interfaces with the wallet RandomAccessFile
   */
  public Wallet () throws Exception {
    this.file = new RandomAccessFile(new File("wallet.txt"), "rw");
    this.fch = this.file.getChannel();
    //this.lock=ch.lock();
  }

  /**
   * Gets the wallet balance.
   *
   * @return                   The content of the wallet file as an integer
   */
  public int getBalance() throws IOException {
    FileLock lock = this.fch.lock();
    this.file.seek(0);
    String total = this.file.readLine();
    lock.release();
    return Integer.parseInt(total);
  }

  /**
   * Sets a new balance in the wallet
   *
   * @param  newBalance          new balance to write in the wallet
   */
  public void setBalance(int newBalance) throws Exception {
    FileLock lock = this.fch.lock();
    this.file.setLength(0);
    String str = new Integer(newBalance).toString() + '\n';
    this.file.writeBytes(str);
    lock.release();
  }

  /**
  * Sets a new balance in the wallet without locking the file
  *
  * @param  newBalance          new balance to write in the wallet
  */
  private void setBalanceNoLock(int newBalance) throws Exception {
    this.file.setLength(0);
    String str = new Integer(newBalance).toString() + '\n';
    this.file.writeBytes(str);
  }

  /**
  * Gets the wallet balance without locking the file.
  *
  * @return                   The content of the wallet file as an integer
  */
  public int getBalanceNoLock() throws IOException {
    this.file.seek(0);
    String total = this.file.readLine();
    return Integer.parseInt(total);
  }

  /**
   * Closes the RandomAccessFile in this.file
   */
  public void close() throws Exception {
    //this.lock.release();
    this.file.close();
  }

  /**
  * Make a safe withdraw from the wallet
  */
  public void safeWithdraw(int valueToWithdraw) throws Exception {
    FileLock lock = this.fch.lock();
    if (getBalanceNoLock() >= valueToWithdraw) {
      setBalanceNoLock(getBalanceNoLock() - valueToWithdraw);
    } else {
      System.out.println("Error, you don' t have enough money for this product");
    }
    lock.release();
  }
}
