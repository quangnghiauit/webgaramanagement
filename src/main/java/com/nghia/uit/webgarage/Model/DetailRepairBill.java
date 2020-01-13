package com.nghia.uit.webgarage.Model;

import javax.persistence.*;

@Entity
@Table(name = "detailRepairBill")
public class DetailRepairBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "repairBillID")
    private String repairBillID;

    @Column(name = "infoBill")
    private String infoBill;

    @Column(name = "createdDate")
    private String createdDate;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "materialID")
    private String materialID;

    @Column(name = "reqNum")
    private int reqNum;


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

    public String getInfoBill() {
        return infoBill;
    }

    public void setInfoBill(String infoBill) {
        this.infoBill = infoBill;
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

    public String getMaterialID() {
        return materialID;
    }

    public void setMaterialID(String materialID) {
        this.materialID = materialID;
    }

    public int getReqNum() {
        return reqNum;
    }

    public void setReqNum(int reqNum) {
        this.reqNum = reqNum;
    }

    public void doMappingDetail(DetailRepairBill detailRepairBill) {
        this.infoBill = detailRepairBill.getInfoBill();
        this.materialID = detailRepairBill.getMaterialID();
        this.reqNum = detailRepairBill.getReqNum();
    }

}
