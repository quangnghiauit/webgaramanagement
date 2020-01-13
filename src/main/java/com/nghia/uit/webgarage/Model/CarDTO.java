package com.nghia.uit.webgarage.Model;

import javax.persistence.Column;

public class CarDTO {

    private int id;

    private String licensePlate;
    private String displayName;

    /*
     * 0: chua xu ly
     * 1: dang xu ly
     * 2: da xu ly
     * */
    private int status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
