package ejb;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface MessageSenderQueueLocal {

	void sendMessage(UserModel user);

}
