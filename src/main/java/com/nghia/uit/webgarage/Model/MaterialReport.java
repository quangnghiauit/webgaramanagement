package com.nghia.uit.webgarage.Model;

import com.nghia.uit.webgarage.Service.ServiceUtils;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "materialReport")
public class MaterialReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "materialID")
    private String materialID;

    @Column(name = "materialName")
    private String materialName;

    @Column(name = "totalNum")
    private long totalNum;

    @Column(name = "price")
    private long price;

    @Column(name = "reqDate")
    private String reqDate;

    @Column(name = "createdBy")
    private String createdBy;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public String getReqDate() {
        return reqDate;
    }

    public void setReqDate(String reqDate) {
        this.reqDate = reqDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public long getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(long totalNum) {
        this.totalNum = totalNum;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public void doMappingMaterial(String matName) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        reqDate = dateFormat.format(date); //2019/03/13 20:08:43
        String strName = dateFormat.format(date);

        StringBuilder stringBuilder = new StringBuilder();
        String strNameSplit = matName;
        String[] parts = strNameSplit.split("\\s+");

        if (parts.length != 1) {
            String firstStr = parts[0].substring(0, 1).toUpperCase();
            String lastStr = parts[1].substring(0, 1).toUpperCase();
            stringBuilder.append(firstStr).append(lastStr);
        } else {
            stringBuilder.append(parts[0].substring(0, 1).toUpperCase()).append("Z");
        }
        stringBuilder.append(ServiceUtils.convertData(strName));
        String strMaterialID = String.valueOf(stringBuilder);
        materialID = strMaterialID;

        materialName = matName;
    }
}
