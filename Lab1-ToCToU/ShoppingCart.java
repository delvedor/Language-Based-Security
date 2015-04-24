import java.io.*;

class ShoppingCart {
	public static void main (String[] args) throws Exception {
		Wallet wallet = new Wallet();
		Pocket pocket = new Pocket();
		int balance = wallet.getBalance();
		System.out.println("Your balance is: " + balance);
		System.out.println(Store.asString());

		System.out.print("What do you want to buy? <insert a product name, e.g. pen> :");
		String productName = getConsInput();
		System.out.println("product: " + productName);
		int prodPrice = Store.products.get(productName);

		if (balance < prodPrice) {
			System.out.println("Sorry, you don' t have enough money ");
			System.exit(1);
		}

		//wallet.setBalance(balance - prodPrice);
		wallet.safeWithdraw(prodPrice);
		System.out.println("Your new balance is: " + wallet.getBalance());
		pocket.addProduct(productName);
		wallet.close();

	}

	private static String getConsInput() {
		String strout = "";
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		try {
			strout = br.readLine();
		} catch (IOException ioe) {
			System.out.println("IO error trying to read the product name!");
			System.exit(1);
		}
		return strout;
	}
}

/**
 * This code have the problem that the currentBalance is read at the beginning and is not check anymore.
 * So an attacker can bay a care and after a pen if launches the program at the same time and will get the car "for free".
 */
/*class ShoppingCart{
	public static void main (String[] args) throws Exception{
		Wallet wallet = new Wallet();
		Pocket pocket = new Pocket();
		int currentBalance = wallet.getBalance();
		System.out.println("Your balance is: "+currentBalance);
		System.out.println(Store.asString());

		System.out.print("What do you want to buy? <insert a product name, e.g. pen> :");
		String productName = getConsInput();
		System.out.println("product: "+productName);
		int prodPrice=Store.products.get(productName);

		if (currentBalance < prodPrice){
			System.out.println("Sorry, you don´ t have enough money ");
			System.exit(1);
		}

		wallet.setBalance(currentBalance - prodPrice);
		System.out.println("Your new balance is: "+wallet.getBalance());
		pocket.addProduct(productName);

	}

	private static String getConsInput(){
		String strout = "";
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		try {
         	strout = br.readLine();
      	} catch (IOException ioe) {
         	System.out.println("IO error trying to read the product name!");
         	System.exit(1);
      	}
		return strout;
	}
} */
