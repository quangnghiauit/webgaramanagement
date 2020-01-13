package com.nghia.uit.webgarage.Model;

import java.util.List;

public class ResultCarHandleDTO {

    private int id;

    private String repairBillID;

    private String licensePlate;

    /*
     * 0: chua xu ly
     * 1: dang xu ly
     * 2: da xu ly
     * */
    private int status;

    private String createdDate;

    private List<CarHandleDTO> carHandleDTOList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRepairBillID() {
        return repairBillID;
    }

    public void setRepairBillID(String repairBillID) {
        this.repairBillID = repairBillID;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public List<CarHandleDTO> getCarHandleDTOList() {
        return carHandleDTOList;
    }

    public void setCarHandleDTOList(List<CarHandleDTO> carHandleDTOList) {
        this.carHandleDTOList = carHandleDTOList;
    }
}
