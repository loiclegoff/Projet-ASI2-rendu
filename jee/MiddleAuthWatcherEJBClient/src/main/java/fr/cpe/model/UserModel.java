package fr.cpe.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import fr.cpe.model.enums.Role;

@Entity
@Table(name="util")
public class UserModel  implements Serializable{
	@Id
	@GeneratedValue
	@Column(name="id")
	private int id;
	
	@NotNull
	@Column(name="login", nullable=false, unique=true)
	private String login;
	
	@NotNull
	@Column(name="password", nullable=false)
	private String password;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Role getRole() {
		return Role.valueOf(role);
	}

	public void setRole(Role role) {
		this.role = role.name();
	}
	public void setRole(String role) {
		this.role = role;
	}

	public UserModel() {
		super();
	}

	public UserModel(String login, String password) {
		super();
		this.login = login;
		this.password = password;
	}

	@Column(name="first_name")
	private String surName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="role")
	private String role;

}
