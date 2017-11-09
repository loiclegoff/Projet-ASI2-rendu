package ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import fr.cpe.model.UserModel;
import fr.cpe.model.enums.Role;
import model.DataContainer;

/**
 * Message-Driven Bean implementation class for: AuthWatcherMsgDrivenEJB
 */
@MessageDriven(
		activationConfig = { @ActivationConfigProperty(
				propertyName = "destination", propertyValue = "java:/jms/watcherAuthJMS"), @ActivationConfigProperty(
				propertyName = "destinationType", propertyValue = "javax.jms.Topic")
		}, 
		mappedName = "watcherAuthJMS")
public class AuthWatcherMsgDrivenEJB implements MessageListener {

	private DataContainer dataContainer;
	
	@EJB MessageSenderQueueLocal sender;
	
	@EJB UserDao dao;
	
	public AuthWatcherMsgDrivenEJB() {
		dataContainer=new DataContainer();
	}
	
	public void onMessage(Message message) {
		
		try {
			if (message instanceof TextMessage) {
				
				System.out.println("Topic: I received a TextMessage at "+ new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Message is : " + msg.getText());
			}
			else if (message instanceof ObjectMessage) {
				
				System.out.println("Topic: I received an ObjectMessage at "+ new Date());
				ObjectMessage msg = (ObjectMessage) message;
				
				if( msg.getObject() instanceof UserModel){
					
					UserModel user=(UserModel)msg.getObject();
					
					System.out.println("User Details: ");
					System.out.println("login:"+user.getLogin());
					System.out.println("pwd:"+user.getPassword());
					
					
					List<UserModel> userList = new ArrayList<UserModel>();

					
					Role currentTestRole = dao.getUserRole(user.getLogin(), user.getPassword());
					System.out.println(currentTestRole);
					
					if( Role.NONE==currentTestRole){
						sender.sendMessage(user);
					}
					else{
						user.setRole(currentTestRole);
						sender.sendMessage(user);
					}
					}
				}
				else {
					System.out.println("Not valid message for this Queue MDB");
				}
			}
		catch (JMSException e) {
			e.printStackTrace();
		}
					
	}

}
