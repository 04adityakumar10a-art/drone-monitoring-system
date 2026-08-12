package com.aditya.dronemonitoring.dto;

import jakarta.validation.constraints.NotNull;

public class UpdateStatusRequestDTO {

    @NotNull(message = "Enabled status is required")
    private Boolean enabled;

    public UpdateStatusRequestDTO() {
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}