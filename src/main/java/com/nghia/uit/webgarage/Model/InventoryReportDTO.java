package com.nghia.uit.webgarage.Model;

public class InventoryReportDTO {

    private String materialID;
    private String materialName;
    private long totalInput = 0;
    private long totalMaterialInput;
    private long totalMaterialExport;
    private long lastInventory;

    public String getMaterialID() {
        return materialID;
    }

    public void setMaterialID(String materialID) {
        this.materialID = materialID;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public long getTotalInput() {
        return totalInput;
    }

    public void setTotalInput(long totalInput) {
        this.totalInput = totalInput;
    }

    public long getTotalMaterialInput() {
        return totalMaterialInput;
    }

    public void setTotalMaterialInput(long totalMaterialInput) {
        this.totalMaterialInput = totalMaterialInput;
    }

    public long getTotalMaterialExport() {
        return totalMaterialExport;
    }

    public void setTotalMaterialExport(long totalMaterialExport) {
        this.totalMaterialExport = totalMaterialExport;
    }

    public long getLastInventory() {
        return lastInventory;
    }

    public void setLastInventory(long lastInventory) {
        this.lastInventory = lastInventory;
    }
}
