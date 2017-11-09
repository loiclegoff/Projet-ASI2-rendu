package model;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import ejb.UserDao;
import fr.cpe.model.UserModel;
import fr.cpe.model.enums.Role;


@Singleton
@Startup
public class DataContainer {
	
	@EJB UserDao dao;
	
	List<UserModel> userList = new ArrayList<UserModel>();
	
	@PostConstruct
	public void init() {
		userList.add(new UserModel("jdoe","jdoepwd"));
		userList.add(new UserModel("toto1","toto1pwd"));
		userList.add(new UserModel("toto2","toto2pwd"));
		userList.add(new UserModel("toto3","toto3pwd"));
		userList.add(new UserModel("toto4","toto4pwd"));
		userList.add(new UserModel("toto5","toto5pwd"));
		userList.add(new UserModel("toto6","toto6pwd"));
		userList.add(new UserModel("toto7","toto7pwd"));
	}
	
	
	public Role checkUser( UserModel user){
		 

		 //for(int i=0; i<userList.size(); i++){
		//	 if ( user.getLogin() == userList.get(i).getLogin() && user.getPassword() == userList.get(i).getPassword()){
		//			return userList.get(i).getRole();
		//	 }
		 //}
		Role role = dao.getUserRole(user.getLogin(), user.getPassword());
		if(role != Role.NONE ){
			return role;
		}
	     
		return Role.NONE;
	
	}

}
