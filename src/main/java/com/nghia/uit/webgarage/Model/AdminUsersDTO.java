package com.nghia.uit.webgarage.Model;


public class AdminUsersDTO {

    private int id;

    private long userID;

    private String userName;

    private String displayname;

    private String password;

    private String role;

    private int isactive;

    /*
     * 0: khong co hoa don cho
     * 1: co hoa don dang xu ly
     * */
    private int status;

    private String createdDate;

    private String createdBy;

    private String updatedDate;

    private String updatedBy;

    private String phoneNumber;

    private String address;

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getIsactive() {
        return isactive;
    }

    public void setIsactive(int isactive) {
        this.isactive = isactive;
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

    public void doMappingUsers(Users users, UserRole userRole) {
        createdDate = users.getCreatedDate(); //2019/03/13 20:08:43
        id = users.getId();
        userID = Long.valueOf(users.getUserID());
        userName = users.getUserName();
        displayname = users.getDisplayname();
        phoneNumber = users.getPhoneNumber();
        address = users.getAddress();
        email = users.getEmail();

        if (userRole != null) {
            if(!userRole.getRole().equals("ADMIN")&&!userRole.getRole().equals("ACCOUNTANT")&&!userRole.getRole().equals("MECHANIC")){
                role = userRole.getRole();
            }
            if (userRole.getRole().equals("ADMIN")) {
                role = userRole.getRole();
                return;
            }
            if (userRole.getRole().equals("ACCOUNTANT")) {
                role = "Nhân viên kế toán";
                return;
            }
            if (userRole.getRole().equals("MECHANIC")) {
                role = "Nhân viên sữa chữa";
                return;
            }
            if (userRole.getRole().equals("RECEPTIONIST")) {
                role = "Nhân viên lễ tân";
                return;
            }
        }
    }
}
