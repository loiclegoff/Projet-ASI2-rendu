package fr.cpe.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/WatcherAuth")
public interface IWatcherAuth {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	String doPost(String jsonString);

}
