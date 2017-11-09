package fr.cpe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author ubuntu
 *
 */
@Path("/hello")
public interface IHelloWord {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	String hello();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{name}")
	String hello(@PathParam("name") String name);
}
