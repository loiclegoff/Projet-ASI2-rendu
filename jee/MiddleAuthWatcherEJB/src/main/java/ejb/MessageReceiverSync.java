package ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.TextMessage;

import fr.cpe.model.UserModel;
import fr.cpe.model.enums.Role;

/**
 * Session Bean implementation class MessageReceiverSync
 */

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {
	// TODO get jms context
	// TODO associate queue from "java:/jms/queue/watcherqueue"
	
	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
	
	public UserModel receiveMessage() {

		JMSConsumer consumer = context.createConsumer(queue);
		Message message = consumer.receive(1000);

		UserModel c = new UserModel();
		
		try {
			if (message instanceof TextMessage) {
				
				System.out.println("Queue: I received a TextMessage at "+ new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Message is : " + msg.getText());
			}
			else if (message instanceof ObjectMessage) {
				
				System.out.println("Queue: I received an ObjectMessage at "+ new Date());
				ObjectMessage msg = (ObjectMessage) message;
				
				if( msg.getObject() instanceof UserModel){
					
					c =(UserModel)msg.getObject();
					return c;
					}
				}
				else {
					System.out.println("Not valid message for this Queue MDB");
				}
			}
		catch (JMSException e) {
			e.printStackTrace();
		}
		
		return c;
	}
}
