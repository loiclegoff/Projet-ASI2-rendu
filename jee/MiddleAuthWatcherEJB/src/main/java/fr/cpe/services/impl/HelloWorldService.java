package fr.cpe.services.impl;

import javax.ejb.Stateless;

import fr.cpe.services.IHelloWorldService;

@Stateless
public class HelloWorldService implements IHelloWorldService {

	@Override
	public String helloService(String name) {
		if (name != null) {
			return "Hello " + name + " !";
		}
		
		return "Hello World !";
	}
	
}