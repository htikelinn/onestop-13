package com.jdc.scope.servlet.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class Account implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private String phone;
	private String email;
	private String loginId;
	private String password;

	public static Builder builder() {
		return new Builder();
	}

	private Account(String name, String phone, String email, String loginId, String password) {
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.loginId = loginId;
		this.password = password;
	}

	public static class Builder {
		private String name;
		private String phone;
		private String email;
		private String loginId;
		private String password;

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder phone(String phone) {
			this.phone = phone;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder loginId(String loginId) {
			this.loginId = loginId;
			return this;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public Account build() {
			return new Account(name, phone, email, loginId, password);
		}
	}
}

