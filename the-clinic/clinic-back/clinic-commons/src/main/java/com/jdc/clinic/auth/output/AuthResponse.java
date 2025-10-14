package com.jdc.clinic.auth.output;

import com.jdc.clinic.domain.auth.entity.Account.Type;

public record AuthResponse(String name, String email, Type role, String accessToken, String refreshToken) {

	public static class Builder {
		private String name;
		private String email;
		private Type role;
		private String accessToken;
		private String refreshToken;

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder role(Type role) {
			this.role = role;
			return this;
		}

		public Builder accessToken(String accessToken) {
			this.accessToken = accessToken;
			return this;
		}

		public Builder refreshToken(String refreshToken) {
			this.refreshToken = refreshToken;
			return this;
		}

		public AuthResponse build() {
			return new AuthResponse(name, email, role, accessToken, refreshToken);
		}
	}

	public static Builder builder() {
		return new Builder();
	}
}
