package com.nghia.uit.webgarage.Model;

import javax.persistence.*;

@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "licensePlate")
    private String licensePlate;

    @Column(name = "userID")
    private long userID;

    /*
    * 0: chua xu ly
    * 1: dang xu ly
    * 2: da xu ly
    * */
    @Column(name = "status")
    private int status;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", licensePlate='" + licensePlate + '\'' +
                ", userID=" + userID +
                '}';
    }

    public void doMappingCar(Car car) {
        licensePlate = car.getLicensePlate();
        licensePlate = car.getLicensePlate();
    }
}
