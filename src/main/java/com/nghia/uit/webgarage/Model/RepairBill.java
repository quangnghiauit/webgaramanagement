package com.nghia.uit.webgarage.Model;

import com.nghia.uit.webgarage.Service.ServiceUtils;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
//@Table(name = "repairBill")
public class RepairBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "repairBillID")
    private String repairBillID;

    @Column(name = "licensePlate")
    private String licensePlate;

    /*
     * 0: chua xu ly
     * 1: dang xu ly
     * 2: da xu ly
     * */
    @Column(name = "status")
    private int status;

    @Column(name = "createdDate")
    private String createdDate;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "exportDate")
    private String exportDate;

    @Column(name = "exportBy")
    private String exportBy;

    @Column(name = "userID")
    private long userID;

    @Column(name = "totalMoney")
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

    public String getExportDate() {
        return exportDate;
    }

    public void setExportDate(String exportDate) {
        this.exportDate = exportDate;
    }

    public String getExportBy() {
        return exportBy;
    }

    public void setExportBy(String exportBy) {
        this.exportBy = exportBy;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public long getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(long totalMoney) {
        this.totalMoney = totalMoney;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void doMappingRepairBill(String strLicensePlate, long strUserID ) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        createdDate = dateFormat.format(date); //2019/03/13 20:08:43
        String strName = dateFormat.format(date);

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("NN");
        stringBuilder.append(ServiceUtils.convertData(strName));

        repairBillID = String.valueOf(stringBuilder);
        licensePlate = strLicensePlate;
        userID = strUserID;
    }
}
