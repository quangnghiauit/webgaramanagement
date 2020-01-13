package com.nghia.uit.webgarage.Model;

import java.util.Date;
import java.util.List;

public class BillDTO {

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
    private String createdBy;
    private Date regDate;
    private String regBy;
    private long userID;
    private String fullName;
    private String phoneNumber;
    private List<DetailBillDTO> detailBillDTOS;
    private long totalMoney;

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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public String getRegBy() {
        return regBy;
    }

    public void setRegBy(String regBy) {
        this.regBy = regBy;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<DetailBillDTO> getDetailBillDTOS() {
        return detailBillDTOS;
    }

    public void setDetailBillDTOS(List<DetailBillDTO> detailBillDTOS) {
        this.detailBillDTOS = detailBillDTOS;
    }

    public long getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(long totalMoney) {
        this.totalMoney = totalMoney;
    }

    public void doMappingBill(RepairBill billDTO,String strFullName,List<DetailBillDTO> detailBillDTOList) {
        repairBillID = billDTO.getRepairBillID();
        licensePlate = billDTO.getLicensePlate();
        if(strFullName != null) {
            fullName = strFullName;
        }
        status = billDTO.getStatus();
        userID = billDTO.getUserID();
        createdDate = billDTO.getCreatedDate();
        if(!detailBillDTOList.isEmpty()) {
            detailBillDTOS = detailBillDTOList;
        }
    }
}
