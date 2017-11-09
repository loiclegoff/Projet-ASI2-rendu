package ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import fr.cpe.model.UserModel;
import fr.cpe.model.enums.Role;

@Stateless
public class UserDao {

	@PersistenceContext
	EntityManager primary;
	
	
	public Role getUserRole(String login, String pwd){
		
		UserModel util = (UserModel)primary.createQuery("from UserModel u where u.login= :login and u.password= :pwd")
					.setParameter("login", login).setParameter("pwd", pwd)
					.getSingleResult();
		Role role = util.getRole();

		return role;
	}
	
	public List<UserModel> getUserModelList(){
		
		List<UserModel> userList = new ArrayList<UserModel>();
		
		userList = (List<UserModel>)primary.createQuery("from UserModel").getResultList();
		
		return userList;
	}
}
