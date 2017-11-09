package fr.cpe.services;

import javax.ejb.Local;

@Local
public interface IHelloWorldService {
	
	String helloService(String name);
	
}