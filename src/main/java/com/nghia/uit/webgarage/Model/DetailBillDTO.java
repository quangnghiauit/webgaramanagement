package com.nghia.uit.webgarage.Model;

public class DetailBillDTO {
    private int id;
    private String repairBillID;
    private String materialName;
    private String createdDate;
    private String createdBy;
    private String materialID;
    private int reqNum;
    private long price;
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

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
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

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public long getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(long totalMoney) {
        this.totalMoney = totalMoney;
    }

    public void doMappingDetailReport(DetailRepairBill detailRepairBill,String strMaterialName,MaterialReport material) {
        if(!strMaterialName.isEmpty()) {
            materialName = strMaterialName;
        }
        id = detailRepairBill.getId();
        materialID = detailRepairBill.getMaterialID();
        reqNum = detailRepairBill.getReqNum();
        if(material!=null) {
            price = material.getPrice();
        }
        createdDate = detailRepairBill.getCreatedDate();

        if(reqNum > 0 && price > 0 ) {
            totalMoney = reqNum * price;
        }


    }
}
