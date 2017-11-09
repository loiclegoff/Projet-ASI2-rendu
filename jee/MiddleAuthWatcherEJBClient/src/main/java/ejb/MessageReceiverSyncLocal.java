package ejb;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface MessageReceiverSyncLocal {

	public UserModel receiveMessage();
}
