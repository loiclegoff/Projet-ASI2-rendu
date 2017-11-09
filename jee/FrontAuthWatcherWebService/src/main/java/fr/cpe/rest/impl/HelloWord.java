package fr.cpe.rest.impl;

import javax.inject.Inject;

import fr.cpe.rest.IHelloWord;
import fr.cpe.services.IHelloWorldService;

/**
 * @author ubuntu
 *
 */
public class HelloWord implements IHelloWord {

	@Inject
	IHelloWorldService helloWorldService;
	
	@Override
	public String hello() {
		return helloWorldService.helloService(null);
	}
	
	@Override
	public String hello(String name) {
		return helloWorldService.helloService(name);
	}
}
