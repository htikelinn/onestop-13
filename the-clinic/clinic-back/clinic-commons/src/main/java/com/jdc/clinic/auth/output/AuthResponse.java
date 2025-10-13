package com.jdc.clinic.auth.output;

import com.jdc.clinic.domain.auth.entity.Account.Type;

public record AuthResponse(
		String name,
		String email,
		Type role, 
		String accessToken,
		String refreshToken) {

}
