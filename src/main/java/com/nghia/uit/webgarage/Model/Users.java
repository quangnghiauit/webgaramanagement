package com.nghia.uit.webgarage.Model;

import com.nghia.uit.webgarage.Service.ServiceUtils;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "userID")
    private long userID;

    @Column(name = "userName")
    private String userName;

    @Column(name = "displayname")
    private String displayname;

    @Column(name = "password")
    private String password;

    @Column(name = "isactive")
    private int isactive;

    /*
     * 0: khong co hoa don cho
     * 1: co hoa don dang xu ly
     * */
    @Column(name = "status")
    private int status;

    @Column(name = "createdDate")
    private String createdDate;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "updatedDate")
    private String updatedDate;

    @Column(name = "updatedBy")
    private String updatedBy;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

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

    public String getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(String updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", userID=" + userID +
                ", userName='" + userName + '\'' +
                ", displayname='" + displayname + '\'' +
                ", password='" + password + '\'' +
                ", isactive=" + isactive +
                ", createdDate=" + createdDate +
                ", createdBy='" + createdBy + '\'' +
                ", updatedDate=" + updatedDate +
                ", updatedBy='" + updatedBy + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public void doMappingClientDTO(ClientDTO users) {
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
    }

    public void doMappingAdminUsersDTO(AdminUsersDTO users) {
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
    }

    public void doMappingUsers(ClientDTO users) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        updatedDate = dateFormat.format(date); //2019/03/13 20:08:43
        displayname= users.getDisplayname();
        phoneNumber = users.getPhoneNumber();
        address = users.getAddress();
        email = users.getEmail();
    }

    public void doMappingUsersAdminUsersDTO(AdminUsersDTO users) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        updatedDate = dateFormat.format(date); //2019/03/13 20:08:43
        displayname= users.getDisplayname();
        phoneNumber = users.getPhoneNumber();
        address = users.getAddress();
        email = users.getEmail();
    }

}
