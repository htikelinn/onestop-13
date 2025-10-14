package com.jdc.clinic.utils.security;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.jdc.clinic.utils.security.exception.AccessTokenExpirationException;
import com.jdc.clinic.utils.security.exception.RefreshTokenExpirationException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;

@Service
public class JwtTokenProvider {
	
	public enum TokenType {
		Access, Refresh
	}

	private static final String ROL = "rol";
	private static final String TYPE = "type";
	
	@Value("${app.token.issuer}")
	private String issuer;
	
	@Value("${app.token.refresh}")
	private int refreshLife;

	@Value("${app.token.access}")
	private int accessLife;
	
	private SecretKey secretKey = Jwts.SIG.HS512.key().build();

	public String generateAccess(Authentication authentication) {
		return generateToken(authentication, TokenType.Access);
	}

	public String generateRefresh(Authentication authentication) {
		return generateToken(authentication, TokenType.Refresh);
	}

	public Authentication parseRefresh(String token) {
		try {
			return parseToken(token, TokenType.Refresh);
		} catch (ExpiredJwtException e) {
			throw new RefreshTokenExpirationException("You need to login again.", e);
		}
	}

	public Authentication parseAccess(String token) {
		try {
			return parseToken(token, TokenType.Access);
		} catch (ExpiredJwtException e) {
			throw new AccessTokenExpirationException("You need to refresh token.", e);
		}
	}

	private String generateToken(Authentication authentication, TokenType type) {
		
		var authorities = authentication.getAuthorities().stream()
				.map(a -> a.getAuthority())
				.collect(Collectors.joining(","));
		
		Date issueAt = new Date();
		
		return Jwts.builder()
			.subject(authentication.getName())
			.claim(ROL, authorities)
			.claim(TYPE, type.name())
			.issuer(issuer)
			.issuedAt(issueAt)
			.expiration(getExpiration(issueAt, type))
			.signWith(secretKey)
			.compact();
		
	}

	private Authentication parseToken(String token, TokenType type) {
		
		var jws = Jwts.parser()
			.requireIssuer(issuer)
			.require(TYPE, type.name())
			.verifyWith(secretKey)
			.build().parseSignedClaims(token);
		
		var username = jws.getPayload().getSubject();
		var array = jws.getPayload().get(ROL, String.class)
				.split(",");
		var authorities = Arrays.stream(array).map(a -> new SimpleGrantedAuthority(a)).toList();
		
		return UsernamePasswordAuthenticationToken.authenticated(username, null, authorities);
	}

	private Date getExpiration(Date issueAt, TokenType type) {
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		calendar.add(Calendar.MINUTE, type == TokenType.Access ? accessLife : refreshLife);
		return calendar.getTime();
	}

}
