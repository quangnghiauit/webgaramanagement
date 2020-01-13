package com.nghia.uit.webgarage.Model;


import com.nghia.uit.webgarage.Service.ServiceUtils;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ClientDTO {

    private int id;

    private long userID;

    private String userName;

    private String phoneNumber;

    private String address;

    private String email;

    private long debt;

    private String licensePlate;

    private String carBrand;

    private String displayname;

    private String password;

    private int isactive;

    private String createdDate;

    private String createdBy;

    private Date updatedDate;

    private String updatedBy;

    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getDebt() {
        return debt;
    }

    public void setDebt(long debt) {
        this.debt = debt;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(String carBrand) {
        this.carBrand = carBrand;
    }

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getIsactive() {
        return isactive;
    }

    public void setIsactive(int isactive) {
        this.isactive = isactive;
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

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void doMappingClientDTO(Users users, Car car) {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        createdDate = dateFormat.format(date); //2019/03/13 20:08:43
        String strName = dateFormat.format(date);

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(ServiceUtils.convertData(strName));
        String strUserID= String.valueOf(stringBuilder);

        id = users.getId();
        userID = Long.valueOf(strUserID);
        userName = users.getUserName();
        displayname= users.getDisplayname();
        phoneNumber = users.getPhoneNumber();
        address = users.getAddress();
        email = users.getEmail();
        if(car!=null) {
            licensePlate = car.getLicensePlate();
        }
    }

    public void doMappingUsers(Users users) {
        createdDate = users.getCreatedDate(); //2019/03/13 20:08:43
        id = users.getId();
        userID = Long.valueOf(users.getUserID());
        userName = users.getUserName();
        displayname= users.getDisplayname();
        phoneNumber = users.getPhoneNumber();
        address = users.getAddress();
        email = users.getEmail();
    }


}
