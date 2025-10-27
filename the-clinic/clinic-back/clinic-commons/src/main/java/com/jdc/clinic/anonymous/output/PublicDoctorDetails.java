package com.jdc.clinic.anonymous.output;

import java.util.List;

import com.jdc.clinic.domain.master.entity.Doctor;

public record PublicDoctorDetails(int id, String name, String title, String degree, String department,
		List<PublicSchedule> schedules) {
	
	
	public static Builder builder(Doctor entity) {
		return new Builder()
				.id(entity.getId())
				.name(entity.getEmployee().getAccount().getName())
				.title(entity.getTitle())
				.degree(entity.getDegree())
				.department(entity.getDepartment().getName());
	}

	public static class Builder {
		private int id;
		private String name;
		private String title;
		private String degree;
		private String department;
		private List<PublicSchedule> schedules;

		public Builder() {
		}

		public Builder id(int id) {
			this.id = id;
			return this;
		}

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder title(String title) {
			this.title = title;
			return this;
		}

		public Builder degree(String degree) {
			this.degree = degree;
			return this;
		}

		public Builder department(String department) {
			this.department = department;
			return this;
		}

		public Builder schedules(List<PublicSchedule> schedules) {
			this.schedules = schedules;
			return this;
		}

		public PublicDoctorDetails build() {
			return new PublicDoctorDetails(id, name, title, degree, department, schedules);
		}
	}
}
