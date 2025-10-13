package com.jdc.clinic.domain.trx.entity;

import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.TokenSeqPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class TokenSeq {

	@EmbeddedId
	private TokenSeqPk id;
	
	private int tokenNumber;

	public AppointmentPk next() {
		tokenNumber ++;
		return AppointmentPk.from(id, tokenNumber);
	}
}
