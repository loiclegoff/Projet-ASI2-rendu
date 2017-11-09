package fr.cpe.rest.impl;

import java.util.logging.Logger;

import javax.ejb.EJB;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import ejb.MessageReceiverSyncLocal;
import ejb.MessageSenderLocal;
import fr.cpe.model.UserModel;
import fr.cpe.model.enums.Role;
import fr.cpe.rest.IWatcherAuth;




public class WatcherAuth implements IWatcherAuth {
	
	private static final long serialVersionUID = 1L;
	
	@EJB
	MessageSenderLocal sender;
	
	@EJB
	MessageReceiverSyncLocal receiver;
	
	private static Logger logger = Logger.getLogger(WatcherAuth.class.getName());
	@Override
	public String doPost(String jsonString) {
		
		
		JSONParser parser = new JSONParser();
		JSONObject json = null;
		Boolean VA=true;
		
		try {
			json = (JSONObject) parser.parse(jsonString);
			//System.out.println("json object: "+json);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserModel user = new UserModel();
		UserModel userAnswer = new UserModel();
		
		user.setLogin((String)json.get("login"));
		user.setPassword((String)json.get("pwd"));
		
		sender.sendMessage(user);
		
		userAnswer = receiver.receiveMessage();
		
		if(userAnswer.getRole() == Role.NONE || userAnswer.getRole() == null){
			VA = false;
		}
		
		String StringReturn = "{login : " + userAnswer.getLogin()+ ",validAuth :" + VA + ",role :" + userAnswer.getRole() + "}";
		
		return StringReturn;
	}
	
}