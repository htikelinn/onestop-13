package com.jdc.scope.servlet.listener;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.TreeMap;

import com.jdc.scope.servlet.model.AccountManager;
import com.jdc.scope.servlet.model.Product;
import com.jdc.scope.servlet.model.ProductManager;
import com.jdc.scope.servlet.model.SaleManager;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class StorageManagementListener implements ServletContextListener {
	
	private static final String PRODUCTS = "/WEB-INF/product.txt";
	private static final String SALES = "/WEB-INF/sales.txt";
	private static final String ACCOUNTS = "/WEB-INF/accounts.txt";
	

    public void contextInitialized(ServletContextEvent sce)  { 
    	var context = sce.getServletContext();
    	context.setAttribute("AccountManager", loadAccountManager(context));
    	context.setAttribute("ProductManager", loadProductManager(context));
    	context.setAttribute("SaleManager", loadSalesManager(context));
    }

	private ProductManager loadProductManager(ServletContext context) {
		var path = context.getRealPath(PRODUCTS);
		
		try (var stream  = Files.lines(Path.of(path))) {
			// Load Products
			var products = new TreeMap<Integer, Product>();
			stream
				.map(line -> line.split("\t"))
				.map(array -> new Product(array))
				.forEach(product -> products.put(product.id(), product));
			
			// Create Product Manager
			return new ProductManager(Collections.synchronizedMap(products));
			
		} catch (IOException e) {
			System.err.println("File Read Error");
		}
		return null;
	}

    private SaleManager loadSalesManager(ServletContext context) {
    	
		var path = context.getRealPath(SALES);
		
		try(var input = new ObjectInputStream(new FileInputStream(path))) {
			SaleManager storage = (SaleManager)input.readObject();
			
			if(null == storage) {
				storage = new SaleManager();
			}
			
			return storage;
		} catch (Exception e) {
			System.err.println("File Read Error");
		}
    	
		return null;
	}

	private AccountManager loadAccountManager(ServletContext context) {
		var path = context.getRealPath(ACCOUNTS);
		
		try(var input = new ObjectInputStream(new FileInputStream(path))) {
			AccountManager storage = (AccountManager)input.readObject();
			
			if(null == storage) {
				storage = new AccountManager();
			}
			
			return storage;
		} catch (Exception e) {
			System.err.println("File Read Error");
		}

		return null;
	}

	public void contextDestroyed(ServletContextEvent sce)  { 
		var context = sce.getServletContext();
		
		try(var accountOutput = new ObjectOutputStream(new FileOutputStream(context.getRealPath(ACCOUNTS)));
				var salesOutput = new ObjectOutputStream(new FileOutputStream(context.getRealPath(SALES)))) {
			accountOutput.writeObject(context.getAttribute("AccountManager"));
			salesOutput.writeObject(context.getAttribute("SaleManager"));
		} catch(Exception e) {
			e.printStackTrace();
			System.err.println("File Write Error");
		}
    }
    
}
